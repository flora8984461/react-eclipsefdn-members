package org.eclipsefoundation.react.model;

import java.util.Date;

import javax.inject.Inject;
import javax.inject.Singleton;
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
public class MembershipForm extends BareNode {
  public static final DtoTable TABLE = new DtoTable(MembershipForm.class, "m");

  @Id
  @GeneratedValue(generator = "system-uuid")
  @GenericGenerator(name = "system-uuid", strategy = "uuid")
  private String id;

  private String userID;
  private String workingGroup;
  private String participationLevel;
  private String membershipLevel;
  private Date effectiveDate;
  private boolean signingAuthority;

  /** @return the id */
  @Override
  public String getId() {
    return id;
  }
  /** @param id the id to set */
  public void setId(String id) {
    this.id = id;
  }
  /** @return the userId */
  public String getUserID() {
    return userID;
  }
  /** @param userID the userId to set */
  public void setUserID(String userID) {
    this.userID = userID;
  }
  /** @return the workingGroup */
  public String getWorkingGroup() {
    return workingGroup;
  }
  /** @param workingGroup the workingGroup to set */
  public void setWorkingGroup(String workingGroup) {
    this.workingGroup = workingGroup;
  }
  /** @return the participationLevel */
  public String getParticipationLevel() {
    return participationLevel;
  }
  /** @param participationLevel the participationLevel to set */
  public void setParticipationLevel(String participationLevel) {
    this.participationLevel = participationLevel;
  }
  /** @return the membershipLevel */
  public String getMembershipLevel() {
    return membershipLevel;
  }
  /** @param membershipLevel the membershipLevel to set */
  public void setMembershipLevel(String membershipLevel) {
    this.membershipLevel = membershipLevel;
  }
  /** @return the effectiveDate */
  public Date getEffectiveDate() {
    return effectiveDate;
  }
  /** @param effectiveDate the effectiveDate to set */
  public void setEffectiveDate(Date effectiveDate) {
    this.effectiveDate = effectiveDate;
  }
  /** @return the signingAuthority */
  public boolean isSigningAuthority() {
    return signingAuthority;
  }
  /** @param signingAuthority the signingAuthority to set */
  public void setSigningAuthority(boolean signingAuthority) {
    this.signingAuthority = signingAuthority;
  }

  @Override
  public String toString() {
    StringBuilder builder = new StringBuilder();
    builder.append("MembershipForm [id=");
    builder.append(id);
    builder.append(", userID=");
    builder.append(userID);
    builder.append(", workingGroup=");
    builder.append(workingGroup);
    builder.append(", participationLevel=");
    builder.append(participationLevel);
    builder.append(", membershipLevel=");
    builder.append(membershipLevel);
    builder.append(", effectiveDate=");
    builder.append(effectiveDate);
    builder.append(", signingAuthority=");
    builder.append(signingAuthority);
    builder.append("]");
    return builder.toString();
  }

  @Singleton
  public static class MembershipFormFilter implements DtoFilter<MembershipForm> {
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
      String userId = params.getFirst(MembershipFormAPIParameterNames.USER_ID.getName());
      if (userId != null) {
        stmt.addClause(
            new ParameterizedSQLStatement.Clause(
                TABLE.getAlias() + ".userID = ?", new Object[] {userId}));
      }
      return stmt;
    }

    @Override
    public Class<MembershipForm> getType() {
      return MembershipForm.class;
    }
  }
}
