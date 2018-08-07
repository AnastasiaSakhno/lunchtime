package com.anahoret.lunchtime.features.interceptors

import com.anahoret.lunchtime.config.JwtConfig
import com.anahoret.lunchtime.web.interceptors.LoginInterceptor
import org.springframework.context.annotation.Profile
import org.springframework.stereotype.Component
import org.springframework.web.servlet.ModelAndView
import java.lang.Exception
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

@Component
@Profile("test")
class TestLoginInterceptor(private val jwtConfig: JwtConfig) : LoginInterceptor {
    override fun preHandle(request: HttpServletRequest, response: HttpServletResponse, handler: Any): Boolean {
        val url = request.requestURI
        if(url.contains(AUTH_REGEX)) {
            val token = "eyJpZCI6MSwiZnVsbE5hbWUiOiLQkNC90LDRgdGC0LDRgdC40Y8g0KHQsNGF0L3QviIsInVzZXJuYW1lIjoiYXNrQGFuYWRlYWluYy5jb20iLCJleHBpcmVzIjoxNTM1NzEyODIzMTg1LCJyb2xlcyI6WyJSRUdVTEFSIiwiQURNSU4iXX0.TM7xAhV5Fbtg-vhTA30FpXRdS_5CKnHz03wXyjy0zjU"
            response.setHeader("Set-Cookie", "${jwtConfig.cookie}=$token")
            response.sendRedirect("/")
            return false
        }
        return true
    }

    override fun postHandle(request: HttpServletRequest?, response: HttpServletResponse?, handler: Any?, modelAndView: ModelAndView?) {
    }

    override fun afterCompletion(request: HttpServletRequest?, response: HttpServletResponse?, handler: Any?, ex: Exception?) {
    }

    companion object {
        private val AUTH_REGEX = Regex("auth/google")
    }
}
