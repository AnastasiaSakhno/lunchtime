package com.anahoret.lunchtime

import com.anahoret.lunchtime.domain.Role
import com.anahoret.lunchtime.domain.User
import com.anahoret.lunchtime.repositories.UserRepository
import io.github.bonigarcia.wdm.ChromeDriverManager
import org.fluentlenium.adapter.FluentTest
import org.junit.Before
import org.openqa.selenium.WebDriver
import org.openqa.selenium.chrome.ChromeDriver
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.ActiveProfiles

@SpringBootTest(classes = [LunchtimeApplication::class], webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
class BaseSeleniumTest : FluentTest() {
    @Value("\${local.server.port}")
    private val serverPort: Int = 0

    @field:Autowired
    private lateinit var truncateDatabaseService: DatabaseCleanupService

    @field:Autowired
    private lateinit var userRepository: UserRepository

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

    @Before
    fun cleanupAndSetupInitialData() {
        truncateDatabaseService.truncate()
        setupInitialData()
    }

    fun setupInitialData() {
        createUser(ADMIN_FULL_NAME, ADMIN_EMAIL, ADMIN_PASSWORD_ENCRYPTED, Role.ROLE_ADMIN)
    }

    fun createUser(fullName: String, email: String, password: String, role: Role) {
        val user = User()
        user.role = role
        user.email = email
        user.password = password
        user.fullName = fullName
        userRepository.save(user)
    }

    fun loginAsAdmin() = loginWith(ADMIN_EMAIL, ADMIN_PASSWORD)

    fun loginWith(email: String, password: String) {
        fill("#email_input").with(email)
        fill("#password_input").with(password)
        submit(".login-form")
    }

    companion object {
        const val ADMIN_EMAIL = "admin@anadeainc.com"
        const val ADMIN_PASSWORD = "admin"
        const val ADMIN_PASSWORD_ENCRYPTED = "\$2a\$12\$6yiK4/ar7AfbL/VAjJd1M.u4SC5NHTwEvNfhCQLh.2ktmxUstEZJu"
        const val ADMIN_FULL_NAME = "App Admin"
    }
}
