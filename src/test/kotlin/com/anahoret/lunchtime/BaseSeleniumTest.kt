package com.anahoret.lunchtime

import io.github.bonigarcia.wdm.ChromeDriverManager
import org.fluentlenium.adapter.FluentTest
import org.junit.Before
import org.openqa.selenium.WebDriver
import org.openqa.selenium.chrome.ChromeDriver
import org.springframework.beans.factory.annotation.Value
import org.springframework.boot.test.context.SpringBootTest

@SpringBootTest(classes = [LunchtimeApplication::class], webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class BaseSeleniumTest : FluentTest() {
    @Value("\${local.server.port}")
    private val serverPort: Int = 0

    init {
        ChromeDriverManager.getInstance().setup()
    }

    val webDriver: WebDriver = ChromeDriver()
    val fluentUtils: FluentUtils = FluentUtils(webDriver)

    override fun getDefaultDriver() = webDriver

    @Before
    fun goToBaseUrl() {
        goTo("http://localhost:$serverPort")
    }

    fun loginAsAdmin() = loginWith("admin@anadeainc.com", "admin")

    fun loginAsAdmin() = loginWith(ADMIN_EMAIL, ADMIN_PASSWORD)

    fun loginWith(email:String, password: String) {
        fill("#email_input").with(email)
        fill("#password_input").with(password)
        submit(".login-form")
    }

    companion object {
        const val ADMIN_EMAIL = "admin@anadeainc.com"
        const val ADMIN_PASSWORD = "admin"
    }
}
