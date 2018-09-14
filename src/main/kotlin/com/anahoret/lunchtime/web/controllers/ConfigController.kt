package com.anahoret.lunchtime.web.controllers

import com.anahoret.lunchtime.config.Constants.Companion.DATE_FORMAT_PATTERN
import org.joda.time.LocalDate
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.ResponseBody
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("api/config")
class ConfigController {
    @GetMapping
    @ResponseBody
    fun index() =
        HashMap<String, Any?>().also {
            it["currentDate"] = LocalDate().toString(DATE_FORMAT_PATTERN)
        }
}
