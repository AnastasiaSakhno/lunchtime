package com.anahoret.lunchtime.features.pages

import org.fluentlenium.adapter.FluentTest

class SignUpPage(fluentTest: FluentTest) : Page(fluentTest) {
    override fun navigate() {
        navigate(LINK_SELECTOR)
    }

    fun signUpWith(fullName: String, email: String, password: String) {
        fluentTest.fill(NAME_INPUT_SELECTOR).with(fullName)
        fluentTest.fill(EMAIL_INPUT_SELECTOR).with(email)
        fluentTest.fill(PASSWORD_INPUT_SELECTOR).with(password)
        fluentTest.submit(FORM_SELECTOR)
    }

    companion object {
        const val LINK_SELECTOR = "a[href='/signup']"
        const val NAME_INPUT_SELECTOR = "#name_input"
        const val EMAIL_INPUT_SELECTOR = "#email_input"
        const val PASSWORD_INPUT_SELECTOR = "#password_input"
        const val FORM_SELECTOR = ".signup-form"
    }
}
