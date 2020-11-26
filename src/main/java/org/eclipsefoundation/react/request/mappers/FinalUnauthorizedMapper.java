/* Copyright (c) 2019 Eclipse Foundation and others.
 * This program and the accompanying materials are made available
 * under the terms of the Eclipse Public License 2.0
 * which is available at http://www.eclipse.org/legal/epl-v20.html,
 * SPDX-License-Identifier: EPL-2.0
 */
package org.eclipsefoundation.react.request.mappers;

import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

import org.eclipsefoundation.react.exception.FinalUnauthorizedException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Exception mapper to allow 403 to be thrown past auth barrier. Typical unauthorized exceptions
 * cause redirects through OIDC layers which isn't always wanted
 *
 * @author Martin Lowe
 */
@Provider
public class FinalUnauthorizedMapper implements ExceptionMapper<FinalUnauthorizedException> {
  private static final Logger LOGGER = LoggerFactory.getLogger(FinalUnauthorizedMapper.class);

  @Override
  public Response toResponse(FinalUnauthorizedException exception) {
    LOGGER.error(exception.getMessage(), exception);
    // return an empty response with a server error response
    return Response.status(403).build();
  }
}
