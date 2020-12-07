package org.eclipsefoundation.react.model;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.json.bind.annotation.JsonbProperty;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
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
public class Contact extends BareNode {
  public static final DtoTable TABLE = new DtoTable(Contact.class, "c");

  @Id
  @GeneratedValue(generator = "system-uuid")
  @GenericGenerator(name = "system-uuid", strategy = "uuid")
  private String id;

  private String formID;
  @JsonbProperty(value = "first_name")
  private String fName;
  @JsonbProperty(value = "last_name")
  private String lName;
  private String email;
  private String title;
  private String type;

  @Override
  public String getId() {
    return id;
  }

  /** @param id the id to set */
  public void setId(String id) {
    this.id = id;
  }

  /** @return the formID */
  public String getFormID() {
    return formID;
  }

  /** @param formID the formID to set */
  public void setFormID(String formID) {
    this.formID = formID;
  }

  /** @return the fName */
  public String getfName() {
    return fName;
  }

  /** @param fName the fName to set */
  public void setfName(String fName) {
    this.fName = fName;
  }

  /** @return the lName */
  public String getlName() {
    return lName;
  }

  /** @param lName the lName to set */
  public void setlName(String lName) {
    this.lName = lName;
  }

  /** @return the email */
  public String getEmail() {
    return email;
  }

  /** @param email the email to set */
  public void setEmail(String email) {
    this.email = email;
  }

  /** @return the title */
  public String getTitle() {
    return title;
  }

  /** @param title the title to set */
  public void setTitle(String title) {
    this.title = title;
  }

  /** @return the type */
  public String getType() {
    return type;
  }

  /** @param type the type to set */
  public void setType(String type) {
    this.type = type;
  }

  @Singleton
  public static class ContactFilter implements DtoFilter<Contact> {
    @Inject ParameterizedSQLStatementBuilder builder;

    @Override
    public ParameterizedSQLStatement getFilters(
        MultivaluedMap<String, String> params, boolean isRoot) {
      ParameterizedSQLStatement stmt = builder.build(TABLE);
      if (isRoot) {
        // ID check
        String id = params.getFirst(DefaultUrlParameterNames.ID.getName());
        if (id != null) {
          stmt.addClause(
              new ParameterizedSQLStatement.Clause(
                  TABLE.getAlias() + ".id = ?", new Object[] {id}));
        }
      }
      // user ID check
      String formId = params.getFirst(MembershipFormAPIParameterNames.FORM_ID.getName());
      if (formId != null) {
        stmt.addClause(
            new ParameterizedSQLStatement.Clause(
                TABLE.getAlias() + ".formID = ?", new Object[] {formId}));
      }
      return stmt;
    }

    @Override
    public Class<Contact> getType() {
      return Contact.class;
    }
  }
}
