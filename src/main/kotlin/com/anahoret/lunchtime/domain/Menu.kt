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

    @ManyToOne(targetEntity = Restaurant::class)
    var restaurant: Restaurant
)
