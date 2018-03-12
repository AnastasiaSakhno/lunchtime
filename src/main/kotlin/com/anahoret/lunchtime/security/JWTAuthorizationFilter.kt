package com.anahoret.lunchtime.security

import com.anahoret.lunchtime.config.JwtConfig
import io.jsonwebtoken.Jwts
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter
import javax.servlet.FilterChain
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse


class JWTAuthorizationFilter(authenticationManager: AuthenticationManager, private val userDetailsService: UserDetailsService, private val jwtConfig: JwtConfig) : BasicAuthenticationFilter(authenticationManager) {

    override fun doFilterInternal(req: HttpServletRequest,
                                  res: HttpServletResponse,
                                  chain: FilterChain) {
        req.getHeader(jwtConfig.header)
                ?.takeIf { it.startsWith(jwtConfig.tokenPrefix) }
                ?.let { SecurityContextHolder.getContext().authentication = getAuthentication(it) }

        chain.doFilter(req, res)
    }

    private fun getAuthentication(tokenHeader: String): UsernamePasswordAuthenticationToken? {
        val email = Jwts.parser()
                .setSigningKey(jwtConfig.secret.toByteArray(Charsets.UTF_8))
                .parseClaimsJws(tokenHeader.replace(jwtConfig.tokenPrefix, ""))
                .body
                .subject

        return email?.let {
            val user = userDetailsService.loadUserByUsername(it)
            UsernamePasswordAuthenticationToken(it, null, user.authorities)
        }
    }
}
