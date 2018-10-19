package com.anahoret.lunchtime.features.admin

import com.anahoret.lunchtime.features.BaseFeatureTest
import com.anahoret.lunchtime.features.pages.UsersPage
import org.assertj.core.api.Assertions.assertThat
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.openqa.selenium.By
import org.openqa.selenium.support.ui.Select
import org.springframework.test.context.TestPropertySource
import org.springframework.test.context.junit4.SpringRunner

@RunWith(SpringRunner::class)
@TestPropertySource(properties = ["username=admin@anadeainc.com"])
class UsersTests : BaseFeatureTest() {

    @Before
    fun init() {
        rootPage.getUsersPage().navigate()
    }

    @Test
    fun canView() {
        assertThat(find(TABLE_ROW_SELECTOR).count()).isEqualTo(2)
        assertThat(find(UsersPage.FORM_SELECTOR)).isEmpty()
    }

    @Test
    fun canEditRoles() {
        val select = Select(driver.findElement(By.cssSelector(".user-roles-select:nth-of-type(1)")))
        select.deselectByVisibleText("ROLE_ADMIN")
        Thread.sleep(200)
        val user = userRepository.findByUsername(ADMIN_EMAIL)
        assertThat(user!!.roles.count()).isEqualTo(1)
        assertThat(user.roles.first()).isEqualTo("ROLE_REGULAR")
    }

    @Test
    fun canEditStatus() {
        findFirst(".user-status-input").click()
        Thread.sleep(200)
        val user = userRepository.findByUsername(ADMIN_EMAIL)
        assertThat(user!!.isEnabled).isEqualTo(false)
    }

    override fun setupInitialData() {
        super.setupInitialData()
        createUser(FIRST_REGULAR_USER_EMAIL, FIRST_REGULAR_USER_FULL_NAME, setOf(ROLE_REGULAR))
    }
}
