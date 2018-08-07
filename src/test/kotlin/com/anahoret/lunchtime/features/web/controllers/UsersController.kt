package com.anahoret.lunchtime.features.web.controllers

import com.fasterxml.jackson.databind.JsonNode
import com.fasterxml.jackson.databind.ObjectMapper
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Profile
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.ResponseBody
import org.springframework.web.bind.annotation.RestController
import javax.servlet.http.HttpServletRequest

@RestController
@RequestMapping("api/users")
@Profile("test")
class UsersController {
    @Value("\${username:regular@anadeainc.com}")
    private lateinit var username: String

    @Value("\${displayName:Admin User}")
    private lateinit var displayName: String

    @Value("\${role:REGULAR}")
    private lateinit var role: String

    @Value("\${otherUsers:}")
    private lateinit var otherUsers: String

    @GetMapping
    @ResponseBody
    fun index(request: HttpServletRequest): JsonNode {
        val users = StringBuilder()
        users.append(userString(username, displayName, role, 1))
        if(otherUsers.isNotBlank()) {
            otherUsers.split(";").forEachIndexed { i, user ->
                val data = user.split(",")
                users.append(userString(data[0], data[1], data[2], i + 2))
            }
        }
        return ObjectMapper().readTree(STRING_TEMPLATE
            .replace(USERS_STUB, users.toString())
            .replace(SERVER_PORT_STUB, request.serverPort.toString()))
    }

    private fun userString(username: String, displayName: String, role: String, id: Int) = USER_STRING_TEMPLATE
        .replace(FULL_NAME_STUB, displayName)
        .replace(USERNAME_STUB, username)
        .replace(ROLES_STUB, role)
        .replace(ID_STUB, id.toString())

    companion object {
        const val SERVER_PORT_STUB = "SERVER_PORT_STUB"
        const val FULL_NAME_STUB = "FULL_NAME_STUB"
        const val USERNAME_STUB = "USERNAME_STUB"
        const val ID_STUB = "ID_STUB"
        const val ROLES_STUB = "ROLES_STUB"
        const val USERS_STUB = "USERS_STUB"
        const val USER_STRING_TEMPLATE = """{
        "id": $ID_STUB,
        "fullName": "$FULL_NAME_STUB",
        "username": "$USERNAME_STUB",
        "expires": 0,
        "roles": [
          "$ROLES_STUB"
        ],
        "_links": {
          "self": {
            "href": "http://localhost:$SERVER_PORT_STUB/api/users/$ID_STUB"
          },
          "user": {
            "href": "http://localhost:$SERVER_PORT_STUB/api/users/$ID_STUB{?projection}",
            "templated": true
          }
        }
      }"""
        const val STRING_TEMPLATE = """{
  "_embedded": {
    "users": [
      $USERS_STUB
    ]
  },
  "_links": {
    "self": {
      "href": "http://localhost:$SERVER_PORT_STUB/api/users"
    },
    "profile": {
      "href": "http://localhost:$SERVER_PORT_STUB/api/profile/users"
    },
    "search": {
      "href": "http://localhost:$SERVER_PORT_STUB/api/users/search"
    }
  }
}"""
    }
}
