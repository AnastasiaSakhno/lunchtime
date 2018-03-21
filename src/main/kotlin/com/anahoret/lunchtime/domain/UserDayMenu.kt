package com.anahoret.lunchtime.domain

import com.fasterxml.jackson.annotation.JsonFormat
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
    @JsonFormat(shape = JsonFormat.Shape.NUMBER)
    var date: LocalDate,

    @Column(name = "out", nullable = true)
    var out: Boolean,

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "menu_id")
    var menu: Menu,

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    var user: User
)
