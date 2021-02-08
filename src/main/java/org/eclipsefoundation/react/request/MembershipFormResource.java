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
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;

import org.eclipsefoundation.core.helper.CSRFHelper;
import org.eclipsefoundation.core.namespace.DefaultUrlParameterNames;
import org.eclipsefoundation.persistence.model.RDBMSQuery;
import org.eclipsefoundation.react.model.MembershipForm;
import org.eclipsefoundation.react.model.WorkingGroup;
import org.eclipsefoundation.react.namespace.MembershipFormAPIParameterNames;
import org.jboss.resteasy.specimpl.MultivaluedMapImpl;

import io.quarkus.security.Authenticated;

/**
 * Handles membership form CRUD requests.
 *
 * @author Martin Lowe
 */
@Authenticated
@Path("form")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class MembershipFormResource extends AbstractRESTResource {

    @Context
    SecurityContext ctx;

    @GET
    public Response getAll(@HeaderParam(value = CSRFHelper.CSRF_HEADER_NAME) String csrf) {
        // ensure csrf
        csrfHelper.compareCSRF(aud, csrf);
        // create parameter map
        MultivaluedMap<String, String> params = new MultivaluedMapImpl<>();
        params.add(MembershipFormAPIParameterNames.USER_ID.getName(), ident.getPrincipal().getName());
        // retrieve the possible cached object
        Optional<List<MembershipForm>> cachedResults = cache.get(ALL_CACHE_PLACEHOLDER, params, MembershipForm.class,
                () -> dao.get(new RDBMSQuery<>(wrap, filters.get(MembershipForm.class), params)));
        if (!cachedResults.isPresent()) {
            return Response.serverError().build();
        }
        // return the results as a response
        return responseBuider.build(ALL_CACHE_PLACEHOLDER, wrap, params, cachedResults.get(), MembershipForm.class);
    }

    @GET
    @Path("{id}")
    public Response get(@PathParam("id") String transactionID,
            @HeaderParam(value = CSRFHelper.CSRF_HEADER_NAME) String csrf) {
        // ensure csrf
        csrfHelper.compareCSRF(aud, csrf);
        // create parameter map
        MultivaluedMap<String, String> params = new MultivaluedMapImpl<>();
        params.add(DefaultUrlParameterNames.ID.getName(), transactionID);

        // retrieve the possible cached object
        Optional<List<MembershipForm>> cachedResults = cache.get(transactionID, params, MembershipForm.class,
                () -> dao.get(new RDBMSQuery<>(wrap, filters.get(MembershipForm.class), params)));
        if (!cachedResults.isPresent()) {
            return Response.serverError().build();
        }
        // return the results as a response
        return responseBuider.build(transactionID, wrap, params, cachedResults.get(), MembershipForm.class);
    }

    @PUT
    public List<MembershipForm> update(MembershipForm mem) {
        return dao.add(new RDBMSQuery<>(wrap, filters.get(MembershipForm.class)), Arrays.asList(mem));
    }

    @DELETE
    @Path("{id}")
    public Response delete(@PathParam("id") String transactionID) {
        MultivaluedMap<String, String> params = new MultivaluedMapImpl<>();
        params.add(DefaultUrlParameterNames.ID.getName(), transactionID);
        params.add(MembershipFormAPIParameterNames.USER_ID.getName(), ident.getPrincipal().getName());

        dao.delete(new RDBMSQuery<>(wrap, filters.get(MembershipForm.class), params));
        return Response.ok().build();
    }

    @GET
    @Path("{id}/working_groups")
    public Response getWorkingGroups(@PathParam("id") String transactionID,
            @HeaderParam(value = CSRFHelper.CSRF_HEADER_NAME) String csrf) {
        // ensure csrf
        csrfHelper.compareCSRF(aud, csrf);
        // create parameter map
        MultivaluedMap<String, String> params = new MultivaluedMapImpl<>();
        params.add(MembershipFormAPIParameterNames.FORM_ID.getName(), transactionID);
        // retrieve the possible cached object
        Optional<List<WorkingGroup>> cachedResults = cache.get(ALL_CACHE_PLACEHOLDER, params, WorkingGroup.class,
                () -> dao.get(new RDBMSQuery<>(wrap, filters.get(WorkingGroup.class), params)));
        if (!cachedResults.isPresent()) {
            return Response.serverError().build();
        }
        // return the results as a response
        return responseBuider.build(ALL_CACHE_PLACEHOLDER, wrap, params, cachedResults.get(), WorkingGroup.class);
    }

    @GET
    @Path("{id}/working_groups/{wgID}")
    public Response getWorkingGroup(@PathParam("id") String transactionID, @PathParam("wgID") String wgID,
            @HeaderParam(value = CSRFHelper.CSRF_HEADER_NAME) String csrf) {
        // ensure csrf
        csrfHelper.compareCSRF(aud, csrf);
        // create parameter map
        MultivaluedMap<String, String> params = new MultivaluedMapImpl<>();
        params.add(DefaultUrlParameterNames.ID.getName(), wgID);
        params.add(MembershipFormAPIParameterNames.FORM_ID.getName(), transactionID);
        // retrieve the possible cached object
        Optional<List<WorkingGroup>> cachedResults = cache.get(wgID, params, WorkingGroup.class,
                () -> dao.get(new RDBMSQuery<>(wrap, filters.get(WorkingGroup.class), params)));
        if (!cachedResults.isPresent()) {
            return Response.serverError().build();
        }
        // return the results as a response
        return responseBuider.build(wgID, wrap, params, cachedResults.get(), WorkingGroup.class);
    }

    @PUT
    @Path("{id}/working_groups/{wgID}")
    public List<WorkingGroup> updateWorkingGroup(@PathParam("id") String transactionID, WorkingGroup wg, @PathParam("id") String wgID) {
        wg.setForm(dao.getReference(transactionID, MembershipForm.class));
        wg.setId(wgID);
        return dao.add(new RDBMSQuery<>(wrap, filters.get(WorkingGroup.class)), Arrays.asList(wg));
    }

    @DELETE
    @Path("{id}/working_groups/{wgID}")
    public Response deleteWorkingGroup(@PathParam("id") String transactionID) {
        MultivaluedMap<String, String> params = new MultivaluedMapImpl<>();
        params.add(DefaultUrlParameterNames.ID.getName(), transactionID);
        params.add(MembershipFormAPIParameterNames.USER_ID.getName(), ident.getPrincipal().getName());

        dao.delete(new RDBMSQuery<>(wrap, filters.get(WorkingGroup.class), params));
        return Response.ok().build();
    }
}
