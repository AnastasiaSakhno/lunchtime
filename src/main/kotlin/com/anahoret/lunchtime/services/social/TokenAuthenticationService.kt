package com.anahoret.lunchtime.services.social

import com.anahoret.lunchtime.domain.auth.UserAuthentication
import com.anahoret.lunchtime.web.handlers.social.TokenHandler
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.stereotype.Service
import javax.servlet.http.Cookie
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse
import javax.xml.bind.DatatypeConverter

@Service
class TokenAuthenticationService(@Value("\${jwt.secret}") private val secret: String) {

    @Bean
    fun tokenHandler() = TokenHandler(DatatypeConverter.parseBase64Binary(secret))

    fun addAuthentication(response: HttpServletResponse, authentication: UserAuthentication) {
        val user = authentication.details
        user.expires = System.currentTimeMillis() + TEN_DAYS
        val token = tokenHandler().createTokenForUser(user)

        // Put the token into a cookie because the client can't capture response
        // headers of redirects / full page reloads.
        // (Its reloaded as a result of this response triggering a redirect back to "/")
        response.addCookie(createCookieForToken(token))
    }

    fun getAuthentication(request: HttpServletRequest): UserAuthentication? =
        // to prevent CSRF attacks we still only allow authentication using a custom HTTP header
        // (it is up to the client to read our previously set cookie and put it in the header)
        request.getHeader(AUTH_HEADER_NAME)?.let { token ->
            tokenHandler().parseUserFromToken(token)?.let { user -> UserAuthentication(user) }
        }

    private fun createCookieForToken(token: String) = Cookie(AUTH_COOKIE_NAME, token).also { it.path = "/" }

    companion object {
        private const val AUTH_HEADER_NAME = "X-AUTH-TOKEN"
        private const val AUTH_COOKIE_NAME = "AUTH-TOKEN"
        private const val TEN_DAYS = (1000 * 60 * 60 * 24 * 10).toLong()
    }
}
