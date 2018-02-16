package com.anahoret.lunchtime.repositories

import com.anahoret.lunchtime.domain.UserDayMenu
import org.springframework.data.repository.CrudRepository
import org.springframework.data.repository.query.Param
import org.springframework.security.access.prepost.PreAuthorize

interface UserDayMenuRepository : CrudRepository<UserDayMenu, Long> {

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    fun save(@Param("menu") restaurant: UserDayMenu) : UserDayMenu
}
