package com.anahoret.lunchtime.domain

import javax.persistence.*

@Entity
@Table(name = "menu")
class Menu {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    var id: Long? = null

    @Column(name = "name", nullable = false)
    var name: String? = null

    @Column(name = "week_days", nullable = true)
    var week_days: String? = null

    @Column(name = "archive", nullable = false)
    var archive: Boolean? = null

    @ManyToOne(targetEntity = Restaurant::class)
    var restaurant: Restaurant? = null
}
