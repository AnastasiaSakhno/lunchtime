package com.anahoret.lunchtime.web.interceptors

import org.springframework.context.annotation.Profile
import org.springframework.stereotype.Component
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter

@Component
@Profile("default")
class DoNothingLoginInterceptor : HandlerInterceptorAdapter()
