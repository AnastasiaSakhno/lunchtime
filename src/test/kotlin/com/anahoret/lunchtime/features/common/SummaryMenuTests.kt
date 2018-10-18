package com.anahoret.lunchtime.features.common

import com.anahoret.lunchtime.features.BaseFeatureTest
import org.assertj.core.api.Assertions.assertThat
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.openqa.selenium.By.cssSelector
import org.springframework.test.context.TestPropertySource
import org.springframework.test.context.junit4.SpringRunner

@RunWith(SpringRunner::class)
@TestPropertySource(properties = ["username=test1@anadeainc.com"])
class SummaryMenuTests : BaseFeatureTest() {
    @Before
    fun init() {
        fluentUtils.waitFor { cssSelector(USER_DAY_MENU_SELECT) }
    }

    @Test
    fun changeSummaryAfterChangeUserDayMenu() {
        rootPage.fillDay("friday", "Loft")
        find(USERS_MENU_SHEET_TABLE_SUMMARY_ITEM)
            .forEachIndexed { index, element ->
                    assertThat(element.text).isEqualTo(if (index == 4) "Loft 1" else "Loft 0")
            }
    }

    @Test
    fun changeSummaryOutAfterChangeUserDayMenu() {
        rootPage.fillDay("friday", "Loft")
        rootPage.clickDayOut("friday")
        find(USERS_MENU_SHEET_TABLE_SUMMARY_ITEM)
            .forEachIndexed { index, element ->
                    assertThat(element.text).isEqualTo(if (index == 4) "Loft 1 , 1 out" else "Loft 0")
            }
    }

    @Test
    fun canSeeAppropriateMenuColor() {
        rootPage.fillDay("friday", "Loft")
        find(USERS_MENU_SHEET_TABLE_SUMMARY_ITEM)
            .forEachIndexed { index, element ->
                    assertThat(element.getAttribute("style")).containsIgnoringCase("background-color: rgb(126, 211, 33);")
            }
    }

    override fun setupInitialData() {
        super.setupInitialData()
        createUser(FIRST_REGULAR_USER_EMAIL, FIRST_REGULAR_USER_FULL_NAME, setOf(ROLE_REGULAR))
        val loft = createRestaurant(1, "Loft", "пр. Яворницкого, 50", false)
        val leGrand = createRestaurant(2, "LeGrand", "пр. Яворницкого, 50", false)
        createMenu(1, "None", null, false, null)
        createMenu(2, "Loft", null, false, loft, "#7ED321")
        createMenu(3, "Loft рыба", "THU", false, loft)
        createMenu(4, "LeGrand", null, false, leGrand)
    }
}
