package com.anahoret.lunchtime.features.common

import com.anahoret.lunchtime.domain.Role
import com.anahoret.lunchtime.features.BaseFeatureTest
import org.assertj.core.api.Assertions.assertThat
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.openqa.selenium.By.*
import org.springframework.security.test.context.support.WithMockUser
import org.springframework.test.context.junit4.SpringRunner

@RunWith(SpringRunner::class)
@WithMockUser(username = "admin", roles=["ADMIN"])
class SummaryMenuTests : BaseFeatureTest() {
    @Before
    fun loginAndNavigate() {
        loginWith(FIRST_REGULAR_USER_EMAIL, FIRST_REGULAR_USER_PASSWORD)
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
        fillSelect(".user-day-menu-thursday $USER_DAY_MENU_SELECT").withText("Loft")
        Thread.sleep(1500)
        find(USERS_MENU_SHEET_TABLE_SUMMARY_ITEM)
            .forEachIndexed { index, element ->
                if (index < 5)
                    assertThat(element.text).isEqualTo( if (index == 3) "None 1" else "None 2")
                else
                    assertThat(element.text).isEqualTo( if (index == 8) "Loft 1" else "Loft 0")
            }
    }

    @Test
    fun changeSummaryOutAfterChangeUserDayMenu() {
        fillSelect("$USER_DAY_MENU_WEDNESDAY $USER_DAY_MENU_SELECT").withText("Loft")
        Thread.sleep(1500)
        click("$USER_DAY_MENU_WEDNESDAY .user-day-menu-out-input")
        find(USERS_MENU_SHEET_TABLE_SUMMARY_ITEM)
            .forEachIndexed { index, element ->
                if (index < 5)
                    assertThat(element.text).isEqualTo( if (index == 2) "None 1" else "None 2")
                else
                    assertThat(element.text).isEqualTo( if (index == 7) "Loft 1 , 1 out" else "Loft 0")
            }
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
