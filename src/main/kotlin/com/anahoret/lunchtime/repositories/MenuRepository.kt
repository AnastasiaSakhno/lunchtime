package com.anahoret.lunchtime.repositories

import com.anahoret.lunchtime.domain.Menu
import org.springframework.data.repository.CrudRepository
import org.springframework.data.repository.query.Param
import org.springframework.security.access.prepost.PreAuthorize

interface MenuRepository : CrudRepository<Menu, Long> {

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    fun save(@Param("menu") menu: Menu) : Menu
}
