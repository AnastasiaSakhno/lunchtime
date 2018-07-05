package com.anahoret.lunchtime.config.social

import com.anahoret.lunchtime.domain.User
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.social.UserIdSource

class UserAuthenticationUserIdSource : UserIdSource {

    override fun getUserId() =
        SecurityContextHolder.getContext().authentication
            .takeIf { it is UserAuthentication }
            ?.let { (it.principal as User).userId }
            ?: throw IllegalStateException("Unable to get a ConnectionRepository: no user signed in")
}
