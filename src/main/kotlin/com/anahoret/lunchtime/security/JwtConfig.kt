package com.anahoret.lunchtime.security

import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Configuration

@Configuration
class JwtConfig(
    @Value("\${jwt.secret}")
    val secret: String,
    @Value("\${jwt.token_prefix}")
    val tokenPrefix: String,
    @Value("\${jwt.header}")
    val header: String,
    @Value("\${jwt.expiration_time}")
    val expirationTime: Long
)
