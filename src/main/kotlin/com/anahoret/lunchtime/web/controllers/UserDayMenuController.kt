package com.anahoret.lunchtime.web.controllers

import com.anahoret.lunchtime.config.Constants.Companion.DATE_FORMAT_PATTERN
import com.anahoret.lunchtime.repositories.UserDayMenuRepository
import com.anahoret.lunchtime.services.UserDayMenuService
import org.joda.time.LocalDate
import org.springframework.format.annotation.DateTimeFormat
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("api/user_day_menu")
class UserDayMenuController(
    val userDayMenuRepository: UserDayMenuRepository,
    val userDayMenuService: UserDayMenuService) {

    @DeleteMapping
    fun deleteTillDate(@DateTimeFormat(pattern = DATE_FORMAT_PATTERN) @RequestParam("tillDate") tillDate: LocalDate) {
        userDayMenuRepository.deleteByDate(tillDate)
        ResponseEntity.ok()
    }

    @PostMapping("duplicate_whole_week")
    fun fillWholeWeek(@DateTimeFormat(pattern = DATE_FORMAT_PATTERN) @RequestParam("date") date: LocalDate,
                      @RequestParam("userId") userId: Long,
                      @RequestParam("menuId") menuId: Long) {
        userDayMenuService.fillWholeWeek(date, userId, menuId)
        ResponseEntity.ok()
    }
}
