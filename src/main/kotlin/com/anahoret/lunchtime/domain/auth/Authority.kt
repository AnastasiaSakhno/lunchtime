package com.anahoret.lunchtime.domain.auth

import javax.persistence.*

@Entity
@Table(name = "authorities")
class Authority(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    var id: Long,

    @Column(name = "name", nullable = false)
    var name: String,

    @OneToMany(cascade = [CascadeType.ALL], mappedBy = "authority", fetch = FetchType.EAGER)
    var userAuthorities: MutableSet<UserAuthority>
)
