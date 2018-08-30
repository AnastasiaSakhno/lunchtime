package com.anahoret.lunchtime.config

import com.anahoret.lunchtime.domain.*
import com.anahoret.lunchtime.domain.auth.Authority
import com.anahoret.lunchtime.domain.auth.UserAuthority
import org.springframework.data.rest.core.config.RepositoryRestConfiguration
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter
import org.springframework.stereotype.Component


@Component
class ExposeEntityIdRestMvcConfig : RepositoryRestConfigurerAdapter() {

    override fun configureRepositoryRestConfiguration(config: RepositoryRestConfiguration) {
        config.exposeIdsFor(
            Restaurant::class.java,
            Menu::class.java,
            User::class.java,
            Authority::class.java,
            UserDayMenu::class.java,
            Day::class.java)
    }
}
