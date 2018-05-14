package com.anahoret.lunchtime.repositories

import com.anahoret.lunchtime.domain.Restaurant
import org.springframework.data.repository.CrudRepository
import org.springframework.security.access.prepost.PreAuthorize

interface RestaurantRepository : CrudRepository<Restaurant, Long> {

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    fun save(restaurant: Restaurant) : Restaurant
}
