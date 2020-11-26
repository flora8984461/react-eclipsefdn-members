package org.eclipsefoundation.react.exception;

/**
 * Represents an unauthorized request with no redirect (standard UnauthorizedException gets routed
 * to OIDC login page).
 *
 * @author Martin Lowe
 */
public class FinalUnauthorizedException extends RuntimeException {

  public FinalUnauthorizedException(String message) {
    super(message);
  }

  /** */
  private static final long serialVersionUID = 1L;
}
