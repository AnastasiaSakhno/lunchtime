package com.anahoret.lunchtime.domain

import javax.persistence.*

@Entity
@Table(name = "menu")
class Menu(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    var id: Long,

    @Column(name = "name", nullable = false)
    var name: String,

    @Column(name = "week_days", nullable = true)
    var week_days: String,

    @Column(name = "archive", nullable = false)
    var archive: Boolean,

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "restaurant_id")
    var restaurant: Restaurant
)
