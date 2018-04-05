package com.anahoret.lunchtime

import org.openqa.selenium.By
import org.openqa.selenium.WebDriver
import org.openqa.selenium.support.ui.ExpectedConditions.*
import org.openqa.selenium.support.ui.WebDriverWait

class FluentUtils(private val webDriver: WebDriver) {
    fun waitFor(timeout: Long = TIME_OUT_SECONDS, method: () -> By) {
        val wait = WebDriverWait(webDriver, timeout)
        wait.until(visibilityOfElementLocated(method()))
    }

    companion object {
        const val TIME_OUT_SECONDS = 5L
    }
}
