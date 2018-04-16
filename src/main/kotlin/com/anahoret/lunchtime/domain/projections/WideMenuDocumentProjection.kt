package com.anahoret.lunchtime.domain.projections

import com.anahoret.lunchtime.domain.MenuDocument
import org.joda.time.LocalDate
import org.springframework.data.rest.core.config.Projection

@Projection(name = "wide", types = [MenuDocument::class])
interface WideMenuDocumentProjection {
    val id: Long
    val fileName: String
    val uploadedAt: LocalDate
    val restaurant: WideRestaurantProjection
    val user: ShortUserProjection
}
