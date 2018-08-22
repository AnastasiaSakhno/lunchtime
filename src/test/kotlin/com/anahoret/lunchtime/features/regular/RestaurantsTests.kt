package com.anahoret.lunchtime.features.regular

import com.anahoret.lunchtime.features.BaseFeatureTest
import com.anahoret.lunchtime.features.pages.RestaurantsPage
import org.assertj.core.api.Assertions.assertThat
import org.junit.Test
import org.junit.runner.RunWith
import org.openqa.selenium.By.cssSelector
import org.springframework.test.context.TestPropertySource
import org.springframework.test.context.junit4.SpringRunner

@RunWith(SpringRunner::class)
@TestPropertySource(properties = ["username=test1@anadeainc.com"])
class RestaurantsTests : BaseFeatureTest() {
    @Test
    fun cannotView() {
        fluentUtils.waitFor { cssSelector(USER_DAY_MENU_SELECT) }
        assertThat(find(RestaurantsPage.LINK_SELECTOR)).isEmpty()
    }

    override fun setupInitialData() {
        super.setupInitialData()
        createUser(FIRST_REGULAR_USER_EMAIL, FIRST_REGULAR_USER_FULL_NAME, setOf(ROLE_REGULAR))
    }
}
