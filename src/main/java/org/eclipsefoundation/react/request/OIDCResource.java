package org.eclipsefoundation.react.request;

import java.net.URI;
import java.net.URISyntaxException;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;

import org.eclipsefoundation.core.helper.CSRFHelper;
import org.eclipsefoundation.core.model.AdditionalUserData;
import org.eclipsefoundation.core.model.RequestWrapper;

import io.quarkus.security.Authenticated;
import io.quarkus.security.identity.SecurityIdentity;

/**
 * Handles OIDC routing for the request.
 *
 * @author Martin Lowe
 */
@Path("")
public class OIDCResource {
    @Inject
    CSRFHelper csrfHelper;
    @Inject
    AdditionalUserData aud;
    @Inject
    RequestWrapper wrap;
    @Inject
    SecurityIdentity ident;

    @GET
    @Authenticated
    @Path("/login")
    public Response routeLogin() throws URISyntaxException {
        return redirect("/");
    }

    /**
     * While OIDC plugin takes care of actual logout, a route is needed to properly reroute anon user to home page.
     *
     * @throws URISyntaxException
     */
    @GET
    @Path("/logout")
    public Response routeLogout() throws URISyntaxException {
        return redirect("/");
    }

    @GET
    @Path("userinfo")
    public Response getUserInfo() {
        if (!ident.isAnonymous()) {
            return Response.ok(ident.getPrincipal().toString()).build();
        } else {
            return Response.ok().build();
        }
    }

    @GET
    @Path("csrf")
    public Response generateCSRF() {
        if (!ident.isAnonymous()) {
            aud.setCsrf(csrfHelper.getNewCSRFToken());
            wrap.setHeader("csrf", aud.getCsrf());
            return Response.ok().build();
        } else {
            return Response.status(403).build();
        }
    }

    private Response redirect(String location) throws URISyntaxException {
        return Response.temporaryRedirect(new URI(location)).build();
    }
}
