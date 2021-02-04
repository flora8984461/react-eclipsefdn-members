package org.eclipsefoundation.react.bootstrap;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Random;

import javax.annotation.PostConstruct;
import javax.enterprise.event.Observes;
import javax.inject.Inject;
import javax.inject.Singleton;

import org.apache.commons.lang3.RandomStringUtils;
import org.eclipsefoundation.core.model.RequestWrapper;
import org.eclipsefoundation.persistence.dao.PersistenceDao;
import org.eclipsefoundation.persistence.model.RDBMSQuery;
import org.eclipsefoundation.persistence.service.FilterService;
import org.eclipsefoundation.react.model.Address;
import org.eclipsefoundation.react.model.Contact;
import org.eclipsefoundation.react.model.MembershipForm;
import org.eclipsefoundation.react.model.Organization;
import org.eclipsefoundation.react.model.WorkingGroup;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import io.quarkus.runtime.StartupEvent;
import io.quarkus.runtime.configuration.ProfileManager;

@Singleton
public class DataLoader {
    public static final Logger LOGGER = LoggerFactory.getLogger(DataLoader.class);
    private static final List<String> WORKING_GROUPS = Collections
            .unmodifiableList(Arrays.asList("internet-things-iot", "jakarta-ee", "cloud-tools-development"));
    private static final List<String> MEMBERSHIP_LEVELS = Collections
            .unmodifiableList(Arrays.asList("strategic", "contributing", "associate", "committer"));
    private static final List<String> PARTICIPATION_LEVELS = Collections
            .unmodifiableList(Arrays.asList("platinum", "gold", "silver", "associate"));
    private static final List<String> CONTACT_TYPES = Collections
            .unmodifiableList(Arrays.asList("working_group", "company", "marketing", "accounting"));

    @Inject
    PersistenceDao dao;
    @Inject
    FilterService filters;

    // used for random picking, not cryptographic
    private Random r = new Random();

    @PostConstruct
    public void init(@Observes StartupEvent ev) {
        // if running in dev mode, preload a bunch of data using dao
        LOGGER.debug("Current mode: {}", ProfileManager.getActiveProfile());
        if ("dev".equals(ProfileManager.getActiveProfile())) {
            RequestWrapper wrap = new RequestWrapper();
            List<MembershipForm> forms = new ArrayList<>(32);
            for (int i = 0; i < 25; i++) {
                MembershipForm mf = new MembershipForm();
                String userID = "user1";

                mf.setUserID(userID);
                mf.setMembershipLevel(MEMBERSHIP_LEVELS.get(r.nextInt(MEMBERSHIP_LEVELS.size())));
                mf.setSigningAuthority(Math.random() > 0.5);
                forms.add(mf);
            }

            // batch add the entities
            forms = dao.add(new RDBMSQuery<>(wrap, filters.get(MembershipForm.class)), forms);
            LOGGER.debug("Created {} forms", forms.size());
            List<Organization> organizations = new ArrayList<>(forms.size());
            List<Contact> contacts = new ArrayList<>(forms.size() * CONTACT_TYPES.size());
            List<WorkingGroup> wgs = new ArrayList<>();
            for (MembershipForm mf : forms) {
                Organization o = new Organization();
                o.setForm(mf);
                o.setLegalName(RandomStringUtils.randomAlphabetic(4, 10));
                Address a = new Address();
                a.setCity(RandomStringUtils.randomAlphabetic(4, 10));
                a.setCountry(RandomStringUtils.randomAlphabetic(4, 10));
                a.setPostalCode(RandomStringUtils.randomAlphabetic(4, 10));
                a.setProvinceState(RandomStringUtils.randomAlphabetic(2));
                a.setStreet(RandomStringUtils.randomAlphabetic(4, 10));
                a.setOrganizationID(o.getId());
                o.setAddress(a);
                organizations.add(o);
                for (int j = 0; j < CONTACT_TYPES.size(); j++) {
                    // randomly skip contacts
                    if (Math.random() > 0.5) {
                        continue;
                    }
                    Contact c = new Contact();
                    c.setForm(mf);
                    c.setTitle("Sample Title");
                    c.setfName(RandomStringUtils.randomAlphabetic(4, 10));
                    c.setlName(RandomStringUtils.randomAlphabetic(4, 10));
                    c.setType(CONTACT_TYPES.get(j));
                    c.setEmail(RandomStringUtils.randomAlphabetic(4, 10));
                    contacts.add(c);
                }
                // randomly create WG entries
                while (Math.random() > 0.5) {
                    WorkingGroup wg = new WorkingGroup();
                    wg.setWorkingGroupID(WORKING_GROUPS.get(r.nextInt(WORKING_GROUPS.size())));
                    wg.setParticipationLevel(PARTICIPATION_LEVELS.get(r.nextInt(PARTICIPATION_LEVELS.size())));
                    // get a random instance of time
                    Instant inst = Instant.now().minus(r.nextInt(1000000), ChronoUnit.SECONDS);
                    wg.setEffectiveDate(new Date(inst.getEpochSecond()));
                    wg.setContact(generateContact(mf.getId(), Optional.empty()));
                    wg.setForm(mf);
                    wgs.add(wg);
                }
            }
            organizations = dao.add(new RDBMSQuery<>(wrap, filters.get(Organization.class)), organizations);
            contacts = dao.add(new RDBMSQuery<>(wrap, filters.get(Contact.class)), contacts);
            wgs = dao.add(new RDBMSQuery<>(wrap, filters.get(WorkingGroup.class)), wgs);
            LOGGER.debug("Created {} contacts", contacts.size());
            LOGGER.debug("Created {} organizations", organizations.size());
            LOGGER.debug("Created {} working groups", wgs.size());
        }
    }

    private Contact generateContact(String formID, Optional<String> type) {
        Contact c = new Contact();
        c.setFormID(formID);
        c.setTitle("Sample Title");
        c.setfName(RandomStringUtils.randomAlphabetic(4, 10));
        c.setlName(RandomStringUtils.randomAlphabetic(4, 10));
        c.setType(type.orElse("working_group"));
        c.setEmail(RandomStringUtils.randomAlphabetic(4, 10));
        return c;
    }
}
