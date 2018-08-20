package com.anahoret.lunchtime.features.security

import com.anahoret.lunchtime.config.JwtConfig
import com.anahoret.lunchtime.features.web.AuthenticationStub
import com.anahoret.lunchtime.security.StatelessAuthenticationFilter
import org.springframework.context.annotation.Profile
import org.springframework.stereotype.Component
import javax.servlet.FilterChain
import javax.servlet.ServletRequest
import javax.servlet.ServletResponse
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

@Component
@Profile("test")
class TestStatelessAuthenticationFilter(
    val authenticationStub: AuthenticationStub,
    val jwtConfig: JwtConfig) : StatelessAuthenticationFilter() {

    override fun doFilter(request: ServletRequest, response: ServletResponse, chain: FilterChain) {

        (response as HttpServletResponse).let {
            val url = (request as HttpServletRequest).requestURI
            if(url.contains(AUTH_REGEX)) {
                val token = authenticationStub.authToken()
                it.setHeader("Set-Cookie", "${jwtConfig.cookie}=$token; Path=/; Domain=localhost")
                it.setHeader(jwtConfig.header, token)
                it.sendRedirect("/")
                return
            }
        }

        chain.doFilter(request, response)
    }

    companion object {
        private val AUTH_REGEX = Regex("auth/google")
    }
}
