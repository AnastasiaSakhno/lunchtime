package com.anahoret.lunchtime.config.social

import org.springframework.security.core.AuthenticationException
import org.springframework.social.connect.*
import org.springframework.social.connect.mem.TemporaryConnectionRepository
import java.util.*

class SimpleUsersConnectionRepository(
    private val userService: SocialUserService,
    private val connectionFactoryLocator: ConnectionFactoryLocator,
    private val connectionSignUp: ConnectionSignUp) : UsersConnectionRepository {

    override fun findUserIdsWithConnection(connection: Connection<*>): List<String> {
        return try {
            val user = userService.loadUserByConnectionKey(connection.key)
            user.accessToken = connection.createData().accessToken
            userService.updateUserDetails(user)
            Arrays.asList(user.userId)
        } catch (ae: AuthenticationException) {
            Arrays.asList(connectionSignUp.execute(connection))
        }

    }

    override fun findUserIdsConnectedTo(providerId: String, providerUserIds: Set<String>): Set<String> {
        val keys = HashSet<String>()
        for (userId in providerUserIds) {
            val ck = ConnectionKey(providerId, userId)
            try {
                keys.add(userService.loadUserByConnectionKey(ck).userId)
            } catch (ae: AuthenticationException) {
                //ignore
            }

        }
        return keys
    }

    override fun createConnectionRepository(userId: String): ConnectionRepository {
        val connectionRepository = TemporaryConnectionRepository(connectionFactoryLocator)
        val user = userService.loadUserByUserId(userId)
        val connectionData = ConnectionData(
            user.providerId,
            user.providerUserId, null, null, null,
            user.accessToken, null, null, null)

        val connection = connectionFactoryLocator
            .getConnectionFactory(user.providerId).createConnection(connectionData)
        connectionRepository.addConnection(connection)
        return connectionRepository
    }
}
