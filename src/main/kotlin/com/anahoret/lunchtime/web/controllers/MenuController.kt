package com.anahoret.lunchtime.web.controllers

import com.anahoret.lunchtime.repositories.MenuRepository
import com.anahoret.lunchtime.web.handlers.SpringDataRestHandler
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.ResponseBody
import org.springframework.web.bind.annotation.RestController
import javax.servlet.http.HttpServletRequest

@RestController
@RequestMapping("api/menu")
class MenuController(val menuRepository: MenuRepository) {

    @GetMapping
    @ResponseBody
    fun index(request: HttpServletRequest) =
        menuRepository.findAll().map { menu ->
            HashMap<String, Any?>().also {
                it["id"] = menu.id
                it["name"] = menu.name
                it["weekDays"] = menu.weekDays
                it["archive"] = menu.archive
                it["colorHex"] = menu.colorHex
                val springDataRestHandler = SpringDataRestHandler(request)
                it["_links"] = springDataRestHandler.links("menus", menu.id)
                it["restaurant"] =
                    menu.restaurant?.let { restaurant ->
                        HashMap<String, Any?>().also { r ->
                            r["id"] = restaurant.id
                            r["name"] = restaurant.name
                            r["archive"] = restaurant.archive
                            r["_links"] = springDataRestHandler.links("restaurants", restaurant.id)
                        }
                    }
            }
        }
}
