package org.eclipsefoundation.react.request;

import javax.inject.Inject;

import org.eclipsefoundation.core.helper.ResponseHelper;
import org.eclipsefoundation.core.model.RequestWrapper;
import org.eclipsefoundation.core.service.CachingService;
import org.eclipsefoundation.persistence.dao.PersistenceDao;
import org.eclipsefoundation.persistence.service.FilterService;
import org.eclipsefoundation.react.helper.CSRFHelper;
import org.eclipsefoundation.react.model.AdditionalUserData;

import io.quarkus.security.identity.SecurityIdentity;

/**
 * Provides access to commonly required services and containers for REST request serving.
 *
 * @author Martin Lowe
 */
public abstract class AbstractRESTResource {
  public static final String ALL_CACHE_PLACEHOLDER = "all";

  @Inject PersistenceDao dao;
  @Inject CachingService cache;
  @Inject FilterService filters;

  @Inject RequestWrapper wrap;
  @Inject ResponseHelper responseBuider;

  @Inject CSRFHelper csrfHelper;
  @Inject AdditionalUserData aud;
  @Inject SecurityIdentity ident;
}
