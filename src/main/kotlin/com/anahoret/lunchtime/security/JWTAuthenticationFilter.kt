package com.anahoret.lunchtime.security

import com.anahoret.lunchtime.domain.User
import com.fasterxml.jackson.databind.ObjectMapper
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.Authentication
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter
import java.io.IOException
import java.util.*
import javax.servlet.FilterChain
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse


class JWTAuthenticationFilter(authenticationManager: AuthenticationManager, private val jwtConfig: JwtConfig) : UsernamePasswordAuthenticationFilter() {

    init {
        this.authenticationManager = authenticationManager
    }

    override fun attemptAuthentication(req: HttpServletRequest,
                              res: HttpServletResponse): Authentication {
        try {
            val user = ObjectMapper()
                    .readValue(req.inputStream, User::class.java)

            return authenticationManager.authenticate(
                    UsernamePasswordAuthenticationToken(
                            user.email,
                            user.password,
                            listOf(SimpleGrantedAuthority(user.role?.name)))
            )
        } catch (e: IOException) {
            throw RuntimeException(e)
        }

    }

    override fun successfulAuthentication(req: HttpServletRequest,
                                           res: HttpServletResponse,
                                           chain: FilterChain,
                                           auth: Authentication) {

        val token = Jwts.builder()
                .setSubject((auth.principal as org.springframework.security.core.userdetails.User).username)
                .setExpiration(Date(System.currentTimeMillis() + jwtConfig.expirationTime))
                .signWith(SignatureAlgorithm.HS512, jwtConfig.secret.toByteArray(Charsets.UTF_8))
                .compact()
        res.addHeader(jwtConfig.header, jwtConfig.tokenPrefix + token)
    }
}
