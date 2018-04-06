package com.anahoret.lunchtime.features.admin

import com.anahoret.lunchtime.domain.Role
import com.anahoret.lunchtime.features.BaseFeatureTest
import org.assertj.core.api.Assertions.assertThat
import org.joda.time.LocalDate
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.openqa.selenium.By.*
import org.springframework.security.test.context.support.WithMockUser
import org.springframework.test.context.junit4.SpringRunner

@RunWith(SpringRunner::class)
@WithMockUser(username = "admin", roles=["ADMIN"])
class UserDayMenuTests : BaseFeatureTest() {
    @Before
    fun loginAndNavigate() {
        loginAsAdmin()
        fluentUtils.waitFor { cssSelector(".users-menu-sheet") }
    }

    @Test
    fun canEditAllUsers() {
        assertThat(find(".user-day-menu-select").count()).isEqualTo(10)
    }

    @Test
    fun canCloseDays() {
        find(".day-status_manageable").last().click()
        Thread.sleep(1500)
        assertThat(find(".user-day-menu-select")).isEmpty()
        assertThat(find(".users-menu-sheet-table-row").first().find(".user-day-menu_readonly")).isNotEmpty
        assertThat(find(".users-menu-sheet-table-row").last().find(".user-day-menu_readonly")).isNotEmpty
    }

    @Test
    fun canReopenDays() {
        find(".day-status_manageable")[1].click()
        fluentUtils.waitFor { xpath("//span[text()='Reopen']") }
        find(".day-status_manageable")[1].click()
        Thread.sleep(1500)
        assertThat(find(".day-status_manageable")[1].text).isEqualTo("Close")
    }

    @Test
    fun cannotEditInThePast() {
        val date = LocalDate()
        waitForDate(date)
        click(PREV_WEEK_LINK_SELECTOR)
        waitForDate(date.plusWeeks(-1))
        assertThat(find(".user-day-menu-select")).isEmpty()
    }

    override fun setupInitialData() {
        super.setupInitialData()
        createUser(FIRST_REGULAR_USER_FULL_NAME, FIRST_REGULAR_USER_EMAIL, FIRST_REGULAR_USER_PASSWORD_ENCRYPTED, Role.ROLE_REGULAR)
        val loft = createRestaurant(1, "Loft", "пр. Яворницкого, 50", false)
        val leGrand = createRestaurant(2, "LeGrand", "пр. Яворницкого, 50", false)
        createMenu(1, "None", null, false, null)
        createMenu(2, "Loft", null, false, loft)
        createMenu(3, "Loft рыба", "THU", false, loft)
        createMenu(4, "LeGrand", null, false, leGrand)
    }
}
