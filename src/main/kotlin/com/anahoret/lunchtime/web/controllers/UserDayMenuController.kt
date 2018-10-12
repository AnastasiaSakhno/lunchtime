package com.anahoret.lunchtime.web.controllers

import com.anahoret.lunchtime.config.Constants.Companion.DATE_FORMAT_PATTERN
import com.anahoret.lunchtime.repositories.UserDayMenuRepository
import com.anahoret.lunchtime.services.UserDayMenuService
import com.anahoret.lunchtime.web.handlers.SpringDataRestHandler
import org.joda.time.LocalDate
import org.springframework.format.annotation.DateTimeFormat
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import javax.servlet.http.HttpServletRequest

@RestController
@RequestMapping("api/user_day_menu")
class UserDayMenuController(
    val userDayMenuRepository: UserDayMenuRepository,
    val userDayMenuService: UserDayMenuService) {

    @GetMapping
    @ResponseBody
    fun index(@DateTimeFormat(pattern = DATE_FORMAT_PATTERN) @RequestParam("fromDate") fromDate: LocalDate,
              @DateTimeFormat(pattern = DATE_FORMAT_PATTERN) @RequestParam("toDate") toDate: LocalDate,
              request: HttpServletRequest) =
        userDayMenuRepository.findByDateBetween(fromDate, toDate).map { udm ->
            HashMap<String, Any>().also {
                it["id"] = udm.id
                it["date"] = udm.date.toString(DATE_FORMAT_PATTERN)
                it["out"] = udm.out
                val springDataRestHandler = SpringDataRestHandler(request)
                it["_links"] = springDataRestHandler.links("userDayMenus", udm.id)
                it["menu"] = HashMap<String, Any?>().also { m ->
                    m["id"] = udm.menu.id
                    m["name"] = udm.menu.name
                    m["colorHex"] = udm.menu.colorHex
                    m["_links"] = springDataRestHandler.links("menus", udm.menu.id)
                }
                it["user"] = HashMap<String, Any>().also { u ->
                    u["id"] = udm.user.id!!
                    u["_links"] = springDataRestHandler.links("users", udm.user.id!!)
                }
            }
        }

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
