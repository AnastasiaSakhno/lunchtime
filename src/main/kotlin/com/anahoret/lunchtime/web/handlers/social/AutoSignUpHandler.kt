package com.anahoret.lunchtime.web.handlers.social

import com.anahoret.lunchtime.domain.User
import com.anahoret.lunchtime.repositories.AuthorityRepository
import com.anahoret.lunchtime.repositories.UserRepository
import org.springframework.social.connect.Connection
import org.springframework.social.connect.ConnectionSignUp
import org.springframework.stereotype.Component
import org.springframework.transaction.annotation.Transactional

@Component
class AutoSignUpHandler(
    val userRepository: UserRepository,
    val authorityRepository: AuthorityRepository) : ConnectionSignUp {

    @Volatile
    private var userCount: Long = userRepository.count()

    @Transactional
    override fun execute(connection: Connection<*>) =
        connection.fetchUserProfile()
            .takeIf { it.email.matches(DOMAIN_REGEX) }
            ?.let { profile ->
                User().also {
                    it.setUsername(profile.email)
                    it.fullName = profile.name
                    it.providerId = connection.key.providerId
                    it.providerUserId = connection.key.providerUserId
                    grantRoles(it)
                    userRepository.save(it)
                }.userId
            } ?: throw IllegalStateException("Wrong domain. Only \"$DOMAIN_STRING\" is allowed")

    private fun grantRoles(user: User) {
        user.grantAuthority(authorityByName("ROLE_REGULAR"))

        //grant admin rights to the first user
        if (userCount == 0L) {
            user.grantAuthority(authorityByName("ROLE_ADMIN"))
        }
    }

    private fun authorityByName(name: String) = authorityRepository.findByName(name)!!

    companion object {
        private const val DOMAIN_STRING = "anadeainc.com"
        private const val DOMAIN_PATTERN = "^.*@$DOMAIN_STRING$"
        private val DOMAIN_REGEX = Regex(DOMAIN_PATTERN)
    }
}
