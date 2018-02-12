package com.anahoret.lunchtime.repositories

import com.anahoret.lunchtime.domain.Restaurant
import org.springframework.data.repository.CrudRepository
import org.springframework.data.repository.query.Param
import org.springframework.security.access.prepost.PreAuthorize

interface RestaurantRepository : CrudRepository<Restaurant, Long> {

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    fun save(@Param("restaurant") restaurant: Restaurant) : Restaurant
}
