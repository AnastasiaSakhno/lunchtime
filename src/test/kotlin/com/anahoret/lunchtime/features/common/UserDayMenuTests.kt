package com.anahoret.lunchtime.features.common

import com.anahoret.lunchtime.features.BaseFeatureTest
import org.assertj.core.api.Assertions.assertThat
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.openqa.selenium.By.cssSelector
import org.openqa.selenium.By.xpath
import org.springframework.test.context.junit4.SpringRunner

@RunWith(SpringRunner::class)
class UserDayMenuTests : BaseFeatureTest() {
    @Before
    fun loginAndNavigate() {
        rootPage.loginWith(FIRST_REGULAR_USER_EMAIL, FIRST_REGULAR_USER_PASSWORD)
        fluentUtils.waitFor { cssSelector(USERS_MENU_SHEET) }
    }

    @Test
    fun canGoOverPrevWeek() {
        rootPage.prevWeek() // we have asserts inside
    }

    @Test
    fun canGoOverNextWeek() {
        rootPage.nextWeek()
    }

    @Test
    fun currentUserInTheFirstLine() {
        assertThat(findFirst("$USERS_MENU_SHEET_TABLE_ROW .col-2").text).isEqualTo(FIRST_REGULAR_USER_FULL_NAME)
    }

    @Test
    fun cannotChooseOutForNoneMenu() {
        rootPage.fillDay("friday", "None")
        fluentUtils.waitFor { xpath("//input[@disabled]") }
    }

    @Test
    fun canChooseOutForNotNoneMenu() {
        rootPage.fillDay("friday", "Loft")
        fluentUtils.waitFor { xpath("//input[not(@disabled = 'true')]") }
    }

    @Test
    fun doNotSeeArchivedMenu() {
        assertThat(find("$USER_DAY_MENU_FRIDAY $USER_DAY_MENU_SELECT").find("option").count()).isEqualTo(3)
    }

    @Test
    fun takeIntoAccountSpecificWeekDaysMenu() {
        assertThat(find("$USER_DAY_MENU_THURSDAY $USER_DAY_MENU_SELECT").find("option").count()).isEqualTo(4)
    }

    @Test
    fun canEdit() {
        rootPage.fillDay("friday", "Loft")
        val selected = find("$USER_DAY_MENU_FRIDAY $USER_DAY_MENU_SELECT").value
        assertThat(find("$USER_DAY_MENU_FRIDAY $USER_DAY_MENU_SELECT option[value='$selected']").text).isEqualTo("Loft")
    }

    override fun setupInitialData() {
        super.setupInitialData()
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

    companion object {
        const val DATE_FORMAT_PATTERN = "yyyy-MM-dd"
    }
}
