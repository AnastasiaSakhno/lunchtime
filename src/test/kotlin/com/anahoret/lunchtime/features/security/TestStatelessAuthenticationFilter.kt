package com.anahoret.lunchtime.features.security

import com.anahoret.lunchtime.config.JwtConfig
import com.anahoret.lunchtime.repositories.UserRepository
import com.anahoret.lunchtime.security.StatelessAuthenticationFilter
import com.anahoret.lunchtime.services.social.TokenAuthenticationService
import org.springframework.beans.factory.annotation.Value
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
    val tokenAuthenticationService: TokenAuthenticationService,
    val jwtConfig: JwtConfig,
    val userRepository: UserRepository) : StatelessAuthenticationFilter() {

    @Value("\${username:admin@anadeainc.com}")
    private lateinit var username: String

    override fun doFilter(request: ServletRequest, response: ServletResponse, chain: FilterChain) {

        (response as HttpServletResponse).let {
            val url = (request as HttpServletRequest).requestURI
            if(url.contains(AUTH_REGEX)) {
                val token = tokenAuthenticationService.tokenHandler().createTokenForUser(user())
                it.setHeader("Set-Cookie", "${jwtConfig.cookie}=$token; Path=/; Domain=localhost")
                it.setHeader(jwtConfig.header, token)
                it.sendRedirect("/")
                return
            }
        }

        chain.doFilter(request, response)
    }

    private fun user() = userRepository.findByUsername(username)!!.also {
        it.expires = System.currentTimeMillis() + jwtConfig.expirationTime
    }

    companion object {
        private val AUTH_REGEX = Regex("auth/google")
    }
}
