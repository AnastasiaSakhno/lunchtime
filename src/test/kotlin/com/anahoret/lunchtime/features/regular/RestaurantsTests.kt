package com.anahoret.lunchtime.features.regular

import com.anahoret.lunchtime.features.BaseFeatureTest
import com.anahoret.lunchtime.features.pages.RestaurantsPage
import org.assertj.core.api.Assertions.assertThat
import org.junit.Test
import org.junit.runner.RunWith
import org.openqa.selenium.By.cssSelector
import org.springframework.test.context.junit4.SpringRunner

@RunWith(SpringRunner::class)
class RestaurantsTests : BaseFeatureTest() {
    @Test
    fun cannotView() {
        rootPage.loginWith(FIRST_REGULAR_USER_EMAIL, FIRST_REGULAR_USER_PASSWORD)
        fluentUtils.waitFor { cssSelector(NEXT_WEEK_LINK_SELECTOR) }
        assertThat(find(RestaurantsPage.LINK_SELECTOR)).isEmpty()
    }

    override fun setupInitialData() {
        super.setupInitialData()
        createUser(FIRST_REGULAR_USER_FULL_NAME, FIRST_REGULAR_USER_EMAIL, FIRST_REGULAR_USER_PASSWORD_ENCRYPTED, Role.ROLE_REGULAR)
    }
}
