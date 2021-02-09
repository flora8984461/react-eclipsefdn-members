package org.eclipsefoundation.react.model;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.json.bind.annotation.JsonbTransient;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.ws.rs.core.MultivaluedMap;

import org.eclipsefoundation.core.namespace.DefaultUrlParameterNames;
import org.eclipsefoundation.persistence.dto.BareNode;
import org.eclipsefoundation.persistence.dto.filter.DtoFilter;
import org.eclipsefoundation.persistence.model.DtoTable;
import org.eclipsefoundation.persistence.model.ParameterizedSQLStatement;
import org.eclipsefoundation.persistence.model.ParameterizedSQLStatementBuilder;
import org.eclipsefoundation.react.namespace.MembershipFormAPIParameterNames;
import org.hibernate.annotations.GenericGenerator;

@Table
@Entity
public class Organization extends BareNode {
    public static final DtoTable TABLE = new DtoTable(Organization.class, "o");

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    private String id;
    private String legalName;
    private String twitterHandle;

    // form entity
    @JsonbTransient
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "form_id", referencedColumnName = "id")
    private MembershipForm form;
    @Column(name = "form_id", updatable = false, insertable = false)
    private String formID;

    @OneToOne(cascade = CascadeType.ALL)
    private Address address;

    @Override
    public String getId() {
        return id;
    }

    /** @param id the id to set */
    @JsonbTransient
    public void setId(String id) {
        this.id = id;
    }

    /** @return the formID */
    public String getFormID() {
        return formID;
    }

    /** @param formID the formID to set */
    @JsonbTransient
    public void setFormID(String formID) {
        this.formID = formID;
    }

    /**
     * @return the form
     */
    public MembershipForm getForm() {
        return form;
    }

    /**
     * @param form the form to set
     */
    public void setForm(MembershipForm form) {
        this.form = form;
    }

    /** @return the legalName */
    public String getLegalName() {
        return legalName;
    }

    /** @param legalName the legalName to set */
    public void setLegalName(String legalName) {
        this.legalName = legalName;
    }

    /**
     * @return the twitterHandle
     */
    public String getTwitterHandle() {
        return twitterHandle;
    }

    /**
     * @param twitterHandle the twitterHandle to set
     */
    public void setTwitterHandle(String twitterHandle) {
        this.twitterHandle = twitterHandle;
    }

    /** @return the address */
    public Address getAddress() {
        return address;
    }

    /** @param address the address to set */
    public void setAddress(Address address) {
        this.address = address;
    }

    @Singleton
    public static class OrganizationFilter implements DtoFilter<Organization> {
        @Inject
        ParameterizedSQLStatementBuilder builder;

        @Override
        public ParameterizedSQLStatement getFilters(MultivaluedMap<String, String> params, boolean isRoot) {
            ParameterizedSQLStatement stmt = builder.build(TABLE);
            if (isRoot) {
                // ID check
                String id = params.getFirst(DefaultUrlParameterNames.ID.getName());
                if (id != null) {
                    stmt.addClause(
                            new ParameterizedSQLStatement.Clause(TABLE.getAlias() + ".id = ?", new Object[] { id }));
                }
            }
            // user ID check
            String formId = params.getFirst(MembershipFormAPIParameterNames.FORM_ID.getName());
            if (formId != null) {
                stmt.addClause(new ParameterizedSQLStatement.Clause(TABLE.getAlias() + ".form.id = ?",
                        new Object[] { formId }));
            }
            return stmt;
        }

        @Override
        public Class<Organization> getType() {
            return Organization.class;
        }
    }
}
