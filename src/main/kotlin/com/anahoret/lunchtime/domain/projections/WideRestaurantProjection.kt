package com.anahoret.lunchtime.domain.projections

import com.anahoret.lunchtime.domain.Restaurant
import org.springframework.data.rest.core.config.Projection

@Projection(name = "wide", types = [Restaurant::class])
interface WideRestaurantProjection {
    val id: Long
    val name: String
    val archive: Boolean
}
