package com.anahoret.lunchtime.features

import com.anahoret.lunchtime.DatabaseCleanupService
import com.anahoret.lunchtime.FluentUtils
import com.anahoret.lunchtime.LunchtimeApplication
import com.anahoret.lunchtime.config.JwtConfig
import com.anahoret.lunchtime.domain.*
import com.anahoret.lunchtime.features.pages.RootPage
import com.anahoret.lunchtime.repositories.MenuRepository
import com.anahoret.lunchtime.repositories.RestaurantRepository
import com.anahoret.lunchtime.repositories.UserDayMenuRepository
import com.anahoret.lunchtime.repositories.UserRepository
import io.github.bonigarcia.wdm.ChromeDriverManager
import org.fluentlenium.adapter.FluentTest
import org.joda.time.LocalDate
import org.junit.Before
import org.openqa.selenium.WebDriver
import org.openqa.selenium.chrome.ChromeDriver
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.security.test.context.support.WithMockUser
import org.springframework.test.context.ActiveProfiles


@SpringBootTest(classes = [LunchtimeApplication::class], webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@WithMockUser(username = "ask@anadeainc.com", authorities = ["ADMIN", "REGULAR"])
@ActiveProfiles("test")
abstract class BaseFeatureTest : FluentTest() {
    @Value("\${local.server.port}")
    private val serverPort: Int = 0

    @Autowired
    private lateinit var truncateDatabaseService: DatabaseCleanupService

    @Autowired
    protected lateinit var userRepository: UserRepository

    @Autowired
    protected lateinit var restaurantRepository: RestaurantRepository

    @Autowired
    protected lateinit var menuRepository: MenuRepository

    @Autowired
    protected lateinit var userDayMenuRepository: UserDayMenuRepository

    @Autowired
    private lateinit var jwtConfig: JwtConfig

    init {
        ChromeDriverManager.getInstance().setup()
    }

    protected val webDriver: WebDriver = ChromeDriver()
    protected val rootPage: RootPage = RootPage(this, serverPort)
    protected val fluentUtils: FluentUtils = rootPage.fluentUtils


    override fun getDefaultDriver() = webDriver

    @Before
    fun goToBaseUrl() {
        truncateDatabaseService.truncate()
        setupInitialData()

        goTo("http://localhost:$serverPort")
    }

    fun setupInitialData(){
        createUser(ADMIN_EMAIL, ADMIN_FULL_NAME, setOf(UserRole.ADMIN, UserRole.REGULAR))
    }

    fun createUser(email: String, fullName: String, roles: Set<UserRole>) =
        userRepository.save(User().also {
            it.fullName = fullName
            it.setUsername(email)
            it.providerId = "google"
            it.providerUserId = "123"
            it.accessToken = "token"
            it.expires = System.currentTimeMillis() + jwtConfig.expirationTime
            it.roles = roles
        })

    fun createRestaurant(id: Long, name: String, address: String, archive: Boolean) =
        restaurantRepository.save(Restaurant(id, name, address, archive))

    fun createMenu(id: Long, name: String, weekDays: String?, archive: Boolean, restaurant: Restaurant?) =
        menuRepository.save(Menu(id, name, weekDays, archive, restaurant))

    fun createUdm(id: Long, user: User, menu: Menu, date: LocalDate, out: Boolean = false) =
        userDayMenuRepository.save(UserDayMenu(id, date, out, menu, user))

    companion object {
        const val ADMIN_EMAIL = "admin@anadeainc.com"
        const val ADMIN_FULL_NAME = "App Admin"
        const val FIRST_REGULAR_USER_EMAIL = "test1@anadeainc.com"
        const val FIRST_REGULAR_USER_FULL_NAME = "Иван Иванов"
        const val SECOND_REGULAR_USER_EMAIL = "test2@anadeainc.com"
        const val SECOND_REGULAR_USER_FULL_NAME = "Пётр Петров"
        const val NEW_EMAIL = "some_new_email@anadeainc.com"
        const val NEW_PASSWORD = "some_password1"
        const val NEW_FULL_NAME = "Adam Freeman"

        const val SUBMIT_BUTTON_SELECTOR = "button[type='submit']"
        const val EMAIL_INPUT_SELECTOR = "#email_input"
        const val NAME_INPUT_SELECTOR = "#name_input"
        const val PASSWORD_INPUT_SELECTOR = "#password_input"
        const val LOGIN_FORM_SELECTOR = ".login-form"

        const val EMAIL_HELP_SELECTOR = "#emailHelp"

        const val NEXT_WEEK_LINK_SELECTOR = ".users-menu-next"
        const val PREV_WEEK_LINK_SELECTOR = ".users-menu-prev"

        const val TABLE_ROW_SELECTOR = "table tbody tr"

        const val USERS_MENU_SHEET = ".users-menu-sheet"
        const val USER_DAY_MENU_SELECT = ".user-day-menu-select"
        const val USER_DAY_MENU_FRIDAY = ".user-day-menu-friday"
        const val USER_DAY_MENU_THURSDAY = ".user-day-menu-thursday"
        const val USERS_MENU_SHEET_TABLE_ROW = ".users-menu-sheet-table-row"
        const val USERS_MENU_SHEET_TABLE_SUMMARY_ITEM = ".users-menu-sheet-table-summary-item"
        const val USER_DAY_MENU_READONLY = ".user-day-menu_readonly"

        const val LOGOUT_LINK = ".logout"

        const val MENU_DOCUMENTS_CONTAINER = ".menu-documents-container"
    }
}
