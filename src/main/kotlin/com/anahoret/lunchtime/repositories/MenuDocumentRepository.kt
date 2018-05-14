package com.anahoret.lunchtime.repositories

import com.anahoret.lunchtime.domain.MenuDocument
import org.springframework.data.repository.CrudRepository
import org.springframework.data.repository.query.Param
import org.springframework.data.rest.core.annotation.RestResource
import org.springframework.security.access.prepost.PreAuthorize

interface MenuDocumentRepository : CrudRepository<MenuDocument, Long> {

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    fun save(menuDocument: MenuDocument) : MenuDocument

    @RestResource(path = "restaurants")
    fun findByRestaurantId(@Param("id") restaurantId: Long): MenuDocument?
}

