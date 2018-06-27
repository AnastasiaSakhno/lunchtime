package com.anahoret.lunchtime.features.auth

import com.anahoret.lunchtime.features.BaseFeatureTest
import org.assertj.core.api.Assertions.assertThat
import org.junit.Test
import org.junit.runner.RunWith
import org.openqa.selenium.By.*
import org.springframework.test.context.junit4.SpringRunner

@RunWith(SpringRunner::class)
class LoginTests : BaseFeatureTest() {
    @Test
    fun hasLoginForm() {
        assertThat(find(LOGIN_FORM_SELECTOR)).isNotEmpty
        assertThat(find(EMAIL_INPUT_SELECTOR)).isNotEmpty
        assertThat(find(PASSWORD_INPUT_SELECTOR)).isNotEmpty
        assertThat(find(SUBMIT_BUTTON_SELECTOR)).isNotEmpty
    }

    @Test
    fun canLoginWithRightCredentials() {
        rootPage.loginAsAdmin()
        fluentUtils.waitFor { cssSelector(USERS_MENU_SHEET) }
        assertThat(findFirst("$USERS_MENU_SHEET_TABLE_ROW .col-2").text).isEqualTo(ADMIN_FULL_NAME)
    }

    @Test
    fun cannotLoginWithWrongCredentials() {
        rootPage.loginWith(ADMIN_EMAIL, "guess")
        fluentUtils.waitFor { cssSelector(EMAIL_HELP_SELECTOR) }
        assertThat(find(EMAIL_HELP_SELECTOR).text).isEqualTo("Bad credentials")
    }
}
