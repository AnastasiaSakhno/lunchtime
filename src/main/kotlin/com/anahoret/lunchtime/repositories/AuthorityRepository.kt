package com.anahoret.lunchtime.repositories

import com.anahoret.lunchtime.domain.auth.Authority
import org.springframework.data.repository.CrudRepository
import org.springframework.security.access.prepost.PreAuthorize

@PreAuthorize("hasRole('ROLE_ADMIN')")
interface AuthorityRepository : CrudRepository<Authority, Long> {

    fun findByName(name: String): Authority?
}
