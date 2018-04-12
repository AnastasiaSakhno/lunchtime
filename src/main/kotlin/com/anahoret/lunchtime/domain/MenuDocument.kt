package com.anahoret.lunchtime.domain

import com.fasterxml.jackson.annotation.JsonFormat
import org.hibernate.annotations.Type
import org.joda.time.LocalDate
import javax.persistence.*
import kotlin.collections.HashMap

@Entity
@Table(name = "menu_documents")
class MenuDocument {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    var id: Long? = null

    @Column(name = "file_name", nullable = false)
    var fileName: String? = null

    @Column(name = "file_data", nullable = false)
    var fileData: ByteArray? = null

    @Column(name = "uploaded_at", nullable = true)
    @Type(type = "org.jadira.usertype.dateandtime.joda.PersistentLocalDate")
    @Temporal(TemporalType.DATE)
    @JsonFormat(shape = JsonFormat.Shape.NUMBER)
    var uploadedAt: LocalDate = LocalDate()

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "restaurant_id")
    var restaurant: Restaurant? = null

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    var user: User? = null

    fun metadata() : Map<String, Any?> {
        val props = HashMap<String, Any?>()
        props["id"] = id
        props["fileName"] = fileName
        val restaurantProps = HashMap<String, Any?>()
        restaurantProps["id"] = restaurant?.id
        restaurantProps["name"] = restaurant?.name
        props["restaurant"] = restaurantProps
        return props
    }
}
