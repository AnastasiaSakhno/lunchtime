package com.anahoret.lunchtime.features.auth

import com.anahoret.lunchtime.features.BaseFeatureTest
import org.assertj.core.api.Assertions.assertThat
import org.junit.Test
import org.junit.runner.RunWith
import org.openqa.selenium.By
import org.springframework.test.context.junit4.SpringRunner

@RunWith(SpringRunner::class)
class LoginTests : BaseFeatureTest() {
    @Test
    fun hasLoginForm() {
        assertThat(find(".login-form")).isNotEmpty
        assertThat(find("#email_input")).isNotEmpty
        assertThat(find("#password_input")).isNotEmpty
        assertThat(find("button[type='submit']")).isNotEmpty
    }

    @Test
    fun canLoginWithRightCredentials() {
        loginAsAdmin()
        fluentUtils.waitFor { By.className("users-menu-next") }
        assertThat(find(".users-menu-next").text).isEqualTo("Next")
    }

    @Test
    fun cannotLoginWithWrongCredentials() {
        loginWith(ADMIN_EMAIL, "guess")
        fluentUtils.waitFor { By.id("emailHelp") }
        assertThat(find("#emailHelp").text).isEqualTo("Bad credentials")
    }
}
