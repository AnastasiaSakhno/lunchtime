package com.anahoret.lunchtime.domain.projections

import com.anahoret.lunchtime.domain.Menu
import org.springframework.data.rest.core.config.Projection

@Projection(name = "wide", types = [Menu::class])
interface WideMenuProjection {

    val id: Long
    val name: String
    val archive: Boolean
    val week_days: String
    val restaurant: WideRestaurantProjection
}
