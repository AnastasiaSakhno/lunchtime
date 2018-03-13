package com.anahoret.lunchtime.domain.projections

import com.anahoret.lunchtime.domain.UserDayMenu
import org.joda.time.LocalDate
import org.springframework.data.rest.core.config.Projection

@Projection(name = "wide", types = [UserDayMenu::class])
interface WideUserDayMenuProjection {

    val id: Long
    val date: LocalDate
    val out: Boolean
    val archive: Boolean
    val menu: WideMenuProjection
    val user: ShortUserProjection

}