package com.anahoret.lunchtime.features.pages

import com.anahoret.lunchtime.FluentUtils
import com.anahoret.lunchtime.features.BaseFeatureTest
import org.fluentlenium.adapter.FluentTest
import org.openqa.selenium.By

abstract class Page(val fluentTest: FluentTest) {
    val fluentUtils: FluentUtils = FluentUtils(fluentTest.defaultDriver)

    fun loginAndNavigate(email: String = BaseFeatureTest.ADMIN_EMAIL, password: String = BaseFeatureTest.ADMIN_PASSWORD) {
        loginWith(email, password)
        navigate()
    }

    abstract fun navigate()

    fun navigate(linkSelector: String) {
        fluentUtils.waitFor { By.cssSelector(linkSelector) }
        fluentTest.click(linkSelector)
    }

    fun loginAsAdmin() = loginWith(BaseFeatureTest.ADMIN_EMAIL, BaseFeatureTest.ADMIN_PASSWORD)

    fun loginWith(email: String, password: String) {
        fluentTest.fill(BaseFeatureTest.EMAIL_INPUT_SELECTOR).with(email)
        fluentTest.fill(BaseFeatureTest.PASSWORD_INPUT_SELECTOR).with(password)
        fluentTest.submit(BaseFeatureTest.LOGIN_FORM_SELECTOR)
    }
}
