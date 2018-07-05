package com.anahoret.lunchtime.config.social

import com.anahoret.lunchtime.domain.User

enum class UserRole {
    REGULAR, ADMIN;

    fun asAuthorityFor(user: User) =
        UserAuthority().also {
            it.setAuthority("ROLE_" + toString())
            it.user = user
        }

    companion object {

        fun valueOf(authority: UserAuthority): UserRole {
            when (authority.authority) {
                "ROLE_REGULAR" -> return REGULAR
                "ROLE_ADMIN" -> return ADMIN
            }
            throw IllegalArgumentException("No role defined for authority: " + authority.authority)
        }
    }
}
