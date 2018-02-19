package com.anahoret.lunchtime.security

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
        val header = req.getHeader(jwtConfig.header)

        if (header == null || !header.startsWith(jwtConfig.tokenPrefix)) {
            chain.doFilter(req, res)
            return
        }

        val authentication = getAuthentication(req)

        SecurityContextHolder.getContext().authentication = authentication
        chain.doFilter(req, res)
    }

    private fun getAuthentication(request: HttpServletRequest): UsernamePasswordAuthenticationToken? {
        val token = request.getHeader(jwtConfig.header)
        if (token != null) {
            val email = Jwts.parser()
                    .setSigningKey(jwtConfig.secret.toByteArray(Charsets.UTF_8))
                    .parseClaimsJws(token.replace(jwtConfig.tokenPrefix, ""))
                    .getBody()
                    .getSubject()

            return if (email != null) {
                val user = userDetailsService.loadUserByUsername(email)
                UsernamePasswordAuthenticationToken(email, null, user.authorities)
            } else null
        }
        return null
    }
}
