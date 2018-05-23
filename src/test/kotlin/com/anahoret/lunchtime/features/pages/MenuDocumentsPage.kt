package com.anahoret.lunchtime.features.pages

import org.fluentlenium.adapter.FluentTest
import org.openqa.selenium.By

class MenuDocumentsPage(fluentTest: FluentTest) : Page(fluentTest) {
    override fun navigate() {
        navigate(LINK_SELECTOR)
    }

    fun upload(restaurantName: String, documentPath: String) {
        fluentTest.driver.findElement(By.cssSelector(".menu-document-form-$restaurantName input[type='file']"))
            .sendKeys("${System.getProperty("user.dir")}/$documentPath")
        fluentTest.click(".menu-document-form-$restaurantName input[type='submit']")
    }

    companion object {
        const val LINK_SELECTOR = "a[href='/admin/menu_documents']"
        const val MENU_DOCUMENT_FORM_SELECTOR = ".menu-document-form input[type='submit']"
    }
}
