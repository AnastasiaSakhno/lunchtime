package com.anahoret.lunchtime.features.admin

import com.anahoret.lunchtime.features.BaseFeatureTest
import org.assertj.core.api.Assertions.assertThat
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.openqa.selenium.By.cssSelector
import org.openqa.selenium.By.xpath
import org.springframework.test.context.TestPropertySource
import org.springframework.test.context.junit4.SpringRunner

@RunWith(SpringRunner::class)
@TestPropertySource(properties = ["username=admin@anadeainc.com"])
class MenuTests : BaseFeatureTest() {
    private val menuPage= rootPage.getMenuPage()

    @Before
    fun loginAndNavigate() {
        menuPage.navigate()

        fluentUtils.waitFor { cssSelector("table") }
    }

    @Test
    fun canCreate() {
        assertThat(find(TABLE_ROW_SELECTOR).count()).isEqualTo(5)
        menuPage.submit("Loft", "Loft мясо", "THU")
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
        val loft = createRestaurant(1, "Loft", "пр. Яворницкого, 50", false)
        val leGrand = createRestaurant(2, "LeGrand", "пр. Яворницкого, 50", false)
        val mendis = createRestaurant(3, "Mendis", "ул. Шолом Алейхема, 4/26", true)
        createMenu(1, "None", null, false, null)
        createMenu(2, "Loft", null, false, loft)
        createMenu(3, "Loft рыба", "THU", false, loft)
        createMenu(4, "LeGrand", null, false, leGrand)
        createMenu(5, "Mendis", null, true, mendis)
    }
}
