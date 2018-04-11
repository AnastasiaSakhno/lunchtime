package com.anahoret.lunchtime.repositories

import com.anahoret.lunchtime.domain.MenuDocument
import org.springframework.data.repository.CrudRepository
import org.springframework.data.repository.query.Param
import org.springframework.security.access.prepost.PreAuthorize

interface MenuDocumentRepository : CrudRepository<MenuDocument, Long> {

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    fun save(@Param("menuDocument") menuDocument: MenuDocument) : MenuDocument
}

