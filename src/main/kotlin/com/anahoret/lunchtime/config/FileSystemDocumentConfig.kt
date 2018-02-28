package com.anahoret.lunchtime.config

import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Configuration

@Configuration
class FileSystemDocumentConfig(
    @Value("\${documents.directory}")
    val directory: String,
    @Value("\${documents.metadata.file_name}")
    val metadataFileName: String
)
