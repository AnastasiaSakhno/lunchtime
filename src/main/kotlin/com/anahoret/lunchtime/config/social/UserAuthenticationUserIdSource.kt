package com.anahoret.lunchtime.config.social

import com.anahoret.lunchtime.domain.User
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.social.UserIdSource

class UserAuthenticationUserIdSource : UserIdSource {

    override fun getUserId(): String {
        val authentication = SecurityContextHolder.getContext().authentication
        var user: User? = null
        if (authentication is UserAuthentication) {
            user = authentication.getPrincipal() as User
        }

        if (user == null) {
            throw IllegalStateException("Unable to get a ConnectionRepository: no user signed in")
        }
        return user.userId
    }
}
