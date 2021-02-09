package org.eclipsefoundation.react.request;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response;

import org.eclipsefoundation.core.helper.CSRFHelper;
import org.eclipsefoundation.core.namespace.DefaultUrlParameterNames;
import org.eclipsefoundation.persistence.model.RDBMSQuery;
import org.eclipsefoundation.react.model.Contact;
import org.eclipsefoundation.react.model.MembershipForm;
import org.eclipsefoundation.react.namespace.MembershipFormAPIParameterNames;
import org.jboss.resteasy.specimpl.MultivaluedMapImpl;

import io.quarkus.security.Authenticated;

/**
 * Handles contact CRUD requests.
 *
 * @author Martin Lowe
 */
@Authenticated
@Path("form/{id}/contacts")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ContactsResource extends AbstractRESTResource {

    @GET
    public Response getAll(@PathParam("id") String formID,
            @HeaderParam(value = CSRFHelper.CSRF_HEADER_NAME) String csrf) {
        // ensure csrf
        csrfHelper.compareCSRF(aud, csrf);
        // create parameter map
        MultivaluedMap<String, String> params = new MultivaluedMapImpl<>();
        params.add(MembershipFormAPIParameterNames.FORM_ID.getName(), formID);

        // retrieve the possible cached object
        Optional<List<Contact>> cachedResults = cache.get(ALL_CACHE_PLACEHOLDER, params, Contact.class,
                () -> dao.get(new RDBMSQuery<>(wrap, filters.get(Contact.class), params)));
        if (!cachedResults.isPresent()) {
            return Response.serverError().build();
        }
        // return the results as a response
        return responseBuider.build(ALL_CACHE_PLACEHOLDER, wrap, params, cachedResults.get(), Contact.class);
    }

    @POST
    public List<Contact> create(@PathParam("id") String formID, Contact contact) {
        contact.setForm(dao.getReference(formID, MembershipForm.class));
        return dao.add(new RDBMSQuery<>(wrap, filters.get(Contact.class)), Arrays.asList(contact));
    }

    @GET
    @Path("{contactID}")
    public Response get(@PathParam("id") String formID, @PathParam("contactID") String contactID,
            @HeaderParam(value = CSRFHelper.CSRF_HEADER_NAME) String csrf) {
        // ensure csrf
        csrfHelper.compareCSRF(aud, csrf);
        // create parameter map
        MultivaluedMap<String, String> params = new MultivaluedMapImpl<>();
        params.add(MembershipFormAPIParameterNames.FORM_ID.getName(), formID);
        params.add(DefaultUrlParameterNames.ID.getName(), contactID);

        // retrieve the possible cached object
        Optional<List<Contact>> cachedResults = cache.get(contactID, params, Contact.class,
                () -> dao.get(new RDBMSQuery<>(wrap, filters.get(Contact.class), params)));
        if (!cachedResults.isPresent()) {
            return Response.serverError().build();
        }
        // return the results as a response
        return responseBuider.build(contactID, wrap, params, cachedResults.get(), Contact.class);
    }

    @PUT
    @Path("{contactID}")
    public List<Contact> update(@PathParam("id") String formID, @PathParam("contactID") String id, Contact contact) {
        contact.setId(id);
        contact.setForm(dao.getReference(formID, MembershipForm.class));
        return dao.add(new RDBMSQuery<>(wrap, filters.get(Contact.class)), Arrays.asList(contact));
    }

    @DELETE
    @Path("{contactID}")
    public Response delete(@PathParam("id") String formID, @PathParam("contactID") String id) {
        MultivaluedMap<String, String> params = new MultivaluedMapImpl<>();
        params.add(DefaultUrlParameterNames.ID.getName(), id);
        params.add(MembershipFormAPIParameterNames.FORM_ID.getName(), formID);

        dao.delete(new RDBMSQuery<>(wrap, filters.get(Contact.class), params));
        return Response.ok().build();
    }
}
