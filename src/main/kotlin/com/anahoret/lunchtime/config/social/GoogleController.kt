package com.anahoret.lunchtime.config.social

import org.springframework.social.google.api.Google
import org.springframework.social.google.api.plus.Person
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RestController

@RestController
class GoogleController(private val google: Google) {

    val socialDetails: Person
        @RequestMapping(value = "/api/google/details", method = [(RequestMethod.GET)])
        get() = google.plusOperations().googleProfile

}
