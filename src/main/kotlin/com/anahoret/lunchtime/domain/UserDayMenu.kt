package com.anahoret.lunchtime.domain

import org.hibernate.annotations.Type
import org.joda.time.LocalDate
import javax.persistence.*

@Entity
@Table(name = "user_day_menu")
class UserDayMenu(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    var id: Long,

    @Column(name = "date", nullable = false)
    @Type(`type` = "org.jadira.usertype.dateandtime.joda.PersistentLocalDate")
    @Temporal(TemporalType.DATE)
    var date: LocalDate,

    @Column(name = "out", nullable = true)
    var out: Boolean,

    @Column(name = "archive", nullable = false)
    var archive: Boolean,

    @ManyToOne(targetEntity = Menu::class)
    var menu: Menu,

    @ManyToOne(targetEntity = User::class)
    var user: User
)
