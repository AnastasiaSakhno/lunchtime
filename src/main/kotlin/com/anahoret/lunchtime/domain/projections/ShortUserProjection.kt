package com.anahoret.lunchtime.domain.projections

import com.anahoret.lunchtime.domain.User
import org.springframework.data.rest.core.config.Projection

@Projection(name = "short", types = [User::class])
interface ShortUserProjection {
    val id: Long
    val fullName: String
    val username: String
    val roles: List<String>
}
