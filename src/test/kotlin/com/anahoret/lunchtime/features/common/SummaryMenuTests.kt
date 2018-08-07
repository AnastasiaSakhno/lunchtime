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
@TestPropertySource(properties = [
    "username=ask@anadeainc.com",
    "displayName=App Admin",
    "role=ADMIN"
])
class SummaryMenuTests : BaseFeatureTest() {
    @Before
    fun loginAndNavigate() {
        rootPage.loginWith(FIRST_REGULAR_USER_EMAIL, FIRST_REGULAR_USER_PASSWORD)
        fluentUtils.waitFor { cssSelector(USERS_MENU_SHEET) }
    }

    @Test
    fun allInNone() {
        assertThat(find(USERS_MENU_SHEET_TABLE_SUMMARY_ITEM).count()).isEqualTo(5)
        find(USERS_MENU_SHEET_TABLE_SUMMARY_ITEM)
            .forEach { assertThat(it.text).isEqualTo("None 2") }
    }

    @Test
    fun changeSummaryAfterChangeUserDayMenu() {
        rootPage.fillDay("friday", "Loft")
        find(USERS_MENU_SHEET_TABLE_SUMMARY_ITEM)
            .forEachIndexed { index, element ->
                if (index < 5)
                    assertThat(element.text).isEqualTo(if (index == 4) "None 1" else "None 2")
                else
                    assertThat(element.text).isEqualTo(if (index == 9) "Loft 1" else "Loft 0")
            }
    }

    @Test
    fun changeSummaryOutAfterChangeUserDayMenu() {
        rootPage.fillDay("friday", "Loft")
        rootPage.clickDayOut("friday")
        find(USERS_MENU_SHEET_TABLE_SUMMARY_ITEM)
            .forEachIndexed { index, element ->
                if (index < 5)
                    assertThat(element.text).isEqualTo(if (index == 4) "None 1" else "None 2")
                else
                    assertThat(element.text).isEqualTo(if (index == 9) "Loft 1 , 1 out" else "Loft 0")
            }
    }

    override fun setupInitialData() {
        super.setupInitialData()
        val loft = createRestaurant(1, "Loft", "пр. Яворницкого, 50", false)
        val leGrand = createRestaurant(2, "LeGrand", "пр. Яворницкого, 50", false)
        createMenu(1, "None", null, false, null)
        createMenu(2, "Loft", null, false, loft)
        createMenu(3, "Loft рыба", "THU", false, loft)
        createMenu(4, "LeGrand", null, false, leGrand)
    }
}
