package com.anahoret.lunchtime.features.admin

import com.anahoret.lunchtime.domain.Role
import com.anahoret.lunchtime.features.BaseFeatureTest
import com.anahoret.lunchtime.features.pages.RootPage.Companion.DAY_STATUS_MANAGEABLE
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
        rootPage.loginAsAdmin()
        fluentUtils.waitFor { cssSelector(USERS_MENU_SHEET) }
    }

    @Test
    fun canEditAllUsers() {
        assertThat(find(USER_DAY_MENU_SELECT).count())
            .isEqualTo(rootPage.expectedUserDayMenuSelectCount(2))
    }

    @Test
    fun canCloseDays() {
        assertThat(find(USER_DAY_MENU_SELECT).count())
            .isEqualTo(rootPage.expectedUserDayMenuSelectCount(2, 5))
        rootPage.closeDay(4)
        assertThat(find(USER_DAY_MENU_SELECT).count())
            .isEqualTo(rootPage.expectedUserDayMenuSelectCount(2, 4))
        find(USERS_MENU_SHEET_TABLE_ROW).forEach {
            assertThat(it.find(USER_DAY_MENU_READONLY)).isNotEmpty
        }
    }

    @Test
    fun canReopenDays() {
        val index = 0
        rootPage.closeDay(index)
        assertThat(find(DAY_STATUS_MANAGEABLE)[index].text).isEqualTo("Reopen")
        rootPage.reopenDay(index)
        assertThat(find(DAY_STATUS_MANAGEABLE)[index].text).isEqualTo("Close")
    }

    @Test
    fun cannotEditInThePast() {
        rootPage.prevWeek()
        assertThat(find(USER_DAY_MENU_SELECT)).isEmpty()
    }

    @Test
    fun destroyPreviousUserDayMenu() {
        val date = LocalDate()
        click(PREV_WEEK_LINK_SELECTOR)
        rootPage.waitForDate(date.plusWeeks(-1))
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
