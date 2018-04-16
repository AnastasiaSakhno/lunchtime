package com.anahoret.lunchtime

import com.anahoret.lunchtime.features.BaseFeatureTest
import org.assertj.core.api.Assertions
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.test.context.junit4.SpringRunner

@RunWith(SpringRunner::class)
class LunchtimeApplicationTests : BaseFeatureTest() {
	@Test
	fun hasPageBrand() {
		Assertions.assertThat(find(".navbar-brand").text).isEqualTo("Lunch time")
	}
}
