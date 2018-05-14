package com.anahoret.lunchtime.web.handlers

import com.anahoret.lunchtime.domain.User
import com.anahoret.lunchtime.repositories.UserRepository
import org.springframework.data.rest.core.annotation.HandleBeforeCreate
import org.springframework.data.rest.core.annotation.HandleBeforeSave
import org.springframework.data.rest.core.annotation.RepositoryEventHandler
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.stereotype.Component
import javax.validation.constraints.NotNull


@Component
@RepositoryEventHandler(User::class)
class UserEventHandler(@NotNull private val passwordEncoder: BCryptPasswordEncoder, @NotNull private val userRepository: UserRepository) {

    @HandleBeforeCreate
    fun handleUserCreate(user: User) {
        user.password = passwordEncoder.encode(user.password)
    }

    @HandleBeforeSave
    fun handleUserUpdate(user: User) {
        if (user.password == "") {
            //keeps the last password
            val storedUser = userRepository.findOne(user.id)
            user.password = storedUser.password
        } else {
            //password change request
            user.password = passwordEncoder.encode(user.password)
        }
    }
}
