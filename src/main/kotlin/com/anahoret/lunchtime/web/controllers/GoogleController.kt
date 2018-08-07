package com.anahoret.lunchtime.web.controllers

import org.springframework.context.annotation.Profile
import org.springframework.social.google.api.Google
import org.springframework.social.google.api.plus.Person
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("api/google")
@Profile("default")
class GoogleController(val google: Google) {

    @GetMapping("details")
    fun getSocialDetails(): Person = google.plusOperations().getPerson("me")
}
