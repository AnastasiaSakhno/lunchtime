package com.anahoret.lunchtime.config.social

import com.anahoret.lunchtime.domain.User
import org.springframework.security.core.Authentication

class UserAuthentication(private val user: User) : Authentication {
    private var authenticated = true

    override fun getName() = user.username!!

    override fun getAuthorities() = user.authorities!!

    override fun getCredentials() = null

    override fun getDetails() = user

    override fun getPrincipal() = user

    override fun isAuthenticated() = authenticated

    override fun setAuthenticated(authenticated: Boolean) {
        this.authenticated = authenticated
    }
}
