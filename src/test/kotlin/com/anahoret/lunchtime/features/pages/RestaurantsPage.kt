package com.anahoret.lunchtime.features.pages

import org.fluentlenium.adapter.FluentTest

class RestaurantsPage(fluentTest: FluentTest) : Page(fluentTest) {
    override fun navigate() {
        navigate(LINK_SELECTOR)
    }

    companion object {
        const val LINK_SELECTOR = "a[href='/admin/restaurants']"
    }
}
