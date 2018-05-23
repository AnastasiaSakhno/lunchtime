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
class RestaurantsTests : BaseFeatureTest() {
    private val restaurantsPage= rootPage.getRestaurantsPage()

    @Before
    fun loginAndNavigate() {
        restaurantsPage.loginAndNavigate()

        fluentUtils.waitFor { cssSelector("table") }
    }

    @Test
    fun canCreate() {
        assertThat(find(TABLE_ROW_SELECTOR).count()).isEqualTo(4)
        restaurantsPage.submit("Пузата хата", "ул. Глинки, 1")
        assertThat(find(TABLE_ROW_SELECTOR).count()).isEqualTo(5)
    }

    @Test
    fun archiveIsShownAsCrossedOut() {
        assertThat(findFirst("del").text).isEqualTo("Mendis")
        assertThat(find(TABLE_ROW_SELECTOR)[3].find(".fa-remove")).isEmpty()
    }

    @Test
    fun canDelete() {
        find(".fa-remove").first().click()
        fluentUtils.waitFor { xpath("//td/del[contains(text(), 'Loft')]") }
    }

    override fun setupInitialData() {
        super.setupInitialData()
        createUser(FIRST_REGULAR_USER_FULL_NAME, FIRST_REGULAR_USER_EMAIL, FIRST_REGULAR_USER_PASSWORD_ENCRYPTED, Role.ROLE_REGULAR)
        createRestaurant(1, "Loft", "пр. Яворницкого, 50", false)
        createRestaurant(2, "LeGrand", "пр. Яворницкого, 50", false)
        createRestaurant(3, "Primus", "ул. Баррикадная, 1", false)
        createRestaurant(4, "Mendis", "ул. Шолом Алейхема, 4/26", true)
    }
}
