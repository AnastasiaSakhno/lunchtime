package com.anahoret.lunchtime.features.pages

import com.anahoret.lunchtime.features.BaseFeatureTest
import com.anahoret.lunchtime.features.BaseFeatureTest.Companion.NEXT_WEEK_LINK_SELECTOR
import com.anahoret.lunchtime.features.BaseFeatureTest.Companion.PREV_WEEK_LINK_SELECTOR
import com.anahoret.lunchtime.features.common.UserDayMenuTests
import org.apache.commons.lang3.time.DateFormatUtils
import org.fluentlenium.adapter.FluentTest
import org.joda.time.LocalDate
import org.openqa.selenium.By
import java.lang.Math.abs

class RootPage(fluentTest: FluentTest, private val serverPort: Int) : Page(fluentTest) {
    fun getRestaurantsPage() = RestaurantsPage(fluentTest)
    fun getUsersPage() = UsersPage(fluentTest)
    fun getMenuPage() = MenuPage(fluentTest)
    fun getMenuDocumentsPage() = MenuDocumentsPage(fluentTest)
    fun getSignUpPage() = SignUpPage(fluentTest)

    override fun navigate() {
        fluentTest.goTo("http://localhost:$serverPort")
    }

    fun closeDay(index: Int) {
        fluentTest.find(".day-status_manageable_open")[index].click()
        Thread.sleep(1500)
    }

    fun reopenDay(index: Int) {
        fluentTest.find(".day-status_manageable")[index].click()
        Thread.sleep(1500)
    }

    fun destroyOldUdm() {
        fluentTest.click(".destroy-old-udm")
        val alert = fluentTest.driver.switchTo().alert()
        alert.accept()
    }

    fun prevWeek(date: LocalDate = LocalDate()): LocalDate = navigateToWeeksPlus(date, -1)

    fun nextWeek(date: LocalDate = LocalDate()): LocalDate = navigateToWeeksPlus(date, 1)

    fun navigateToWeeksPlus(date: LocalDate, weeks: Int): LocalDate {
        waitForDate(date)
        val sign = weeks / abs(weeks)
        for (i in 1..weeks * sign) {
            fluentTest.click(if(weeks < 0) PREV_WEEK_LINK_SELECTOR else NEXT_WEEK_LINK_SELECTOR)
            waitForDate(date.plusWeeks(i * sign))
        }
        return date.plusWeeks(weeks)
    }

    fun fillDay(day: String, menu: String) {
        fluentTest.fillSelect(".user-day-menu-$day ${BaseFeatureTest.USER_DAY_MENU_SELECT}").withText(menu)
        Thread.sleep(1500)
    }

    fun clickDayOut(day: String) {
        fluentTest.click(".user-day-menu-$day .user-day-menu-out-input")
    }

    private fun waitForDate(date: LocalDate) =
        fluentUtils.waitFor { By.xpath("//div[contains(text(), '${DateFormatUtils.format(date.toDate(), UserDayMenuTests.DATE_FORMAT_PATTERN)}')]") }

    fun expectedUserDayMenuSelectCount(usersCount: Int, openDays: Int = 5) =
        usersCount * (openDays - LocalDate().dayOfWeek + 1)

    companion object {
        const val DAY_STATUS_MANAGEABLE = ".day-status_manageable"
    }
}
