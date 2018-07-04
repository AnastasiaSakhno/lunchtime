package org.springframework.social.connect.mem

import org.springframework.social.connect.Connection
import org.springframework.social.connect.ConnectionFactoryLocator
import org.springframework.social.connect.ConnectionKey
import org.springframework.social.connect.ConnectionRepository
import org.springframework.util.MultiValueMap

/**
 * A short-lived (per request) ConnectionRepository for a single user
 */
class TemporaryConnectionRepository(connectionFactoryLocator: ConnectionFactoryLocator) : ConnectionRepository {
    // TODO delegate
    private val connectionRepository = InMemoryConnectionRepository(connectionFactoryLocator)

    override fun updateConnection(connection: Connection<*>) =
        connectionRepository.updateConnection(connection)

    override fun removeConnection(connectionKey: ConnectionKey) =
        connectionRepository.removeConnection(connectionKey)

    override fun findConnections(providerId: String): MutableList<Connection<*>> =
        connectionRepository.findConnections(providerId)

    override fun <A : Any?> findConnections(apiType: Class<A>): MutableList<Connection<A>> =
        connectionRepository.findConnections(apiType)

    override fun getConnection(connectionKey: ConnectionKey): Connection<*> =
        connectionRepository.getConnection(connectionKey)

    override fun <A : Any?> getConnection(apiType: Class<A>, providerUserId: String): Connection<A> =
        connectionRepository.getConnection(apiType, providerUserId)

    override fun findConnectionsToUsers(providerUserIds: MultiValueMap<String, String>): MultiValueMap<String, Connection<*>> =
        connectionRepository.findConnectionsToUsers(providerUserIds)

    override fun addConnection(connection: Connection<*>) =
        connectionRepository.addConnection(connection)

    override fun <A : Any?> getPrimaryConnection(apiType: Class<A>): Connection<A> =
        connectionRepository.getPrimaryConnection(apiType)

    override fun findAllConnections(): MultiValueMap<String, Connection<*>> =
        connectionRepository.findAllConnections()

    override fun <A : Any?> findPrimaryConnection(apiType: Class<A>): Connection<A> =
        connectionRepository.findPrimaryConnection(apiType)

    override fun removeConnections(providerId: String) =
        connectionRepository.removeConnections(providerId)
}
