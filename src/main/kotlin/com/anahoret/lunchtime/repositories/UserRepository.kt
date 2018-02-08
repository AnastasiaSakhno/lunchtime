package com.anahoret.lunchtime.repositories

import com.anahoret.lunchtime.domain.User
import org.springframework.data.repository.CrudRepository
import org.springframework.data.repository.query.Param
import org.springframework.security.access.prepost.PreAuthorize

interface UserRepository : CrudRepository<User, Long> {
    fun findByEmail(email: String): User?

    // TODO PreAuthorize conditions do not work for now
    @PreAuthorize("#user?.role != Role.ADMIN and #authentication?.role = Role.ADMIN")
    fun save(@Param("user") user: User): User
}
