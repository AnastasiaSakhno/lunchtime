package com.anahoret.lunchtime.features.regular

import com.anahoret.lunchtime.config.social.SocialSignInAdapter
import com.anahoret.lunchtime.features.BaseFeatureTest
import org.ajbrown.namemachine.NameGenerator
import org.joda.time.LocalDate
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.openqa.selenium.By.cssSelector
import org.springframework.test.context.TestPropertySource
import org.springframework.test.context.junit4.SpringRunner
import java.util.*

@RunWith(SpringRunner::class)
@TestPropertySource(properties = ["username=test1@anadeainc.com"])
class UserDayMenuTableTests : BaseFeatureTest() {

    @Test
    fun shouldLoadTableUntilTimeout() {
        fluentUtils.waitFor { cssSelector(USER_DAY_MENU_SELECT) }
        fluentUtils.waitFor { cssSelector(USERS_MENU_SHEET_TABLE_SUMMARY) }
        val date = rootPage.nextWeek()
        rootPage.prevWeek(date)
    }

    override fun setupInitialData() {
        super.setupInitialData()

        val loft = createRestaurant(1, "Loft", "пр. Яворницкого, 50", false)
        val leGrand = createRestaurant(2, "LeGrand", "пр. Яворницкого, 50", false)
        val noneMenu = createMenu(1, "None", null, false, null)
        createMenu(2, "Loft", null, false, loft)
        createMenu(3, "Loft рыба", "THU", false, loft)
        createMenu(4, "LeGrand", null, false, leGrand)

        repeat(100) { ui ->
            val user = createUser("test$ui@${SocialSignInAdapter.DOMAIN}", generatedFullName(), setOf(ROLE_REGULAR))
            repeat(2) { wi ->
                repeat(5) { udmi ->
                    val id = ((wi + 1) * (ui + 1) * udmi).toLong()
                    val menu = randomMenu()
                    val date = LocalDate().plusWeeks(wi).withDayOfWeek(udmi + 1)
                    val out = if (noneMenu.id == menu.id) false else Random().nextBoolean()
                    createUdm(id, user, menu, date, out)
                }
            }
        }
    }

    private fun generatedFullName() =
        NameGenerator().generateName().let { "${it.firstName} ${it.lastName}" }

    private fun randomMenu() = menuRepository.findAll().toList().get(Random().nextInt(4))
}
