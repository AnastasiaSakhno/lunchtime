package com.anahoret.lunchtime.domain

import javax.persistence.*

@Entity
@Table(name = "restaurants")
class Restaurant(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    var id: Long,

    @Column(name = "name", nullable = false)
    var name: String,

    @Column(name = "address", nullable = false)
    var address: String,

    @Column(name = "archive", nullable = false)
    var archive: Boolean,

    @OneToMany(cascade = [CascadeType.ALL], mappedBy = "restaurant")
    var menu: MutableSet<Menu> = LinkedHashSet()
)
