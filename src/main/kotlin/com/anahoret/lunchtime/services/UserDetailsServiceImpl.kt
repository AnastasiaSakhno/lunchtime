package com.anahoret.lunchtime.services

import com.anahoret.lunchtime.repositories.UserRepository
import org.springframework.security.core.userdetails.User
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service


@Service
class UserDetailsServiceImpl(private val userRepository: UserRepository) : UserDetailsService {

    @Throws(UsernameNotFoundException::class)
    override fun loadUserByUsername(email: String): UserDetails {
        val applicationUser = userRepository.findByEmail(email)
                ?: throw UsernameNotFoundException(email)
        return User(applicationUser.email, applicationUser.password, emptyList())
    }
}
