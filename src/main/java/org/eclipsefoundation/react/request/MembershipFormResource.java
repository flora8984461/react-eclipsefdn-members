package org.eclipsefoundation.react.request;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response;

import org.eclipsefoundation.core.namespace.DefaultUrlParameterNames;
import org.eclipsefoundation.persistence.model.RDBMSQuery;
import org.eclipsefoundation.react.helper.CSRFHelper;
import org.eclipsefoundation.react.model.MembershipForm;
import org.eclipsefoundation.react.namespace.MembershipFormAPIParameterNames;
import org.jboss.resteasy.specimpl.MultivaluedMapImpl;

import io.quarkus.security.Authenticated;

/**
 * Handles membership form CRUD requests.
 *
 * @author Martin Lowe
 */
@Authenticated
@Path("membership")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class MembershipFormResource extends AbstractRESTResource {

  @GET
  public Response getAll(@HeaderParam(value = CSRFHelper.CSRF_HEADER_NAME) String csrf) {
    // ensure csrf
    csrfHelper.compareCSRF(aud, csrf);
    // retrieve the possible cached object
    Optional<List<MembershipForm>> cachedResults =
        cache.get(
            ALL_CACHE_PLACEHOLDER,
            wrap.asMap(),
            MembershipForm.class,
            () -> dao.get(new RDBMSQuery<>(wrap, filters.get(MembershipForm.class), null)));
    if (!cachedResults.isPresent()) {
      return Response.serverError().build();
    }
    // return the results as a response
    return responseBuider.build(
        ALL_CACHE_PLACEHOLDER,
        wrap,
        (MultivaluedMap<String, String>) null,
        cachedResults.get(),
        MembershipForm.class);
  }

  @GET
  @Path("{userId}")
  public Response getByUser(
      @PathParam("userId") String userID,
      @HeaderParam(value = CSRFHelper.CSRF_HEADER_NAME) String csrf) {
    // ensure csrf
    csrfHelper.compareCSRF(aud, csrf);
    // create parameter map
    MultivaluedMap<String, String> params = new MultivaluedMapImpl<>();
    params.add(MembershipFormAPIParameterNames.USER_ID.getName(), userID);

    // retrieve the possible cached object
    Optional<List<MembershipForm>> cachedResults =
        cache.get(
        		ALL_CACHE_PLACEHOLDER,
            params,
            MembershipForm.class,
            () -> dao.get(new RDBMSQuery<>(wrap, filters.get(MembershipForm.class), params)));
    if (!cachedResults.isPresent()) {
      return Response.serverError().build();
    }
    // return the results as a response
    return responseBuider.build(ALL_CACHE_PLACEHOLDER, wrap, params, cachedResults.get(), MembershipForm.class);
  }

  @GET
  @Path("{userId}/{id}")
  public Response get(
      @PathParam("userId") String userID,
      @HeaderParam(value = CSRFHelper.CSRF_HEADER_NAME) String csrf) {
    // ensure csrf
    csrfHelper.compareCSRF(aud, csrf);
    // create parameter map
    MultivaluedMap<String, String> params = new MultivaluedMapImpl<>();
    params.add(MembershipFormAPIParameterNames.USER_ID.getName(), userID);

    // retrieve the possible cached object
    Optional<List<MembershipForm>> cachedResults =
        cache.get(
            userID,
            params,
            MembershipForm.class,
            () -> dao.get(new RDBMSQuery<>(wrap, filters.get(MembershipForm.class), params)));
    if (!cachedResults.isPresent()) {
      return Response.serverError().build();
    }
    // return the results as a response
    return responseBuider.build(userID, wrap, params, cachedResults.get(), MembershipForm.class);
  }

  @PUT
  public List<MembershipForm> update(MembershipForm mem) {
    return dao.add(new RDBMSQuery<>(wrap, filters.get(MembershipForm.class)), Arrays.asList(mem));
  }

  @DELETE
  @Path("{userId}/{id}")
  public Response delete(@PathParam("userId") String userID, @PathParam("id") String id) {
    MultivaluedMap<String, String> params = new MultivaluedMapImpl<>();
    params.add(DefaultUrlParameterNames.ID.getName(), id);
    params.add(MembershipFormAPIParameterNames.USER_ID.getName(), userID);

    dao.delete(new RDBMSQuery<>(wrap, filters.get(MembershipForm.class), params));
    return Response.ok().build();
  }
}
