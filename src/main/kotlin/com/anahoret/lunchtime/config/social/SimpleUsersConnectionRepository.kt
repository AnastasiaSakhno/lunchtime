package com.anahoret.lunchtime.config.social

import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.social.connect.Connection
import org.springframework.social.connect.ConnectionFactoryLocator
import org.springframework.social.connect.ConnectionSignUp
import org.springframework.social.connect.mem.InMemoryUsersConnectionRepository
import java.util.*

class SimpleUsersConnectionRepository(
    private val userService: SocialUserService,
    connectionFactoryLocator: ConnectionFactoryLocator,
    private val connectionSignUp: ConnectionSignUp) : InMemoryUsersConnectionRepository(connectionFactoryLocator) {

    override fun findUserIdsWithConnection(connection: Connection<*>): List<String> {
        return try {
            val user = userService.loadUserByConnectionKey(connection.key)
            user.accessToken = connection.createData().accessToken
            userService.updateUserDetails(user)
            Arrays.asList(user.userId)
        } catch (e: UsernameNotFoundException) {
            Arrays.asList(connectionSignUp.execute(connection))
        }
    }
}
