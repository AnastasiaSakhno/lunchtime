package com.anahoret.lunchtime.features.auth

import com.anahoret.lunchtime.features.BaseFeatureTest
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.openqa.selenium.By.*
import org.springframework.test.context.TestPropertySource
import org.springframework.test.context.junit4.SpringRunner

@RunWith(SpringRunner::class)
@TestPropertySource(properties = ["username=admin@anadeainc.com"])
class LogoutTests : BaseFeatureTest() {
    @Before
    fun init() {
        fluentUtils.waitFor { cssSelector(LOGOUT_LINK) }
    }

    @Test
    fun canLogout() {
        fluentUtils.waitFor { cssSelector(USER_DAY_MENU_SELECT) }
        click(LOGOUT_LINK)
        fluentUtils.waitForInvisibility { cssSelector(USER_DAY_MENU_SELECT) }
    }
}
