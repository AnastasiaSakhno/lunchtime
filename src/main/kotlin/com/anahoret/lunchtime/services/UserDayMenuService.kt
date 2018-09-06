package com.anahoret.lunchtime.services

import com.anahoret.lunchtime.domain.UserDayMenu
import com.anahoret.lunchtime.repositories.MenuRepository
import com.anahoret.lunchtime.repositories.UserDayMenuRepository
import com.anahoret.lunchtime.repositories.UserRepository
import org.joda.time.LocalDate
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.time.DayOfWeek

@Service
class UserDayMenuService(
    val userDayMenuRepository: UserDayMenuRepository,
    val userRepository: UserRepository,
    val menuRepository: MenuRepository) {

    @Transactional(rollbackFor = [Throwable::class])
    fun fillWholeWeek(date: LocalDate, userId: Long, menuId: Long) {
        val user = userRepository.findOne(userId)
        val menu = menuRepository.findOne(menuId)
        var d = date.withDayOfWeek(DayOfWeek.MONDAY.value)
        while (d <= date.withDayOfWeek(DayOfWeek.FRIDAY.value)) {
            if (d != date && !d.isBefore(LocalDate.now())) {
                userDayMenuRepository.save(UserDayMenu(0, d, false, menu, user))
            }
            d = d.plusDays(1)
        }
    }
}
