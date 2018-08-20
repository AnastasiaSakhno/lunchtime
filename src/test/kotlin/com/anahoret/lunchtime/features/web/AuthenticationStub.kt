package com.anahoret.lunchtime.features.web

import com.anahoret.lunchtime.config.JwtConfig
import com.anahoret.lunchtime.repositories.UserRepository
import com.anahoret.lunchtime.services.social.TokenAuthenticationService
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Profile
import org.springframework.stereotype.Component

@Component
@Profile("test")
class AuthenticationStub(
    val tokenAuthenticationService: TokenAuthenticationService,
    val jwtConfig: JwtConfig,
    val userRepository: UserRepository) {

    @Value("\${username:admin@anadeainc.com}")
    private lateinit var username: String


    fun authToken() = tokenAuthenticationService.tokenHandler().createTokenForUser(currentUser())

    fun currentUser() = userRepository.findByUsername(username)!!.also {
        it.expires = System.currentTimeMillis() + jwtConfig.expirationTime
    }
}
