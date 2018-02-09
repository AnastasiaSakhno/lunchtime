package com.anahoret.lunchtime

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication


@SpringBootApplication
class LunchtimeApplication

fun main(args: Array<String>) {
    SpringApplication.run(LunchtimeApplication::class.java, *args)
}
