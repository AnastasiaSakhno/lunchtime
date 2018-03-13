package com.anahoret.lunchtime.domain

import org.apache.commons.lang3.time.DateFormatUtils
import org.apache.commons.lang3.time.DateUtils
import java.io.Serializable
import java.util.*

class MenuDocumentMetadata(val fileName: String, val restaurantName: String, val uploadedAt: Date, val userName: String) : Serializable {

    val uuid: String = "restaurant_$restaurantName"

    constructor(properties: Properties) : this(
            fileName = properties.getProperty(PROP_FILE_NAME),
            restaurantName = properties.getProperty(PROP_RESTAURANT_NAME),
            uploadedAt = DateUtils.parseDate(properties.getProperty(PROP_DOCUMENT_DATE), DATE_FORMAT_PATTERN),
            userName = properties.getProperty(PROP_PERSON_NAME)
    )

    val properties: Properties
        get() {
            val props = Properties()
            props.setProperty(PROP_UUID, uuid)
            props.setProperty(PROP_RESTAURANT_NAME, restaurantName)
            props.setProperty(PROP_FILE_NAME, fileName)
            props.setProperty(PROP_PERSON_NAME, userName)
            props.setProperty(PROP_DOCUMENT_DATE, DateFormatUtils.format(uploadedAt, DATE_FORMAT_PATTERN))
            return props
        }

    companion object {
        private const val PROP_UUID = "uuid"
        private const val PROP_RESTAURANT_NAME = "restaurant-name"
        private const val PROP_PERSON_NAME = "person-name"
        private const val PROP_FILE_NAME = "file-name"
        private const val PROP_DOCUMENT_DATE = "document-uploaded-at"

        private const val DATE_FORMAT_PATTERN = "yyyy-MM-dd"
    }
}
