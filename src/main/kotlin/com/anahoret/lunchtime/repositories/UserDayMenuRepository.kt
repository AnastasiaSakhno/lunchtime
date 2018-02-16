package com.anahoret.lunchtime.repositories

import com.anahoret.lunchtime.domain.UserDayMenu
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.CrudRepository
import org.springframework.data.repository.query.Param
import org.springframework.security.access.prepost.PreAuthorize

interface UserDayMenuRepository : CrudRepository<UserDayMenu, Long> {

    @Query("""SELECT udm.*, u.full_name, m.name FROM user_day_menu udm
        JOIN users u ON udm.user_id = u.id
        JOIN menu m ON udm.menu_id = m.id
            """, nativeQuery = true)
    override fun findAll() : List<UserDayMenu>

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    fun save(@Param("menu") restaurant: UserDayMenu) : UserDayMenu
}
