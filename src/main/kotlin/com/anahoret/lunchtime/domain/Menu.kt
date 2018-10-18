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
    var weekDays: String?,

    @Column(name = "archive", nullable = false)
    var archive: Boolean,

    @Column(name = "color_hex", nullable = true)
    var colorHex: String?,

    @ManyToOne(fetch = FetchType.EAGER, optional = true)
    @JoinColumn(name = "restaurant_id")
    var restaurant: Restaurant?,

    @OneToMany(cascade = [CascadeType.ALL], mappedBy = "menu")
    var userDayMenu: MutableSet<UserDayMenu> = LinkedHashSet()
)
