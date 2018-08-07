package com.anahoret.lunchtime.features.web.controllers

import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Profile
import org.springframework.social.google.api.Google
import org.springframework.social.google.api.plus.Person
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.ResponseBody
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("api/google")
@Profile("test")
class TestGoogleController() {

    @Value("\${username:admin@example.com}")
    private lateinit var username: String

    @Value("\${displayName:Admin User}")
    private lateinit var displayName: String

    @GetMapping("details")
    @ResponseBody
    fun getSocialDetails(): Map<String, String> = HashMap<String, String>().also {
        it["id"] = "117707368458654553505"
        it["accountEmail"] = username
        it["displayName"] = displayName
    }
}
