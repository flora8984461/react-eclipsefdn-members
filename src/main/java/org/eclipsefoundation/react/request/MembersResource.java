package org.eclipsefoundation.react.request;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response;

import org.eclipsefoundation.core.helper.ResponseHelper;
import org.eclipsefoundation.core.model.RequestWrapper;
import org.eclipsefoundation.core.namespace.DefaultUrlParameterNames;
import org.eclipsefoundation.core.service.CachingService;
import org.eclipsefoundation.persistence.dao.PersistenceDao;
import org.eclipsefoundation.persistence.model.RDBMSQuery;
import org.eclipsefoundation.persistence.service.FilterService;
import org.eclipsefoundation.react.helper.CSRFHelper;
import org.eclipsefoundation.react.model.AdditionalUserData;
import org.eclipsefoundation.react.model.Member;
import org.jboss.resteasy.specimpl.MultivaluedMapImpl;

import io.quarkus.security.identity.SecurityIdentity;

/**
 * Handles OIDC routing for the request.
 *
 * @author Martin Lowe
 */
@Path("members")
@RolesAllowed("")
public class MembersResource {
  @Inject PersistenceDao dao;
  @Inject CachingService cache;
  @Inject FilterService filters;

  @Inject RequestWrapper wrap;
  @Inject ResponseHelper responseBuider;

  @Inject CSRFHelper csrfHelper;
  @Inject AdditionalUserData aud;
  @Inject SecurityIdentity ident;

  @GET
  public Response getAll() {
    // retrieve the possible cached object
    Optional<List<Member>> cachedResults =
        cache.get(
            "all",
            wrap.asMap(),
            Member.class,
            () -> dao.get(new RDBMSQuery<>(wrap, filters.get(Member.class), null)));
    if (!cachedResults.isPresent()) {
      return Response.serverError().build();
    }
    // return the results as a response
    return responseBuider.build(
        "all", wrap, (MultivaluedMap<String, String>) null, cachedResults.get(), Member.class);
  }

  @GET
  @Path("{id}")
  public Response get(@PathParam("id") String id) {
    MultivaluedMap<String, String> params = new MultivaluedMapImpl<>();
    params.add(DefaultUrlParameterNames.ID.getName(), id);

    // retrieve the possible cached object
    Optional<List<Member>> cachedResults =
        cache.get(
            "all",
            wrap.asMap(),
            Member.class,
            () -> dao.get(new RDBMSQuery<>(wrap, filters.get(Member.class), params)));
    if (!cachedResults.isPresent()) {
      return Response.serverError().build();
    }
    // return the results as a response
    return responseBuider.build("all", wrap, params, cachedResults.get(), Member.class);
  }

  @PUT
  public List<Member> update(Member mem) {
    return dao.add(new RDBMSQuery<>(wrap, filters.get(Member.class)), Arrays.asList(mem));
  }

  @DELETE
  @Path("{id}")
  public Response delete(@PathParam("id") String id) {
    MultivaluedMap<String, String> params = new MultivaluedMapImpl<>();
    params.add(DefaultUrlParameterNames.ID.getName(), id);

    dao.delete(new RDBMSQuery<>(wrap, filters.get(Member.class), params));
    return Response.ok().build();
  }
}
