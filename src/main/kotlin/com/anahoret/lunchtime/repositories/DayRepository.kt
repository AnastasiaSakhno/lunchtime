package com.anahoret.lunchtime.repositories

import com.anahoret.lunchtime.config.Constants.Companion.DATE_FORMAT_PATTERN
import com.anahoret.lunchtime.domain.Day
import org.joda.time.LocalDate
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.CrudRepository
import org.springframework.data.repository.query.Param
import org.springframework.data.rest.core.annotation.RestResource
import org.springframework.format.annotation.DateTimeFormat
import org.springframework.security.access.prepost.PreAuthorize

interface DayRepository : CrudRepository<Day, Long> {

    @Query("select d from Day d where d.date between :from and :to")
    @RestResource(path = "date", rel = "date")
    fun findByDateBetween(@DateTimeFormat(pattern = DATE_FORMAT_PATTERN) @Param("from") fromDate: LocalDate,
                          @DateTimeFormat(pattern = DATE_FORMAT_PATTERN) @Param("to") toDate: LocalDate) : List<Day>

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    fun save(day: Day) : Day
}
