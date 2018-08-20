package com.anahoret.lunchtime.web.handlers.social

import com.anahoret.lunchtime.domain.User
import com.anahoret.lunchtime.domain.UserRole
import com.anahoret.lunchtime.repositories.UserRepository
import org.springframework.social.connect.Connection
import org.springframework.social.connect.ConnectionSignUp
import org.springframework.stereotype.Component
import org.springframework.transaction.annotation.Transactional

@Component
class AutoSignUpHandler(
    private val userRepository: UserRepository) : ConnectionSignUp {

    @Volatile
    private var userCount: Long = userRepository.count()

    @Transactional
    override fun execute(connection: Connection<*>) =
        User().also {
            val profile = connection.fetchUserProfile()
            it.setUsername(profile.email)
            it.fullName = profile.name
            it.providerId = connection.key.providerId
            it.providerUserId = connection.key.providerUserId
            grantRoles(it)
            userRepository.save(it)
        }.userId

    private fun grantRoles(user: User) {
        user.grantRole(UserRole.REGULAR)

        //grant admin rights to the first user
        if (userCount == 0L) {
            user.grantRole(UserRole.ADMIN)
        }
    }
}
