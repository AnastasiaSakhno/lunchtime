package com.anahoret.lunchtime.features.regular

import com.anahoret.lunchtime.domain.Role
import com.anahoret.lunchtime.features.BaseFeatureTest
import com.anahoret.lunchtime.features.pages.UsersPage
import org.assertj.core.api.Assertions.assertThat
import org.junit.Test
import org.junit.runner.RunWith
import org.openqa.selenium.By.*
import org.springframework.test.context.junit4.SpringRunner

@RunWith(SpringRunner::class)
class UsersTests : BaseFeatureTest() {
    @Test
    fun canViewOnly() {
        rootPage.getUsersPage().loginAndNavigate(FIRST_REGULAR_USER_EMAIL, FIRST_REGULAR_USER_PASSWORD)

        assertThat(find(TABLE_ROW_SELECTOR).count()).isEqualTo(2)
        assertThat(find(UsersPage.FORM_SELECTOR)).isEmpty()
    }

    override fun setupInitialData() {
        super.setupInitialData()
        createUser(FIRST_REGULAR_USER_FULL_NAME, FIRST_REGULAR_USER_EMAIL, FIRST_REGULAR_USER_PASSWORD_ENCRYPTED, Role.ROLE_REGULAR)
    }
}
