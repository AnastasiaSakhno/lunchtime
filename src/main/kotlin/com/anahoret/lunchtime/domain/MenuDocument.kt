package com.anahoret.lunchtime.domain

import java.io.Serializable
import java.util.*

class MenuDocument(val metadata: MenuDocumentMetadata) : Serializable {
    var fileData: ByteArray? = null

    constructor(fileData: ByteArray?, fileName: String, restaurantName: String, uploadedAt: Date, userName: String)
            : this(MenuDocumentMetadata(fileName = fileName, restaurantName = restaurantName, uploadedAt = uploadedAt, userName = userName)) {
        this.fileData = fileData
    }
}
