package com.anahoret.lunchtime.features.pages

import com.anahoret.lunchtime.FluentUtils
import org.fluentlenium.adapter.FluentTest
import org.openqa.selenium.By

abstract class Page(val fluentTest: FluentTest) {
    val fluentUtils: FluentUtils = FluentUtils(fluentTest.defaultDriver)

    abstract fun navigate()

    fun navigate(linkSelector: String) {
        fluentUtils.waitFor { By.cssSelector(linkSelector) }
        fluentTest.click(linkSelector)
    }
}
