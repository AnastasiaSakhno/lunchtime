package com.anahoret.lunchtime.features.auth

import com.anahoret.lunchtime.features.BaseFeatureTest
import org.assertj.core.api.Assertions.assertThat
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.openqa.selenium.By.*
import org.springframework.test.context.junit4.SpringRunner

@RunWith(SpringRunner::class)
class SignUpTests : BaseFeatureTest() {

    @Before
    fun goToSignUp() {
        click(SIGN_UP_LINK_SELECTOR)
    }

    @Test
    fun hasSignUpForm() {
        assertThat(find(SIGN_UP_FORM_SELECTOR)).isNotEmpty
        assertThat(find(NAME_INPUT_SELECTOR)).isNotEmpty
        assertThat(find(EMAIL_INPUT_SELECTOR)).isNotEmpty
        assertThat(find(PASSWORD_INPUT_SELECTOR)).isNotEmpty
        assertThat(find(SUBMIT_BUTTON_SELECTOR)).isNotEmpty
    }

    @Test
    fun canSignUpWithRightCredentials() {
        signUpWith(NEW_FULL_NAME, NEW_EMAIL, NEW_PASSWORD)
        fluentUtils.waitFor { cssSelector(NEXT_WEEK_LINK_SELECTOR) }
        assertThat(find(NEXT_WEEK_LINK_SELECTOR).text).isEqualTo("Next")
    }

    @Test
    fun cannotSignUpWithoutFullNameCredentials() {
        assertDisabledSubmitButtonWhenWrongCredentials("", NEW_EMAIL, NEW_PASSWORD)
    }

    @Test
    fun cannotSignUpWithoutEmailCredentials() {
        assertDisabledSubmitButtonWhenWrongCredentials(NEW_FULL_NAME, "", NEW_PASSWORD)
    }

    @Test
    fun cannotSignUpWithoutPasswordCredentials() {
        assertDisabledSubmitButtonWhenWrongCredentials(NEW_FULL_NAME, NEW_EMAIL, "")
    }

    @Test
    fun cannotSignUpWhenTheSameUserAlreadyExists() {
        wrongSignUpAssert(NEW_FULL_NAME, ADMIN_EMAIL, ADMIN_PASSWORD, "User already exists")
    }

    fun signUpWith(fullName: String, email: String, password: String) {
        fill(NAME_INPUT_SELECTOR).with(fullName)
        fill(EMAIL_INPUT_SELECTOR).with(email)
        fill(PASSWORD_INPUT_SELECTOR).with(password)
        submit(SIGN_UP_FORM_SELECTOR)
    }

    fun wrongSignUpAssert(fullName: String, email: String, password: String, errorMessage: String) {
        signUpWith(fullName, email, password)
        fluentUtils.waitFor { cssSelector(EMAIL_HELP_SELECTOR) }
        assertThat(find(EMAIL_HELP_SELECTOR).text).isEqualTo(errorMessage)
    }

    fun assertDisabledSubmitButtonWhenWrongCredentials(fullName: String, email: String, password: String) {
        signUpWith(fullName, email, password)
        assertThat(find(SUBMIT_BUTTON_SELECTOR).getAttribute("disabled")).isEqualTo("true")
    }

    companion object {
        const val NAME_INPUT_SELECTOR = "#name_input"
        const val EMAIL_INPUT_SELECTOR = "#email_input"
        const val PASSWORD_INPUT_SELECTOR = "#password_input"
        const val SIGN_UP_FORM_SELECTOR = ".signup-form"

        const val SIGN_UP_LINK_SELECTOR = "a[href='/signup']"
    }
}