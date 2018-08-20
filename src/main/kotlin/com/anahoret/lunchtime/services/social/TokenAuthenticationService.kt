package com.anahoret.lunchtime.services.social

import com.anahoret.lunchtime.config.JwtConfig
import com.anahoret.lunchtime.domain.auth.UserAuthentication
import com.anahoret.lunchtime.web.handlers.social.TokenHandler
import org.springframework.context.annotation.Bean
import org.springframework.stereotype.Service
import javax.servlet.http.Cookie
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse
import javax.xml.bind.DatatypeConverter

@Service
class TokenAuthenticationService(val jwtConfig: JwtConfig) {

    @Bean
    fun tokenHandler() = TokenHandler(DatatypeConverter.parseBase64Binary(jwtConfig.secret))

    fun addAuthentication(response: HttpServletResponse, authentication: UserAuthentication) {
        val user = authentication.details
        user.expires = System.currentTimeMillis() + jwtConfig.expirationTime
        val token = tokenHandler().createTokenForUser(user)

        // Put the token into a cookie because the client can't capture response
        // headers of redirects / full page reloads.
        // (Its reloaded as a result of this response triggering a redirect back to "/")
        response.addCookie(createCookieForToken(token))
    }

    fun getAuthentication(request: HttpServletRequest): UserAuthentication? =
        // to prevent CSRF attacks we still only allow authentication using a custom HTTP header
        // (it is up to the client to read our previously set cookie and put it in the header)
        request.getHeader(jwtConfig.header)?.let { token ->
            tokenHandler().parseUserFromToken(token)?.let { user -> UserAuthentication(user) }
        }

    private fun createCookieForToken(token: String) = Cookie(jwtConfig.cookie, token).also { it.path = "/" }
}
