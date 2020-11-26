package org.eclipsefoundation.react.helper;

import java.util.ArrayList;
import java.util.Base64;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

import javax.inject.Singleton;

import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.eclipsefoundation.react.exception.FinalUnauthorizedException;
import org.eclipsefoundation.react.model.AdditionalUserData;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import io.quarkus.security.UnauthorizedException;

@Singleton
public final class CSRFHelper {
  public static final Logger LOGGER = LoggerFactory.getLogger(CSRFHelper.class);
  public static final String CSRF_HEADER_NAME = "x-csrf-token";

  @ConfigProperty(name = "security.token.salt")
  String salt;

  @ConfigProperty(name = "security.csrf.enabled", defaultValue = "true")
  boolean csrfEnabled;
  /**
   * Generate a new CSRF token that has been hardened to make it more difficult to predict.
   *
   * @param ex
   * @return
   */
  @SuppressWarnings("java:S3012")
  public String getNewCSRFToken() {
    // use a random value salted with a configured static value
    UUID base = UUID.randomUUID();
    String strippedUUID = base.toString().replace("-", "");
    String preScramble = strippedUUID + salt;
    // convert the string to a list to shuffle
    List<Character> charContainer = new ArrayList<>(preScramble.length());
    for (char c : preScramble.toCharArray()) {
      charContainer.add(c);
    }
    // reorder all of the characters
    Collections.shuffle(charContainer);
    // reassemble into a string via string builder
    StringBuilder sb = new StringBuilder(charContainer.size());
    charContainer.stream().forEach(sb::append);
    // encode the resulting string
    return new String(Base64.getEncoder().encode(sb.toString().getBytes()));
  }

  /**
   * Compares the passed CSRF token to the token for the current user session. After the comparison,
   * the CSRF token is scrubbed from the session.
   *
   * @param aud session data for current user
   * @param passedCSRF the passed CSRF header data
   * @throws UnauthorizedException when CSRF token is missing in the user data, the passed header
   *     value, or does not match
   */
  public void compareCSRF(AdditionalUserData aud, String passedCSRF) {
    if (csrfEnabled) {
      LOGGER.debug(
          "Comparing following tokens:\n{}\n{}", aud == null ? null : aud.getCsrf(), passedCSRF);
      try {
        if (aud == null || aud.getCsrf() == null) {
          throw new FinalUnauthorizedException(
              "CSRF token not generated for current request and is required, refusing request");
        } else if (passedCSRF == null) {
          throw new FinalUnauthorizedException(
              "No CSRF token passed for current request, refusing request");
        } else if (!passedCSRF.equals(aud.getCsrf())) {
          throw new FinalUnauthorizedException("CSRF tokens did not match, refusing request");
        }
      } finally {
        // clear the CSRF token if its set after attempt to use
        if (aud != null) {
          aud.setCsrf(null);
        }
      }
    }
  }
}
