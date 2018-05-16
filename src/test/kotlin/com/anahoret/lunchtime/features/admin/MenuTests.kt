package com.anahoret.lunchtime.features.admin

import com.anahoret.lunchtime.domain.Role
import com.anahoret.lunchtime.features.BaseFeatureTest
import org.assertj.core.api.Assertions.assertThat
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.openqa.selenium.By.cssSelector
import org.openqa.selenium.By.xpath
import org.springframework.test.context.junit4.SpringRunner

@RunWith(SpringRunner::class)
class MenuTests : BaseFeatureTest() {
    @Before
    fun loginAndNavigate() {
        rootPage.getMenuPage().loginAndNavigate()

        fluentUtils.waitFor { cssSelector("table") }
    }

    @Test
    fun canCreate() {
        assertThat(find(TABLE_ROW_SELECTOR).count()).isEqualTo(5)
        fillSelect(RESTAURANT_INPUT_SELECTOR).withText("Loft")
        fill(NAME_INPUT_SELECTOR).with("Loft мясо")
        fill(WEEK_DAYS_INPUT_SELECTOR).with("THU")
        submit(MENU_FORM_SELECTOR)
        fluentUtils.waitFor { xpath("//td[contains(text(),'Loft мясо')]") }
        assertThat(find(TABLE_ROW_SELECTOR).count()).isEqualTo(6)
    }

    @Test
    fun archiveIsShownAsCrossedOut() {
        assertThat(findFirst("del").text).isEqualTo("Mendis")
        assertThat(find(TABLE_ROW_SELECTOR)[4].find(".fa-remove")).isEmpty()
    }

    @Test
    fun canDelete() {
        find(".fa-remove").last().click()
        fluentUtils.waitFor { xpath("//td/del[contains(text(), 'LeGrand')]") }
    }

    override fun setupInitialData() {
        super.setupInitialData()
        createUser(FIRST_REGULAR_USER_FULL_NAME, FIRST_REGULAR_USER_EMAIL, FIRST_REGULAR_USER_PASSWORD_ENCRYPTED, Role.ROLE_REGULAR)
        val loft = createRestaurant(1, "Loft", "пр. Яворницкого, 50", false)
        val leGrand = createRestaurant(2, "LeGrand", "пр. Яворницкого, 50", false)
        val mendis = createRestaurant(3, "Mendis", "ул. Шолом Алейхема, 4/26", true)
        createMenu(1, "None", null, false, null)
        createMenu(2, "Loft", null, false, loft)
        createMenu(3, "Loft рыба", "THU", false, loft)
        createMenu(4, "LeGrand", null, false, leGrand)
        createMenu(5, "Mendis", null, true, mendis)
    }

    companion object {
        const val MENU_FORM_SELECTOR = ".menu-form"
        const val WEEK_DAYS_INPUT_SELECTOR = "#week_days_input"
        const val RESTAURANT_INPUT_SELECTOR = "#restaurant_input"
    }
}
