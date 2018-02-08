package com.anahoret.lunchtime

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.context.annotation.Bean
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder



@SpringBootApplication
class LunchtimeApplication {

    @Bean
    fun passwordEncoder() = BCryptPasswordEncoder(12)
}

fun main(args: Array<String>) {
    SpringApplication.run(LunchtimeApplication::class.java, *args)
}
