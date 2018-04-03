package com.anahoret.lunchtime.features

import com.anahoret.lunchtime.BaseSeleniumTest
import org.assertj.core.api.Assertions
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.test.context.junit4.SpringRunner

@RunWith(SpringRunner::class)
class LoginTests : BaseSeleniumTest() {
    @Test
    fun hasLoginForm() {
        Assertions.assertThat(find(".login-form")).isNotNull
        Assertions.assertThat(find("#email_input")).isNotNull
        Assertions.assertThat(find("#password_input")).isNotNull
        Assertions.assertThat(find("button[type='submit']")).isNotNull
    }

    @Test
    fun canLoginWithRightCredentials() {
        loginAsAdmin()
        fluentUtils.waitForClass("users-menu-next")
        Assertions.assertThat(find(".users-menu-next").text).isEqualTo("Next")
    }

    @Test
    fun cannotLoginWithWrongCredentials() {
        loginWith("admin@anadeainc.com", "guess")
        fluentUtils.waitForId("emailHelp")
        Assertions.assertThat(find("#emailHelp").text).isEqualTo("Bad credentials")
    }
}
