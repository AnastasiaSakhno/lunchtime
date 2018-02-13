package com.anahoret.lunchtime.config

import com.anahoret.lunchtime.domain.Restaurant
import org.springframework.data.rest.core.config.RepositoryRestConfiguration
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter
import org.springframework.stereotype.Component


@Component
class ExposeEntityIdRestMvcConfiguration : RepositoryRestConfigurerAdapter() {

    override fun configureRepositoryRestConfiguration(config: RepositoryRestConfiguration?) {
        config!!.exposeIdsFor(Restaurant::class.java)
    }
}