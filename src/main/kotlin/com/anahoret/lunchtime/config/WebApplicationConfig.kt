package com.anahoret.lunchtime.config

import org.springframework.boot.context.embedded.EmbeddedServletContainerCustomizer
import org.springframework.boot.web.servlet.ErrorPage
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpStatus
import org.springframework.web.servlet.HandlerInterceptor
import org.springframework.web.servlet.config.annotation.InterceptorRegistry
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter

@Configuration
class WebApplicationConfig(val loginInterceptor: HandlerInterceptor) : WebMvcConfigurerAdapter() {

    // TODO remove in a future. resolve on client side
    override fun addViewControllers(registry: ViewControllerRegistry) {
        registry.addViewController("/notFound").setViewName("forward:/")
    }


    @Bean
    fun containerCustomizer(): EmbeddedServletContainerCustomizer {
        return EmbeddedServletContainerCustomizer { container ->
            container.addErrorPages(ErrorPage(HttpStatus.NOT_FOUND,
                    "/notFound")) }
    }

    override fun addInterceptors(registry: InterceptorRegistry) {
        super.addInterceptors(registry)
        registry.addInterceptor(loginInterceptor)
    }

}
