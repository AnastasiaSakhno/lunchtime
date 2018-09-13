package com.anahoret.lunchtime.features.pages

import com.anahoret.lunchtime.features.BaseFeatureTest
import org.fluentlenium.adapter.FluentTest
import org.openqa.selenium.By

class RestaurantsPage(fluentTest: FluentTest) : Page(fluentTest) {
    override fun navigate() {
        navigate(LINK_SELECTOR)
    }

    fun submit(name: String, address: String) {
        fluentTest.fill(BaseFeatureTest.NAME_INPUT_SELECTOR).with(name)
        fluentTest.fill(ADDRESS_INPUT_SELECTOR).with(address)
        fluentTest.submit(FORM_SELECTOR)
        fluentUtils.waitFor { By.xpath("//td[contains(text(),'$name')]") }
    }

    companion object {
        const val LINK_SELECTOR = "li[href='/admin/restaurants']"
        const val FORM_SELECTOR = ".restaurant-form"
        const val ADDRESS_INPUT_SELECTOR = "#address_input"
    }
}
