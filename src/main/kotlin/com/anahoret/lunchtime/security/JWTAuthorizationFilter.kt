package com.anahoret.lunchtime.security

import com.anahoret.lunchtime.security.Constants.Companion.HEADER_STRING
import com.anahoret.lunchtime.security.Constants.Companion.SECRET
import com.anahoret.lunchtime.security.Constants.Companion.TOKEN_PREFIX
import io.jsonwebtoken.Jwts
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter
import javax.servlet.FilterChain
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse


class JWTAuthorizationFilter(authManager: AuthenticationManager, private val userDetailsService: UserDetailsService) : BasicAuthenticationFilter(authManager) {

    override fun doFilterInternal(req: HttpServletRequest,
                                   res: HttpServletResponse,
                                   chain: FilterChain) {
        val header = req.getHeader(HEADER_STRING)

        if (header == null || !header.startsWith(TOKEN_PREFIX)) {
            chain.doFilter(req, res)
            return
        }

        val authentication = getAuthentication(req)

        SecurityContextHolder.getContext().authentication = authentication
        chain.doFilter(req, res)
    }

    private fun getAuthentication(request: HttpServletRequest): UsernamePasswordAuthenticationToken? {
        val token = request.getHeader(HEADER_STRING)
        if (token != null) {
            val email = Jwts.parser()
                    .setSigningKey(SECRET.toByteArray(Charsets.UTF_8))
                    .parseClaimsJws(token.replace(TOKEN_PREFIX, ""))
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
