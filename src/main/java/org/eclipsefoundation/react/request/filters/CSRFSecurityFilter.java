package org.eclipsefoundation.react.request.filters;

import java.io.IOException;

import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;

import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.eclipsefoundation.react.exception.FinalUnauthorizedException;
import org.eclipsefoundation.react.helper.CSRFHelper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import io.undertow.httpcore.HttpMethodNames;

public class CSRFSecurityFilter implements ContainerRequestFilter {
  public static final Logger LOGGER = LoggerFactory.getLogger(CSRFSecurityFilter.class);

  @ConfigProperty(name = "security.csrf.enabled", defaultValue = "true")
  boolean csrfEnabled;

  @Override
  public void filter(ContainerRequestContext requestContext) throws IOException {
    if (csrfEnabled) {
      // check if the HTTP method indicates a mutation
      String method = requestContext.getMethod();
      if (HttpMethodNames.DELETE.equals(method)
          || HttpMethodNames.POST.equals(method)
          || HttpMethodNames.PUT.equals(method)) {
        // check csrf token presence (not value)
        String csrf = requestContext.getHeaderString(CSRFHelper.CSRF_HEADER_NAME);
        if (csrf == null || "".equals(csrf.trim())) {
          throw new FinalUnauthorizedException(
              "No CSRF token passed for mutation call, refusing connection");
        }
      }
    }
  }
}
