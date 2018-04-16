package com.anahoret.lunchtime.features.admin

import com.anahoret.lunchtime.domain.Role
import com.anahoret.lunchtime.features.BaseFeatureTest
import org.assertj.core.api.Assertions.assertThat
import org.junit.Test
import org.junit.runner.RunWith
import org.openqa.selenium.By.*
import org.springframework.test.context.junit4.SpringRunner

@RunWith(SpringRunner::class)
class UsersTests : BaseFeatureTest() {
    @Test
    fun canCreate() {
        loginAndNavigate(USERS_LINK_SELECTOR)

        assertThat(find(TABLE_ROW_SELECTOR).count()).isEqualTo(2)
        fill(NAME_INPUT_SELECTOR).with(NEW_FULL_NAME)
        fill(EMAIL_INPUT_SELECTOR).with(NEW_EMAIL)
        submit(USERS_FORM_SELECTOR)
        fluentUtils.waitFor { xpath("//td[contains(text(),'$NEW_FULL_NAME')]") }
        assertThat(find(TABLE_ROW_SELECTOR).count()).isEqualTo(3)
    }

    override fun setupInitialData() {
        super.setupInitialData()
        createUser(FIRST_REGULAR_USER_FULL_NAME, FIRST_REGULAR_USER_EMAIL, FIRST_REGULAR_USER_PASSWORD_ENCRYPTED, Role.ROLE_REGULAR)
    }

    companion object {
        const val USERS_FORM_SELECTOR = ".user-form"
    }
}
