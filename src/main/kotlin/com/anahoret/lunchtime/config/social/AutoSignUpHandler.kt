package com.anahoret.lunchtime.config.social

import com.anahoret.lunchtime.domain.User
import com.anahoret.lunchtime.repositories.UserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.social.connect.Connection
import org.springframework.social.connect.ConnectionSignUp
import org.springframework.stereotype.Component
import org.springframework.transaction.annotation.Transactional

@Component
class AutoSignUpHandler(
    private val userRepository: UserRepository) : ConnectionSignUp {

    @Volatile
    private var userCount: Long = 0

    @Transactional
    override fun execute(connection: Connection<*>): String {
        //add new users to the db with its default roles for later use in SocialAuthenticationSuccessHandler
        val user = User()
        user.setUsername(generateUniqueUserName(connection.fetchUserProfile().firstName))
        user.providerId = connection.key.providerId
        user.providerUserId = connection.key.providerUserId
        user.accessToken = connection.createData().accessToken
        grantRoles(user)
        userRepository.save(user)
        return user.getUserId()
    }

    private fun grantRoles(user: User) {
        user.grantRole(UserRole.REGULAR)

        //grant admin rights to the first user
        if (userCount == 0L) {
            userCount = userRepository.count()
            if (userCount == 0L) {
                user.grantRole(UserRole.ADMIN)
            }
        }
    }

    private fun generateUniqueUserName(firstName: String): String {
        val username = getUsernameFromFirstName(firstName)
        var option = username
        var i = 0
        while (userRepository.findByUsername(option) != null) {
            option = username + i
            i++
        }
        return option
    }

    private fun getUsernameFromFirstName(userId: String): String {
        val max = 25
        var index = userId.indexOf(' ')
        index = if (index == -1 || index > max) userId.length else index
        index = if (index > max) max else index
        return userId.substring(0, index)
    }
}
