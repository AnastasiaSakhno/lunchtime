package com.anahoret.lunchtime.repositories

import com.anahoret.lunchtime.domain.User
import org.springframework.data.repository.CrudRepository
import org.springframework.data.repository.query.Param
import org.springframework.data.rest.core.annotation.RestResource
import org.springframework.security.access.prepost.PreAuthorize

interface UserRepository : CrudRepository<User, Long> {

    @RestResource(path = "emails")
    fun findByEmail(@Param("email") email: String): User?

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    fun save(@Param("user") user: User) : User
}
