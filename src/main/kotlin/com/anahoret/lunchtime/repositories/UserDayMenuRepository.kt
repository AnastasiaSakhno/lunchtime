package com.anahoret.lunchtime.repositories

import com.anahoret.lunchtime.domain.UserDayMenu
import org.joda.time.LocalDate
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.CrudRepository
import org.springframework.data.repository.query.Param
import org.springframework.data.rest.core.annotation.RestResource
import org.springframework.format.annotation.DateTimeFormat
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.stereotype.Repository
import org.springframework.transaction.annotation.Transactional

@Repository("userDayMenus")
interface UserDayMenuRepository : CrudRepository<UserDayMenu, Long> {

    @Query("select udm from UserDayMenu udm where udm.date between :from and :to")
    @RestResource(path = "date", rel = "date")
    fun findByDateBetween(@DateTimeFormat(pattern = "yyyy-MM-dd") @Param("from") fromDate: LocalDate,
                          @DateTimeFormat(pattern = "yyyy-MM-dd") @Param("to") toDate: LocalDate) : List<UserDayMenu>

    @Transactional
    @Modifying
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @Query("delete from UserDayMenu udm where udm.date < :till")
    @RestResource(exported = false)
    fun deleteByDate(@Param("till") tillDate: LocalDate)

    @PreAuthorize("hasRole('ROLE_ADMIN') or #udm.user.email == authentication.name")
    fun save(@Param("udm") udm: UserDayMenu) : UserDayMenu
}
