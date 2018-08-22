package com.anahoret.lunchtime.features.regular

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
class UserDayMenuTests : BaseFeatureTest() {
    @Before
    fun init() {
        fluentUtils.waitFor { cssSelector(USER_DAY_MENU_SELECT) }
    }

    @Test
    fun canViewAllUsers() {
        assertThat(find(USERS_MENU_SHEET_TABLE_ROW).count()).isEqualTo(2)
    }

    @Test
    fun canEditOnlyYourself() {
        assertThat(find(USER_DAY_MENU_SELECT).count()).isEqualTo(rootPage.expectedUserDayMenuSelectCount(1))
    }

    @Test
    fun cannotEditInThePast() {
        rootPage.prevWeek()
        assertThat(find(USER_DAY_MENU_SELECT)).isEmpty()
    }

    override fun setupInitialData() {
        super.setupInitialData()
        createUser(FIRST_REGULAR_USER_EMAIL, FIRST_REGULAR_USER_FULL_NAME, setOf(ROLE_REGULAR))
        val loft = createRestaurant(1, "Loft", "пр. Яворницкого, 50", false)
        val leGrand = createRestaurant(2, "LeGrand", "пр. Яворницкого, 50", false)
        createMenu(1, "None", null, false, null)
        createMenu(2, "Loft", null, false, loft)
        createMenu(3, "Loft рыба", "THU", false, loft)
        createMenu(4, "LeGrand", null, false, leGrand)
    }
}
