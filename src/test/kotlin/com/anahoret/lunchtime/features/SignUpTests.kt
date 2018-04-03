package com.anahoret.lunchtime.features

import com.anahoret.lunchtime.BaseSeleniumTest
import org.assertj.core.api.Assertions.assertThat
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.test.context.junit4.SpringRunner

@RunWith(SpringRunner::class)
class SignUpTests : BaseSeleniumTest() {
    @Test
    fun hasSignUpForm() {
        find("a[href='/signup']").click()
        assertThat(find(".signup-form")).isNotEmpty
        assertThat(find("#name_input")).isNotEmpty
        assertThat(find("#email_input")).isNotEmpty
        assertThat(find("#password_input")).isNotEmpty
        assertThat(find("button[type='submit']")).isNotEmpty
    }

    @Test
    fun canSignUpWithRightCredentials() {
    }

    @Test
    fun cannotSignUpWithWrongCredentials() {
    }

    @Test
    fun cannotSignUpWhenTheSameUserAlreadyExists() {
    }
}
