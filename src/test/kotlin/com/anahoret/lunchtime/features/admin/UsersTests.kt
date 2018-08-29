package com.anahoret.lunchtime.features.admin

import com.anahoret.lunchtime.features.BaseFeatureTest
import com.anahoret.lunchtime.features.pages.UsersPage
import org.assertj.core.api.Assertions.assertThat
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.test.context.TestPropertySource
import org.springframework.test.context.junit4.SpringRunner

@RunWith(SpringRunner::class)
@TestPropertySource(properties = ["username=admin@anadeainc.com"])
class UsersTests : BaseFeatureTest() {
    @Test
    fun canView() {
        rootPage.getUsersPage().navigate()

        assertThat(find(TABLE_ROW_SELECTOR).count()).isEqualTo(2)
        assertThat(find(UsersPage.FORM_SELECTOR)).isEmpty()
    }

    override fun setupInitialData() {
        super.setupInitialData()
        createUser(FIRST_REGULAR_USER_EMAIL, FIRST_REGULAR_USER_FULL_NAME, setOf(ROLE_REGULAR))
    }
}
