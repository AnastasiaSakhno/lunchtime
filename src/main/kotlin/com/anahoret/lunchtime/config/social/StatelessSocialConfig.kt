package com.anahoret.lunchtime.config.social

import com.anahoret.lunchtime.social.SimpleUsersConnectionRepository
import com.anahoret.lunchtime.services.social.SocialUserService
import com.anahoret.lunchtime.domain.auth.UserAuthenticationUserIdSource
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Scope
import org.springframework.context.annotation.ScopedProxyMode
import org.springframework.core.env.Environment
import org.springframework.social.config.annotation.ConnectionFactoryConfigurer
import org.springframework.social.config.annotation.EnableSocial
import org.springframework.social.config.annotation.SocialConfigurerAdapter
import org.springframework.social.connect.ConnectionFactoryLocator
import org.springframework.social.connect.ConnectionRepository
import org.springframework.social.connect.ConnectionSignUp
import org.springframework.social.google.api.Google
import org.springframework.social.google.connect.GoogleConnectionFactory

@Configuration
@EnableSocial
class StatelessSocialConfig(
    private val userService: SocialUserService,
    private val autoSignUpHandler: ConnectionSignUp) : SocialConfigurerAdapter() {

    override fun addConnectionFactories(connectionFactoryConfigurer: ConnectionFactoryConfigurer, environment: Environment) {
        val googleConnectionFactory = GoogleConnectionFactory(
            environment.getProperty("spring.social.google.appId"),
            environment.getProperty("spring.social.google.appSecret"))
        googleConnectionFactory.scope = "profile email"
        connectionFactoryConfigurer.addConnectionFactory(googleConnectionFactory)
    }

    override fun getUserIdSource() = UserAuthenticationUserIdSource()

    override fun getUsersConnectionRepository(connectionFactoryLocator: ConnectionFactoryLocator) =
        SimpleUsersConnectionRepository(userService, connectionFactoryLocator, autoSignUpHandler)

    @Bean
    @Scope(value = "request", proxyMode = ScopedProxyMode.INTERFACES)
    fun google(repository: ConnectionRepository): Google {
        val connection = repository.findPrimaryConnection(Google::class.java)
        return connection?.api!!
    }
}
