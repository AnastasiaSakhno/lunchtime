package com.anahoret.lunchtime.security

import com.anahoret.lunchtime.domain.User
import com.anahoret.lunchtime.security.Constants.Companion.EXPIRATION_TIME
import com.anahoret.lunchtime.security.Constants.Companion.HEADER_STRING
import com.anahoret.lunchtime.security.Constants.Companion.SECRET
import com.anahoret.lunchtime.security.Constants.Companion.TOKEN_PREFIX
import com.fasterxml.jackson.databind.ObjectMapper
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.Authentication
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter
import java.io.IOException
import java.util.*
import javax.servlet.FilterChain
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse


class JWTAuthenticationFilter(authenticationManager: AuthenticationManager) : UsernamePasswordAuthenticationFilter() {

    init {
        this.authenticationManager = authenticationManager
    }

    override fun attemptAuthentication(req: HttpServletRequest,
                              res: HttpServletResponse): Authentication {
        try {
            val creds = ObjectMapper()
                    .readValue(req.inputStream, User::class.java)

            return authenticationManager.authenticate(
                    UsernamePasswordAuthenticationToken(
                            creds.email,
                            creds.password,
                            ArrayList<GrantedAuthority>())
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
                .setExpiration(Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS512, SECRET.toByteArray(Charsets.UTF_8))
                .compact()
        res.addHeader(HEADER_STRING, TOKEN_PREFIX + token)
    }
}
