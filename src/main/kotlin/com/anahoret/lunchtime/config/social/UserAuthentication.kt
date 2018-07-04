package com.anahoret.lunchtime.config.social

import com.anahoret.lunchtime.domain.User
import org.springframework.security.core.Authentication
import org.springframework.security.core.GrantedAuthority

class UserAuthentication(private val user: User) : Authentication {
    private var authenticated = true

    override fun getName(): String {
        return user.username!!
    }

    override fun getAuthorities(): Collection<GrantedAuthority> {
        return user.authorities!!
    }

    override fun getCredentials(): Any? {
        return null
    }

    override fun getDetails(): User {
        return user
    }

    override fun getPrincipal(): Any {
        return user
    }

    override fun isAuthenticated(): Boolean {
        return authenticated
    }

    override fun setAuthenticated(authenticated: Boolean) {
        this.authenticated = authenticated
    }
}
