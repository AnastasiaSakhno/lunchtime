package com.anahoret.lunchtime.features.regular

import com.anahoret.lunchtime.features.BaseFeatureTest
import com.anahoret.lunchtime.features.pages.UsersPage
import org.assertj.core.api.Assertions.assertThat
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.test.context.junit4.SpringRunner

@RunWith(SpringRunner::class)
class UsersTests : BaseFeatureTest() {
    @Test
    fun canViewOnly() {
        rootPage.getUsersPage().navigate()

        assertThat(find(TABLE_ROW_SELECTOR).count()).isEqualTo(2)
        assertThat(find(UsersPage.FORM_SELECTOR)).isEmpty()
    }
}
