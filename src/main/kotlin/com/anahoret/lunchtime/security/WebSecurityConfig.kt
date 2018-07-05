package com.anahoret.lunchtime.security

import com.anahoret.lunchtime.web.handlers.social.SocialAuthenticationSuccessHandler
import com.anahoret.lunchtime.services.social.SocialUserService
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.core.annotation.Order
import org.springframework.http.HttpMethod
import org.springframework.security.config.annotation.ObjectPostProcessor
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.web.authentication.preauth.AbstractPreAuthenticatedProcessingFilter
import org.springframework.social.UserIdSource
import org.springframework.social.security.SocialAuthenticationFilter
import org.springframework.social.security.SpringSocialConfigurer
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.CorsConfigurationSource
import org.springframework.web.cors.UrlBasedCorsConfigurationSource

@EnableWebSecurity
@Configuration
@Order(1)
class WebSecurityConfig(
    private val userService: SocialUserService,
    private val userIdSource: UserIdSource,
    private val statelessAuthenticationFilter: StatelessAuthenticationFilter,
    private val socialAuthenticationSuccessHandler: SocialAuthenticationSuccessHandler) : WebSecurityConfigurerAdapter() {

    @Bean
    fun passwordEncoder() = BCryptPasswordEncoder(12)

    override fun configure(http: HttpSecurity) {
        // Set a custom successHandler on the SocialAuthenticationFilter
        val springSocialConfigurer = SpringSocialConfigurer()
        springSocialConfigurer.addObjectPostProcessor(object : ObjectPostProcessor<SocialAuthenticationFilter> {
            override fun <O : SocialAuthenticationFilter> postProcess(socialAuthenticationFilter: O): O {
                socialAuthenticationFilter.setAuthenticationSuccessHandler(socialAuthenticationSuccessHandler)
                return socialAuthenticationFilter
            }
        })

        http
            .cors().and().csrf().disable()
            .exceptionHandling().and().anonymous().and().servletApi().and().authorizeRequests()

            //allow anonymous font and template requests
            .mvcMatchers("/", "/login", "/built/**",
                "/js/**", "/css/**", "/fonts/**", "/udm/**", "/favicon.ico").permitAll()

            //allow anonymous calls to social login
            .mvcMatchers("/auth/**").permitAll()

            //allow anonymous GETs to API
            .mvcMatchers(HttpMethod.GET, "/api/**").permitAll()

            //defined Admin only API area
            .mvcMatchers("/admin/**").hasRole("ADMIN")

            // add custom authentication filter for complete stateless JWT based authentication
            .and().addFilterBefore(statelessAuthenticationFilter, AbstractPreAuthenticatedProcessingFilter::class.java)

            // apply the configuration from the socialConfigurer (adds the SocialAuthenticationFilter)
            .apply(springSocialConfigurer
                .userIdSource(userIdSource)
                .postLoginUrl("/")
                .defaultFailureUrl("/login"))

            // this disables session creation on Spring Security
            .and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
    }

    public override fun configure(auth: AuthenticationManagerBuilder) {
        auth.userDetailsService(userService)
    }

    @Bean
    internal fun corsConfigurationSource(): CorsConfigurationSource {
        val source = UrlBasedCorsConfigurationSource()
        source.registerCorsConfiguration("/**", CorsConfiguration().applyPermitDefaultValues())
        return source
    }
}
