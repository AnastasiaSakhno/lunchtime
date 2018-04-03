package com.anahoret.lunchtime

import org.openqa.selenium.By
import org.openqa.selenium.WebDriver
import org.openqa.selenium.support.ui.ExpectedConditions.*
import org.openqa.selenium.support.ui.WebDriverWait

class FluentUtils(private val webDriver: WebDriver) {
    fun waitForClass(className: String, timeout: Long = TIME_OUT_SECONDS) {
        val wait = WebDriverWait(webDriver, timeout)
        wait.until(visibilityOfElementLocated(By.className(className)))
    }

    fun waitForId(id: String, timeout: Long = TIME_OUT_SECONDS) {
        val wait = WebDriverWait(webDriver, timeout)
        wait.until(visibilityOfElementLocated(By.id(id)))
    }

    companion object {
        const val TIME_OUT_SECONDS = 5L
    }
}
