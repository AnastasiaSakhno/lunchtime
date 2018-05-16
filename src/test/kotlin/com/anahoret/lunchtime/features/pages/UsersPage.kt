package com.anahoret.lunchtime.features.pages

import com.anahoret.lunchtime.features.BaseFeatureTest
import org.fluentlenium.adapter.FluentTest
import org.openqa.selenium.By

class UsersPage(fluentTest: FluentTest) : Page(fluentTest) {
    override fun navigate() {
        navigate(LINK_SELECTOR)
    }

    fun submitForm(fullName: String, email: String) {
        fluentTest.fill(BaseFeatureTest.NAME_INPUT_SELECTOR).with(fullName)
        fluentTest.fill(BaseFeatureTest.EMAIL_INPUT_SELECTOR).with(email)
        fluentTest.submit(FORM_SELECTOR)
        fluentUtils.waitFor { By.xpath("//td[contains(text(),'$fullName')]") }
    }

    companion object {
        const val LINK_SELECTOR = "a[href='/admin/users']"
        const val FORM_SELECTOR = ".user-form"
    }
}
