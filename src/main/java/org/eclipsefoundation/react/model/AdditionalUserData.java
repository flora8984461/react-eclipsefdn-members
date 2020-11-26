package org.eclipsefoundation.react.model;

import javax.enterprise.context.SessionScoped;

@SessionScoped
public class AdditionalUserData {
  private String csrf;

  /** @return the csrf */
  public String getCsrf() {
    return csrf;
  }

  /** @param csrf the csrf to set */
  public void setCsrf(String csrf) {
    this.csrf = csrf;
  }
}
