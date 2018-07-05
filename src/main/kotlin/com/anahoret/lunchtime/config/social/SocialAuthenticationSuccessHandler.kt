package com.anahoret.lunchtime.config.social

import org.springframework.security.core.Authentication
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler
import org.springframework.stereotype.Component
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

@Component
class SocialAuthenticationSuccessHandler(
    private val tokenAuthenticationService: TokenAuthenticationService,
    private val userService: SocialUserService) : SavedRequestAwareAuthenticationSuccessHandler() {

    override fun onAuthenticationSuccess(request: HttpServletRequest, response: HttpServletResponse,
                                         authentication: Authentication) {

        // Lookup the complete User object from the database and create an Authentication for it
        val authenticatedUser = userService.loadUserByUsername(authentication.name)

        // Add UserAuthentication to the response
        val userAuthentication = UserAuthentication(authenticatedUser)
        tokenAuthenticationService.addAuthentication(response, userAuthentication)

        super.onAuthenticationSuccess(request, response, authentication)
    }
}
