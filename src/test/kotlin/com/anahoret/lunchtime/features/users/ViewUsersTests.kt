package com.anahoret.lunchtime.features.users

import com.anahoret.lunchtime.domain.Role
import com.anahoret.lunchtime.features.BaseFeatureTest
import org.assertj.core.api.Assertions.assertThat
import org.junit.Test
import org.junit.runner.RunWith
import org.openqa.selenium.By.*
import org.springframework.test.context.junit4.SpringRunner

@RunWith(SpringRunner::class)
class ViewUsersTests : BaseFeatureTest() {
    @Test
    fun regularUserCanViewOnly() {
        loginWith(FIRST_REGULAR_USER_EMAIL, FIRST_REGULAR_USER_PASSWORD)
        fluentUtils.waitFor { cssSelector("a[href='/admin/users']") }
        find("a[href='/admin/users']").click()
        assertThat(find("table tbody tr").count()).isEqualTo(3)
        assertThat(find(USERS_FORM_SELECTOR)).isEmpty()
    }

    @Test
    fun adminCanSeeUsersForm() {
        loginAsAdmin()
        fluentUtils.waitFor { cssSelector("a[href='/admin/users']") }
        find("a[href='/admin/users']").click()
        assertThat(find("#name_input")).isNotEmpty
    }

    @Test
    fun adminCanAddNewUsers() {
        loginAsAdmin()
        fluentUtils.waitFor { cssSelector("a[href='/admin/users']") }
        find("a[href='/admin/users']").click()
        assertThat(find("table tbody tr").count()).isEqualTo(3)
        fill("#name_input").with(NEW_FULL_NAME)
        fill("#email_input").with(NEW_EMAIL)
        submit(USERS_FORM_SELECTOR)
        fluentUtils.waitFor { xpath("//td[contains(text(),'$NEW_FULL_NAME')]") }
        assertThat(find("table tbody tr").count()).isEqualTo(4)
    }

    override fun setupInitialData() {
        super.setupInitialData()
        createUser(FIRST_REGULAR_USER_FULL_NAME, FIRST_REGULAR_USER_EMAIL, FIRST_REGULAR_USER_PASSWORD_ENCRYPTED, Role.ROLE_REGULAR)
    }

    companion object {
        const val USERS_FORM_SELECTOR = ".user-form"
    }
}
