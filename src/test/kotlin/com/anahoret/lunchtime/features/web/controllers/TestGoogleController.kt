package com.anahoret.lunchtime.features.web.controllers

import com.anahoret.lunchtime.repositories.UserRepository
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Profile
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.ResponseBody
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("api/google")
@Profile("test")
class TestGoogleController(val userRepository: UserRepository) {

    @Value("\${username:admin@anadeainc.com}")
    private lateinit var username: String

    @GetMapping("details")
    @ResponseBody
    fun getSocialDetails(): Map<String, String> = HashMap<String, String>().also {
        val user = userRepository.findByUsername(username)!!
        it["accountEmail"] = username
        it["displayName"] = user.fullName!!
    }
}
