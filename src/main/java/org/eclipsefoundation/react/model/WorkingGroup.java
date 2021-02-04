package org.eclipsefoundation.react.model;

import java.util.Date;

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

import com.fasterxml.jackson.annotation.JsonProperty;

@Table
@Entity
public class WorkingGroup extends BareNode {
    public static final DtoTable TABLE = new DtoTable(WorkingGroup.class, "wg");

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    private String id;
    @JsonProperty("working_group")
    private String workingGroupID;
    private String participationLevel;
    private Date effectiveDate;

    // form entity
    @JsonbTransient
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "form_id", referencedColumnName = "id")
    private MembershipForm form;
    @Column(name = "form_id", updatable = false, insertable = false)
    private String formID;
    
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(referencedColumnName = "id")
    private Contact contact;

    /**
     * @return the id
     */
    @Override
    public String getId() {
        return id;
    }

    /**
     * @param id the id to set
     */
    public void setId(String id) {
        this.id = id;
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

    /**
     * @return the formID
     */
    public String getFormID() {
        return formID;
    }

    /**
     * @param formID the formID to set
     */
    public void setFormID(String formID) {
        this.formID = formID;
    }

    /**
     * @return the workingGroupID
     */
    public String getWorkingGroupID() {
        return workingGroupID;
    }

    /**
     * @param workingGroupID the workingGroupID to set
     */
    public void setWorkingGroupID(String workingGroupID) {
        this.workingGroupID = workingGroupID;
    }

    /**
     * @return the participationLevel
     */
    public String getParticipationLevel() {
        return participationLevel;
    }

    /**
     * @param participationLevel the participationLevel to set
     */
    public void setParticipationLevel(String participationLevel) {
        this.participationLevel = participationLevel;
    }

    /**
     * @return the effectiveDate
     */
    public Date getEffectiveDate() {
        return effectiveDate;
    }

    /**
     * @param effectiveDate the effectiveDate to set
     */
    public void setEffectiveDate(Date effectiveDate) {
        this.effectiveDate = effectiveDate;
    }

    /**
     * @return the contact
     */
    public Contact getContact() {
        return contact;
    }

    /**
     * @param contact the contact to set
     */
    public void setContact(Contact contact) {
        this.contact = contact;
    }

    @Singleton
    public static class WorkingGroupFilter implements DtoFilter<WorkingGroup> {
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
        public Class<WorkingGroup> getType() {
            return WorkingGroup.class;
        }
    }
}
