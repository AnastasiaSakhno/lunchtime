package com.anahoret.lunchtime.features

import com.anahoret.lunchtime.BaseSeleniumTest
import org.assertj.core.api.Assertions.assertThat
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.test.context.junit4.SpringRunner

@RunWith(SpringRunner::class)
class LoginTests : BaseSeleniumTest() {
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
        fluentUtils.waitForClass("users-menu-next")
        assertThat(find(".users-menu-next").text).isEqualTo("Next")
    }

    @Test
    fun cannotLoginWithWrongCredentials() {
        loginWith("admin@anadeainc.com", "guess")
        fluentUtils.waitForId("emailHelp")
        assertThat(find("#emailHelp").text).isEqualTo("Bad credentials")
    }
}
