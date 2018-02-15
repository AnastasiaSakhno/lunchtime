package com.anahoret.lunchtime.config

import org.springframework.http.HttpStatus
import org.springframework.boot.context.embedded.EmbeddedServletContainerCustomizer
import org.springframework.boot.web.servlet.ErrorPage
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter


@Configuration
class WebApplicationConfig : WebMvcConfigurerAdapter() {

    // TODO remove in a future. resolve on client side
    override fun addViewControllers(registry: ViewControllerRegistry?) {
        registry!!.addViewController("/notFound").setViewName("forward:/")
    }


    @Bean
    fun containerCustomizer(): EmbeddedServletContainerCustomizer {
        return EmbeddedServletContainerCustomizer { container ->
            container.addErrorPages(ErrorPage(HttpStatus.NOT_FOUND,
                    "/notFound")) }
    }

}
