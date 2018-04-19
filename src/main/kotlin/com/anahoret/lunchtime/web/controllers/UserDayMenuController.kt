package com.anahoret.lunchtime.web.controllers

import com.anahoret.lunchtime.repositories.UserDayMenuRepository
import org.joda.time.LocalDate
import org.springframework.format.annotation.DateTimeFormat
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("api/user_day_menu")
class UserDayMenuController(val userDayMenuRepository: UserDayMenuRepository) {
    @DeleteMapping
    fun delete(@DateTimeFormat(pattern = "yyyy-MM-dd") @RequestParam("tillDate") tillDate: LocalDate) {
        userDayMenuRepository.deleteByDate(tillDate)
        ResponseEntity.ok()
    }
}
