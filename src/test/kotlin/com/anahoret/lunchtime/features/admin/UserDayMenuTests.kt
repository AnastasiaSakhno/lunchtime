package com.anahoret.lunchtime.features.admin

import com.anahoret.lunchtime.domain.Role
import com.anahoret.lunchtime.features.BaseFeatureTest
import org.assertj.core.api.Assertions.assertThat
import org.joda.time.LocalDate
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.openqa.selenium.By.cssSelector
import org.openqa.selenium.By.xpath
import org.springframework.test.context.junit4.SpringRunner

@RunWith(SpringRunner::class)
class UserDayMenuTests : BaseFeatureTest() {
    @Before
    fun loginAndNavigate() {
        loginAsAdmin()
        fluentUtils.waitFor { cssSelector(USERS_MENU_SHEET) }
    }

    @Test
    fun canEditAllUsers() {
        assertThat(find(USER_DAY_MENU_SELECT).count()).isEqualTo(expectedUserDayMenuSelectCount(2))
    }

    @Test
    fun canCloseDays() {
        assertThat(find(USER_DAY_MENU_SELECT).count()).isEqualTo(expectedUserDayMenuSelectCount(2, 5))
        find(".day-status_manageable").last().click()
        Thread.sleep(1500)
        assertThat(find(USER_DAY_MENU_SELECT).count()).isEqualTo(expectedUserDayMenuSelectCount(2, 4))
        assertThat(find(USERS_MENU_SHEET_TABLE_ROW).first().find(USER_DAY_MENU_READONLY)).isNotEmpty
        assertThat(find(USERS_MENU_SHEET_TABLE_ROW).last().find(USER_DAY_MENU_READONLY)).isNotEmpty
    }

    @Test
    fun canReopenDays() {
        find(".day-status_manageable")[1].click()
        fluentUtils.waitFor { xpath("//span[text()='Reopen']") }
        find(".day-status_manageable")[1].click()
        Thread.sleep(1500)
        assertThat(find(".day-status_manageable")[1].text).isEqualTo("Close")
    }

    @Test
    fun cannotEditInThePast() {
        val date = LocalDate()
        waitForDate(date)
        click(PREV_WEEK_LINK_SELECTOR)
        waitForDate(date.plusWeeks(-1))
        assertThat(find(USER_DAY_MENU_SELECT)).isEmpty()
    }

    @Test
    fun destroyPreviousUserDayMenu() {
        val date = LocalDate()
        click(PREV_WEEK_LINK_SELECTOR)
        waitForDate(date.plusWeeks(-1))
        fluentUtils.waitFor { xpath("//div[text()='LeGrand']") }
        click(NEXT_WEEK_LINK_SELECTOR)
        click(".destroy-old-udm")
        val alert = webDriver.switchTo().alert()
        alert.accept()
        click(PREV_WEEK_LINK_SELECTOR)
        fluentUtils.waitForInvisibility { xpath("//div[text()='LeGrand']") }
        click(PREV_WEEK_LINK_SELECTOR)
        fluentUtils.waitForInvisibility { xpath("//div[text()='LeGrand']") }
        click(NEXT_WEEK_LINK_SELECTOR)
        click(NEXT_WEEK_LINK_SELECTOR)
        fluentUtils.waitFor { xpath("//div[contains(text(),'Loft 1')]") }
        click(NEXT_WEEK_LINK_SELECTOR)
        fluentUtils.waitFor { xpath("//div[contains(text(),'Loft рыба 1')]") }
    }

    override fun setupInitialData() {
        super.setupInitialData()
        val user = createUser(FIRST_REGULAR_USER_FULL_NAME, FIRST_REGULAR_USER_EMAIL, FIRST_REGULAR_USER_PASSWORD_ENCRYPTED, Role.ROLE_REGULAR)
        val loft = createRestaurant(1, "Loft", "пр. Яворницкого, 50", false)
        val leGrand = createRestaurant(2, "LeGrand", "пр. Яворницкого, 50", false)
        createMenu(1, "None", null, false, null)
        val loftMenu = createMenu(2, "Loft", null, false, loft)
        val loftFishMenu = createMenu(3, "Loft рыба", "THU", false, loft)
        val legrandMenu = createMenu(4, "LeGrand", null, false, leGrand)
        createUdm(1, user, legrandMenu, LocalDate().plusWeeks(-2))
        createUdm(2, user, legrandMenu, LocalDate().plusWeeks(-1))
        createUdm(3, user, loftMenu, LocalDate())
        createUdm(4, user, loftFishMenu, LocalDate().plusWeeks(1))
    }
}
