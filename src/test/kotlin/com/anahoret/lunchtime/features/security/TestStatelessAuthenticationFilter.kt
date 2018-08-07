package com.anahoret.lunchtime.features.security

import com.anahoret.lunchtime.config.JwtConfig
import com.anahoret.lunchtime.domain.UserRole
import com.anahoret.lunchtime.domain.auth.UserAuthentication
import com.anahoret.lunchtime.features.interceptors.TestLoginInterceptor
import com.anahoret.lunchtime.security.StatelessAuthenticationFilter
import com.anahoret.lunchtime.services.social.TokenAuthenticationService
import org.springframework.context.annotation.Profile
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.core.userdetails.User
import org.springframework.stereotype.Component
import javax.servlet.FilterChain
import javax.servlet.ServletRequest
import javax.servlet.ServletResponse
import javax.servlet.http.Cookie
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

@Component
@Profile("test")
class TestStatelessAuthenticationFilter(private val tokenAuthenticationService: TokenAuthenticationService, private val jwtConfig: JwtConfig) : StatelessAuthenticationFilter() {

    override fun doFilter(request: ServletRequest, response: ServletResponse, chain: FilterChain) {

        setAuthenticationFromHeader(request as HttpServletRequest)
        (response as HttpServletResponse).let {
            val url = (request as HttpServletRequest).requestURI
            if(url.contains(AUTH_REGEX)) {
                val token = "eyJpZCI6MSwiZnVsbE5hbWUiOiLQkNC90LDRgdGC0LDRgdC40Y8g0KHQsNGF0L3QviIsInVzZXJuYW1lIjoiYXNrQGFuYWRlYWluYy5jb20iLCJleHBpcmVzIjoxNTM2MTMyMjA0ODgzLCJyb2xlcyI6WyJSRUdVTEFSIiwiQURNSU4iXX0.TydCZ0SEHuk6uMC9R__ZyLuhXwtVLTtTmNQp_ijuREI"
                it.setHeader("Set-Cookie", "${jwtConfig.cookie}=$token; Path=/; Domain=localhost")
                it.setHeader(jwtConfig.header, token)
                it.addCookie(Cookie(jwtConfig.cookie, token))
                it.sendRedirect("/")
                return
            }
        }

        chain.doFilter(request, response)
    }

    private fun setAuthenticationFromHeader(request: HttpServletRequest) {
        val user = com.anahoret.lunchtime.domain.User()
        user.providerId = "google"
        user.fullName = "Анастасия Сахно"
        user.setUsername("ask@anadeainc.com")
        user.accessToken = "ya29.GmDvBcIubSVyAjPHyiZFn0pWrfQIZgTO4IGVUOLxvv8oQhGtvddGzcQg2D8GN4TZb1HpWqLFufT9blzJYX1xFYzOca9M_oI-pl8lEFvPMfNsoiYqlADQQoCcgJj-Ij4GknU"
        user.expires = System.currentTimeMillis() + jwtConfig.expirationTime
        user.id = 1
        user.roles = setOf(UserRole.ADMIN, UserRole.REGULAR)
        SecurityContextHolder.getContext().authentication = UserAuthentication(user)
    }

    companion object {
        private val AUTH_REGEX = Regex("auth/google")
    }
}
