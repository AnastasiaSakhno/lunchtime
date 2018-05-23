package com.anahoret.lunchtime.features.pages

import com.anahoret.lunchtime.features.BaseFeatureTest
import com.anahoret.lunchtime.features.common.UserDayMenuTests
import org.apache.commons.lang3.time.DateFormatUtils
import org.fluentlenium.adapter.FluentTest
import org.joda.time.LocalDate
import org.openqa.selenium.By

class RootPage(fluentTest: FluentTest, private val serverPort: Int) : Page(fluentTest) {
    fun getRestaurantsPage() = RestaurantsPage(fluentTest)
    fun getUsersPage() = UsersPage(fluentTest)
    fun getMenuPage() = MenuPage(fluentTest)
    fun getMenuDocumentsPage() = MenuDocumentsPage(fluentTest)

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

    fun prevWeek() {
        val date = LocalDate()
        waitForDate(date)
        fluentTest.click(BaseFeatureTest.PREV_WEEK_LINK_SELECTOR)
        waitForDate(date.plusWeeks(-1))
    }

    fun waitForDate(date: LocalDate) =
        fluentUtils.waitFor { By.xpath("//div[contains(text(), '${DateFormatUtils.format(date.toDate(), UserDayMenuTests.DATE_FORMAT_PATTERN)}')]") }

    fun expectedUserDayMenuSelectCount(usersCount: Int, openDays: Int = 5) =
        usersCount * (openDays - LocalDate().dayOfWeek + 1)

    companion object {
        const val DAY_STATUS_MANAGEABLE = ".day-status_manageable"
    }
}
