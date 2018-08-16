package com.anahoret.lunchtime.services.social

import com.anahoret.lunchtime.domain.User
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.social.connect.ConnectionKey
import org.springframework.social.security.SocialUserDetailsService

interface SocialUserService : SocialUserDetailsService, UserDetailsService {

    fun loadUserByConnectionKey(connectionKey: ConnectionKey): User

    override fun loadUserByUserId(userId: String): User

    override fun loadUserByUsername(username: String): User

    fun updateUserDetails(user: User)
}
