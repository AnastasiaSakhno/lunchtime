package com.anahoret.lunchtime.features.common

import com.anahoret.lunchtime.domain.Role
import com.anahoret.lunchtime.features.BaseFeatureTest
import org.apache.commons.lang3.time.DateFormatUtils
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
        loginWith(FIRST_REGULAR_USER_EMAIL, FIRST_REGULAR_USER_PASSWORD)
        fluentUtils.waitFor { cssSelector(".users-menu-sheet") }
    }

    @Test
    fun canGoOverPrevWeek() {
        val date = LocalDate()
        waitForDate(date)
        click(PREV_WEEK_LINK_SELECTOR)
        waitForDate(date.plusWeeks(-1))
    }

    @Test
    fun canGoOverNextWeek() {
        val date = LocalDate()
        waitForDate(date)
        click(NEXT_WEEK_LINK_SELECTOR)
        waitForDate(date.plusWeeks(1))
    }

    @Test
    fun currentUserInTheFirstLine() {
        TODO("check if logged in user is on the top")
    }

    @Test
    fun cannotChooseOutForNoneMenu() {
        fillSelect(".user-day-menu-select").withText("None")
        fluentUtils.waitFor { xpath("//input[@disabled]") }
    }

    @Test
    fun canChooseOutForNotNoneMenu() {
        fillSelect(".user-day-menu-select").withText("Loft")
        fluentUtils.waitFor { xpath("//input[not(@disabled = 'true')]") }
    }

    @Test
    fun doNotSeeArchivedMenu() {
        assertThat(findFirst(".user-day-menu-select").find("option").count()).isEqualTo(4)
    }

    @Test
    fun canEdit() {
        fillSelect(".user-day-menu-select-wednesday").withText("Loft")
        Thread.sleep(1500)
        val selected = find(".user-day-menu-select-wednesday").value
        assertThat(find(".user-day-menu-select-wednesday option[value='$selected']").text).isEqualTo("Loft")
    }

    override fun setupInitialData() {
        super.setupInitialData()
        createUser(FIRST_REGULAR_USER_FULL_NAME, FIRST_REGULAR_USER_EMAIL, FIRST_REGULAR_USER_PASSWORD_ENCRYPTED, Role.ROLE_REGULAR)
        val loft = createRestaurant(1, "Loft", "пр. Яворницкого, 50", false)
        val leGrand = createRestaurant(2, "LeGrand", "пр. Яворницкого, 50", false)
        val mendis = createRestaurant(3, "Mendis", "ул. Шолом Алейхема, 4/26", true)
        createMenu(1, "None", null, false, null)
        createMenu(2, "Loft", null, false, loft)
        createMenu(3, "Loft рыба", "THU", false, loft)
        createMenu(4, "LeGrand", null, false, leGrand)
        createMenu(5, "Mendis", null, true, mendis)
        // in order to make sure we do not see menu with archived restaurant (Mendis) even though it (the Old Mendis menu) is not archived
        createMenu(6, "Old Mendis", null, false, mendis)
    }

    fun waitForDate(date: LocalDate) =
        fluentUtils.waitFor { xpath("//div[contains(text(), '${DateFormatUtils.format(date.toDate(), DATE_FORMAT_PATTERN)}')]") }

    companion object {
        const val DATE_FORMAT_PATTERN = "yyyy-MM-dd"
    }
}
