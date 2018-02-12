package com.anahoret.lunchtime.domain

import javax.persistence.*

@Entity
@Table(name = "restaurants")
class Restaurant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    var id: Long? = null

    @Column(name = "name", nullable = false)
    var name: String? = null

    @Column(name = "address", nullable = false)
    var address: String? = null

    @OneToMany(cascade = [CascadeType.ALL], mappedBy = "restaurant")
    var menu: MutableSet<Menu> = LinkedHashSet()
}
