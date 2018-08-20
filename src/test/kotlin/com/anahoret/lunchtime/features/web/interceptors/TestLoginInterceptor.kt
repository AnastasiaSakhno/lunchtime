package com.anahoret.lunchtime.features.web.interceptors

import com.anahoret.lunchtime.config.JwtConfig
import com.anahoret.lunchtime.features.web.AuthenticationStub
import com.anahoret.lunchtime.repositories.UserRepository
import com.anahoret.lunchtime.services.social.TokenAuthenticationService
import com.anahoret.lunchtime.web.interceptors.LoginInterceptor
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Profile
import org.springframework.stereotype.Component
import org.springframework.web.servlet.ModelAndView
import java.lang.Exception
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

@Component
@Profile("test")
class TestLoginInterceptor(
    val authenticationStub: AuthenticationStub,
    val jwtConfig: JwtConfig) : LoginInterceptor() {

    @Value("\${username:admin@anadeainc.com}")
    private lateinit var username: String

    override fun preHandle(request: HttpServletRequest, response: HttpServletResponse, handler: Any): Boolean {
        val url = request.requestURI
        if(url.contains(AUTH_REGEX)) {
            val token = authenticationStub.authToken()
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
