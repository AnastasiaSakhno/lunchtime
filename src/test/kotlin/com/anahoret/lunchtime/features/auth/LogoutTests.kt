package com.anahoret.lunchtime.features.auth

import com.anahoret.lunchtime.features.BaseFeatureTest
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.openqa.selenium.By.*
import org.springframework.test.context.junit4.SpringRunner

@RunWith(SpringRunner::class)
class LogoutTests : BaseFeatureTest() {
    @Before
    fun goToSignUp() {
        rootPage.loginAsAdmin()
        fluentUtils.waitFor { cssSelector(LOGOUT_LINK) }
    }

    @Test
    fun canLogout() {
        click(LOGOUT_LINK)
        fluentUtils.waitFor { cssSelector(LOGIN_FORM_SELECTOR) }
    }
}
