package com.anahoret.lunchtime.features.pages

import com.anahoret.lunchtime.features.BaseFeatureTest
import org.fluentlenium.adapter.FluentTest
import org.openqa.selenium.By

class MenuPage(fluentTest: FluentTest) : Page(fluentTest) {
    override fun navigate() {
        navigate(LINK_SELECTOR)
    }

    fun submit(restaurantName: String, menuName: String, days: String) {
        fluentTest.fillSelect(RESTAURANT_INPUT_SELECTOR).withText(restaurantName)
        fluentTest.fill(BaseFeatureTest.NAME_INPUT_SELECTOR).with(menuName)
        fluentTest.fill(WEEK_DAYS_INPUT_SELECTOR).with(days)
        fluentTest.submit(MENU_FORM_SELECTOR)
        fluentUtils.waitFor { By.xpath("//td[contains(text(),'$menuName')]") }
    }

    companion object {
        const val LINK_SELECTOR = "li[href='/admin/menu']"
        const val MENU_FORM_SELECTOR = ".menu-form"
        const val WEEK_DAYS_INPUT_SELECTOR = "#week_days_input"
        const val RESTAURANT_INPUT_SELECTOR = "#restaurant_input"
    }
}
