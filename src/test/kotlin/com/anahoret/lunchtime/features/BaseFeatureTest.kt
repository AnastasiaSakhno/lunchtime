package com.anahoret.lunchtime.features

import com.anahoret.lunchtime.DatabaseCleanupService
import com.anahoret.lunchtime.FluentUtils
import com.anahoret.lunchtime.LunchtimeApplication
import com.anahoret.lunchtime.domain.*
import com.anahoret.lunchtime.features.pages.RootPage
import com.anahoret.lunchtime.repositories.*
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
@WithMockUser(username = "admin", roles = ["ADMIN"])
@ActiveProfiles("test")
abstract class BaseFeatureTest : FluentTest() {
    @Value("\${local.server.port}")
    private val serverPort: Int = 0

    @Autowired
    private lateinit var truncateDatabaseService: DatabaseCleanupService

    @Autowired
    protected lateinit var userRepository: UserRepository

    @Autowired
    protected lateinit var authorityRepository: AuthorityRepository

    @Autowired
    protected lateinit var restaurantRepository: RestaurantRepository

    @Autowired
    protected lateinit var menuRepository: MenuRepository

    @Autowired
    protected lateinit var userDayMenuRepository: UserDayMenuRepository

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
        createUser(ADMIN_EMAIL, ADMIN_FULL_NAME, setOf(ROLE_ADMIN, ROLE_REGULAR))
    }

    fun createUser(email: String, fullName: String, roles: Set<String>) =
        userRepository.save(User().also {
            it.fullName = fullName
            it.setUsername(email)
            it.providerId = "google"
            it.providerUserId = "123"
            it.accessToken = "token"
            roles.forEach { role -> it.grantAuthority(authorityRepository.findByName(role)!!) }
        })

    fun createRestaurant(id: Long, name: String, address: String, archive: Boolean) =
        restaurantRepository.save(Restaurant(id, name, address, archive))

    fun createMenu(id: Long, name: String, weekDays: String?, archive: Boolean, restaurant: Restaurant?) =
        menuRepository.save(Menu(id, name, weekDays, archive, restaurant))

    fun createUdm(id: Long, user: User, menu: Menu, date: LocalDate, out: Boolean = false) =
        userDayMenuRepository.save(UserDayMenu(id, date, out, menu, user))

    companion object {
        const val ROLE_ADMIN = "ROLE_ADMIN"
        const val ROLE_REGULAR = "ROLE_REGULAR"
        const val ADMIN_EMAIL = "admin@anadeainc.com"
        const val ADMIN_FULL_NAME = "App Admin"
        const val FIRST_REGULAR_USER_EMAIL = "test1@anadeainc.com"
        const val FIRST_REGULAR_USER_FULL_NAME = "Иван Иванов"

        const val EMAIL_INPUT_SELECTOR = "#email_input"
        const val NAME_INPUT_SELECTOR = "#name_input"

        const val NEXT_WEEK_LINK_SELECTOR = ".users-menu-next"
        const val PREV_WEEK_LINK_SELECTOR = ".users-menu-prev"

        const val TABLE_ROW_SELECTOR = "table tbody tr"

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
