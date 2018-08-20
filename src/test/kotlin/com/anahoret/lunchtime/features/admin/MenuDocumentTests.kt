package com.anahoret.lunchtime.features.admin

import com.anahoret.lunchtime.features.BaseFeatureTest
import org.assertj.core.api.Assertions.assertThat
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.openqa.selenium.By.cssSelector
import org.openqa.selenium.By.xpath
import org.springframework.test.context.TestPropertySource
import org.springframework.test.context.junit4.SpringRunner

@RunWith(SpringRunner::class)
@TestPropertySource(properties = ["username=admin@anadeainc.com"])
class MenuDocumentTests : BaseFeatureTest() {
    private val menuDocumentsPage= rootPage.getMenuDocumentsPage()

    @Before
    fun init() {
        menuDocumentsPage.navigate()

        fluentUtils.waitFor { cssSelector(MENU_DOCUMENTS_CONTAINER) }
    }

    @Test
    fun canUpload() {
        menuDocumentsPage.upload("legrand", "documents/restaurants/LeGrand/lunches.docx")
        fluentUtils.waitFor { xpath("//strong[text()='Понедельник']") }
        assertThat(findFirst("strong").text).isEqualTo("ОБЕДЫ с 05.02 – 09.02.2018г")
    }

    @Test
    fun cannotUploadArchivedRestaurant() {
        assertThat(find(".menu-document-form-mendis input[type='file']")).isEmpty()
    }

    override fun setupInitialData() {
        super.setupInitialData()
        createRestaurant(1, "Loft", "пр. Яворницкого, 50", false)
        createRestaurant(2, "LeGrand", "пр. Яворницкого, 50", false)
        createRestaurant(3, "Primus", "ул. Баррикадная, 1", false)
        createRestaurant(4, "Mendis", "ул. Шолом Алейхема, 4/26", true)
    }
}
