package com.anahoret.lunchtime.domain

import org.hibernate.annotations.Type
import org.joda.time.LocalDate
import javax.persistence.*

@Entity
@Table(name = "day_menu")
class DayMenu(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    var id: Long,

    @Column(name = "date", nullable = false)
    @Type(`type` = "org.jadira.usertype.dateandtime.joda.PersistentLocalDate")
    @Temporal(TemporalType.DATE)
    var date: LocalDate,

    @ManyToOne(targetEntity = Menu::class)
    var menu: Menu
)
