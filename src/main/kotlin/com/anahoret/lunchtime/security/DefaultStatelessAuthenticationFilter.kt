package com.anahoret.lunchtime.security

import com.anahoret.lunchtime.domain.auth.UserAuthentication
import com.anahoret.lunchtime.services.social.TokenAuthenticationService
import org.springframework.context.annotation.Profile
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Component
import javax.servlet.FilterChain
import javax.servlet.ServletRequest
import javax.servlet.ServletResponse
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse
import javax.servlet.http.HttpServletResponseWrapper

@Component
@Profile("default")
class DefaultStatelessAuthenticationFilter(private val tokenAuthenticationService: TokenAuthenticationService) : StatelessAuthenticationFilter() {

    override fun doFilter(request: ServletRequest, response: ServletResponse, chain: FilterChain) {

        // if no authentication in cookies, check if the url is /auth/google
        // if the url is not /auth/google, redirect to /auth/google

        // if authentication is not null, check if token is expired and redirect to /auth/google if so
        val authentication: UserAuthentication? = tokenAuthenticationService.getAuthentication(request as HttpServletRequest)
        if(authentication == null) {
            if(!request.requestURI.endsWith(AUTH_PATTERN)) {
                chain.doFilter(request, getSendRedirectWrapper(response))
            } else {
                chain.doFilter(request, response)
            }
        } else {
            // if token is expired, also send redirect to /auth/google
            if(authentication.principal.expires < System.currentTimeMillis()) {
                setAuthenticationFromCookies(request)
                chain.doFilter(request, getSendRedirectWrapper(response))
            } else {
                chain.doFilter(request, response)
            }
        }

    }

    private fun setAuthenticationFromCookies(request: HttpServletRequest) {
        SecurityContextHolder.getContext().authentication.takeIf { it !is UserAuthentication }.apply {
            tokenAuthenticationService.getAuthentication(request)?.let {
                SecurityContextHolder.getContext().authentication = it
            }
        }
    }

    private fun getSendRedirectWrapper(response: ServletResponse)
        = object: HttpServletResponseWrapper(response as HttpServletResponse) {
            init {
                setHeader("Location", AUTH_PATTERN)
                status = HttpServletResponse.SC_MOVED_TEMPORARILY
            }
        }

    companion object {
        private const val AUTH_PATTERN = "/auth/google"
    }
}
