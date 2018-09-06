package com.anahoret.lunchtime.services

import com.anahoret.lunchtime.services.social.SocialUserService
import com.anahoret.lunchtime.domain.User
import com.anahoret.lunchtime.repositories.UserRepository
import org.springframework.context.annotation.Bean
import org.springframework.security.authentication.AccountStatusUserDetailsChecker
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.social.connect.ConnectionKey
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
@Transactional
class UserService(private val userRepository: UserRepository) : SocialUserService {

    @Bean
    fun detailsChecker() = AccountStatusUserDetailsChecker()

    override fun loadUserByUserId(userId: String): User {
        val user = userRepository.findOne(java.lang.Long.valueOf(userId))
        return checkUser(user)
    }

    override fun loadUserByUsername(username: String): User {
        val user = userRepository.findByUsername(username)
        return checkUser(user)
    }

    override fun loadUserByConnectionKey(connectionKey: ConnectionKey): User {
        val user = userRepository.findByProviderIdAndProviderUserId(connectionKey.providerId, connectionKey.providerUserId)
        return checkUser(user)
    }

    override fun updateUserDetails(user: User) {
        // TODO wtf! what is wrong with user?
        val found = loadUserByUserId(user.userId)
        userRepository.save(found)
    }

    private fun checkUser(user: User?): User =
        user?.apply { detailsChecker().check(user) } ?: throw UsernameNotFoundException("user not found")
}
