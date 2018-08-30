package com.anahoret.lunchtime.domain.projections

import com.anahoret.lunchtime.domain.auth.Authority
import org.springframework.data.rest.core.config.Projection

@Projection(name = "short", types = [Authority::class])
interface ShortAuthorityProjection {
    val id: Long
    val name: String
}
