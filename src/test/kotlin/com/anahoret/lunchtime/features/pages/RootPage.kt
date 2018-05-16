package com.anahoret.lunchtime.features.pages

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

    fun waitForDate(date: LocalDate) =
        fluentUtils.waitFor { By.xpath("//div[contains(text(), '${DateFormatUtils.format(date.toDate(), UserDayMenuTests.DATE_FORMAT_PATTERN)}')]") }

    fun expectedUserDayMenuSelectCount(usersCount: Int, openDays: Int = 5) =
        usersCount * (openDays - LocalDate().dayOfWeek + 1)
}
