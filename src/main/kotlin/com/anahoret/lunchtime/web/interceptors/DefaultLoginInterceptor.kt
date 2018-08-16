package com.anahoret.lunchtime.web.interceptors

import org.springframework.context.annotation.Profile
import org.springframework.stereotype.Component

@Component
@Profile("default")
class DefaultLoginInterceptor : LoginInterceptor()
