package com.anahoret.lunchtime.domain

import javax.persistence.*

@Entity
@Table(name = "menu_documents")
class MenuDocument(

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
    var restaurant: Restaurant
)
