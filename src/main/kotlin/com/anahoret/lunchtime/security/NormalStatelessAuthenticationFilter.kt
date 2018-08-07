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

@Component
@Profile("default")
class NormalStatelessAuthenticationFilter(private val tokenAuthenticationService: TokenAuthenticationService) : StatelessAuthenticationFilter() {

    override fun doFilter(request: ServletRequest, response: ServletResponse, chain: FilterChain) {

        setAuthenticationFromHeader(request as HttpServletRequest)

        chain.doFilter(request, response)
    }

    private fun setAuthenticationFromHeader(request: HttpServletRequest) {
        SecurityContextHolder.getContext().authentication.takeIf { it !is UserAuthentication }.apply {
            tokenAuthenticationService.getAuthentication(request)?.let {
                SecurityContextHolder.getContext().authentication = it
            }
        }
    }
}
