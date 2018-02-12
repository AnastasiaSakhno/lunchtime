package com.anahoret.lunchtime.domain

import javax.persistence.*

@Entity
@Table(name = "day_menu_documents")
class DayMenuDocument(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long,

    @Column(name = "name", length = 100, nullable = false)
    var name: String,

    @Column(name = "type", length = 100, nullable = false)
    var type: String,

    @Lob
    @Basic(fetch = FetchType.LAZY)
    @Column(name = "content", nullable = false)
    var content: ByteArray,

    @OneToOne
    var dayMenu: DayMenu
)
