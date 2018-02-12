package com.anahoret.lunchtime.repositories

import com.anahoret.lunchtime.domain.DayMenu
import org.springframework.data.repository.CrudRepository
import org.springframework.data.repository.query.Param
import org.springframework.security.access.prepost.PreAuthorize

interface DayMenuRepository : CrudRepository<DayMenu, Long> {

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    fun save(@Param("menu") restaurant: DayMenu) : DayMenu
}
