package com.anahoret.lunchtime.features.regular

import com.anahoret.lunchtime.features.BaseFeatureTest
import com.anahoret.lunchtime.features.pages.MenuDocumentsPage.Companion.MENU_DOCUMENT_FORM_SELECTOR
import org.assertj.core.api.Assertions.assertThat
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.openqa.selenium.By.cssSelector
import org.springframework.test.context.junit4.SpringRunner

@RunWith(SpringRunner::class)
class MenuDocumentTests : BaseFeatureTest() {
    @Before
    fun loginAndNavigate() {
        rootPage.getMenuDocumentsPage().navigate()

        fluentUtils.waitFor { cssSelector(MENU_DOCUMENTS_CONTAINER) }
    }

    @Test
    fun canViewOnly() {
        assertThat(find(MENU_DOCUMENT_FORM_SELECTOR)).isEmpty()
    }

    override fun setupInitialData() {
        super.setupInitialData()
        createRestaurant(1, "Loft", "пр. Яворницкого, 50", false)
    }
}
