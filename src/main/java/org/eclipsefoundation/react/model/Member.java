package org.eclipsefoundation.react.model;

import java.util.Date;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.ws.rs.core.MultivaluedMap;

import org.eclipsefoundation.persistence.dto.BareNode;
import org.eclipsefoundation.persistence.dto.filter.DtoFilter;
import org.eclipsefoundation.persistence.model.DtoTable;
import org.eclipsefoundation.persistence.model.ParameterizedSQLStatement;
import org.eclipsefoundation.persistence.model.ParameterizedSQLStatementBuilder;

public class Member extends BareNode {
  public static final DtoTable TABLE = new DtoTable(Member.class, "m");

  private String id;
  private String description;
  private Date dateAdded;

  /** @return the id */
  @Override
  public String getId() {
    return id;
  }
  /** @param id the id to set */
  public void setId(String id) {
    this.id = id;
  }
  /** @return the description */
  public String getDescription() {
    return description;
  }
  /** @param description the description to set */
  public void setDescription(String description) {
    this.description = description;
  }
  /** @return the dateAdded */
  public Date getDateAdded() {
    return dateAdded;
  }
  /** @param dateAdded the dateAdded to set */
  public void setDateAdded(Date dateAdded) {
    this.dateAdded = dateAdded;
  }

  @Singleton
  public static class MemberFilter implements DtoFilter<Member> {
    @Inject ParameterizedSQLStatementBuilder builder;

    @Override
    public ParameterizedSQLStatement getFilters(MultivaluedMap<String, String> var1, boolean var2) {
      return builder.build(TABLE);
    }

    @Override
    public Class<Member> getType() {
      return Member.class;
    }
  }
}
