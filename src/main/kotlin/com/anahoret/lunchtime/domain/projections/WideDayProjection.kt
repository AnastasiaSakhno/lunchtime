package com.anahoret.lunchtime.domain.projections

import com.anahoret.lunchtime.domain.Day
import org.joda.time.LocalDate
import org.springframework.data.rest.core.config.Projection

@Projection(name = "wide", types = [Day::class])
interface WideDayProjection {
    val id: Long
    val date: LocalDate
    val closed: Boolean
}
