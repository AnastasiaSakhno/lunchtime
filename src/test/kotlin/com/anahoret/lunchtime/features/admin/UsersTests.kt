package com.anahoret.lunchtime.features.admin

import com.anahoret.lunchtime.features.BaseFeatureTest
import org.assertj.core.api.Assertions.assertThat
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.test.context.junit4.SpringRunner

@RunWith(SpringRunner::class)
class UsersTests : BaseFeatureTest() {
    private val usersPage = rootPage.getUsersPage()

    @Test
    fun canCreate() {
        usersPage.loginAndNavigate()

        assertThat(find(TABLE_ROW_SELECTOR).count()).isEqualTo(2)

        usersPage.submitForm(NEW_FULL_NAME, NEW_EMAIL)

        assertThat(find(TABLE_ROW_SELECTOR).count()).isEqualTo(3)
    }

    override fun setupInitialData() {
        super.setupInitialData()
        createUser(FIRST_REGULAR_USER_FULL_NAME, FIRST_REGULAR_USER_EMAIL, FIRST_REGULAR_USER_PASSWORD_ENCRYPTED, Role.ROLE_REGULAR)
    }
}
