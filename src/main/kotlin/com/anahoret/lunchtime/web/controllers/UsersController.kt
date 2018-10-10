package com.anahoret.lunchtime.web.controllers

import com.anahoret.lunchtime.repositories.UserRepository
import com.anahoret.lunchtime.web.handlers.SpringDataRestHandler
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.ResponseBody
import org.springframework.web.bind.annotation.RestController
import javax.servlet.http.HttpServletRequest

@RestController
@RequestMapping("api/users")
class UsersController(val userRepository: UserRepository) {

    @GetMapping
    @ResponseBody
    fun index(request: HttpServletRequest) =
        userRepository.findAll().map { u ->
            HashMap<String, Any?>().also {
                it["id"] = u.id
                it["fullName"] = u.fullName
                it["username"] = u.username
                it["roles"] = u.roles
                it["_links"] = SpringDataRestHandler(request).links("users", u.id!!)
            }
        }
}
