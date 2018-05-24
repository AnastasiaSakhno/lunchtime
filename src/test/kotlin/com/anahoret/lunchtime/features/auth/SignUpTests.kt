package com.anahoret.lunchtime.features.auth

import com.anahoret.lunchtime.features.BaseFeatureTest
import com.anahoret.lunchtime.features.pages.SignUpPage.Companion.FORM_SELECTOR
import org.assertj.core.api.Assertions.assertThat
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.openqa.selenium.By.*
import org.springframework.test.context.junit4.SpringRunner

@RunWith(SpringRunner::class)
class SignUpTests : BaseFeatureTest() {
    private val signUpPage = rootPage.getSignUpPage()

    @Before
    fun goToSignUp() {
        signUpPage.navigate()
    }

    @Test
    fun hasSignUpForm() {
        assertThat(find(FORM_SELECTOR)).isNotEmpty
        assertThat(find(NAME_INPUT_SELECTOR)).isNotEmpty
        assertThat(find(EMAIL_INPUT_SELECTOR)).isNotEmpty
        assertThat(find(PASSWORD_INPUT_SELECTOR)).isNotEmpty
        assertThat(find(SUBMIT_BUTTON_SELECTOR)).isNotEmpty
    }

    @Test
    fun canSignUpWithRightCredentials() {
        signUpPage.signUpWith(NEW_FULL_NAME, NEW_EMAIL, NEW_PASSWORD)
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

    fun wrongSignUpAssert(fullName: String, email: String, password: String, errorMessage: String) {
        signUpPage.signUpWith(fullName, email, password)
        fluentUtils.waitFor { cssSelector(EMAIL_HELP_SELECTOR) }
        assertThat(find(EMAIL_HELP_SELECTOR).text).isEqualTo(errorMessage)
    }

    fun assertDisabledSubmitButtonWhenWrongCredentials(fullName: String, email: String, password: String) {
        signUpPage.signUpWith(fullName, email, password)
        assertThat(find(SUBMIT_BUTTON_SELECTOR).getAttribute("disabled")).isEqualTo("true")
    }
}
