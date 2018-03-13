package com.anahoret.lunchtime.web.controllers

import com.anahoret.lunchtime.domain.MenuDocument
import com.anahoret.lunchtime.domain.MenuDocumentMetadata
import com.anahoret.lunchtime.services.MenuDocumentService
import org.springframework.http.*
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile
import java.util.*

@RestController
@RequestMapping("/api/menu_documents")
class MenuDocumentsController(var menuDocumentService: MenuDocumentService) {

    @GetMapping
    fun index(): HttpEntity<List<MenuDocumentMetadata>> =
        ResponseEntity.ok(menuDocumentService.findAllDocuments())

    @GetMapping("/{id}")
    fun show(@PathVariable id: String): HttpEntity<ByteArray> =
        ResponseEntity.ok(menuDocumentService.getDocumentFile(id))

    @PostMapping
    @ResponseBody
    fun upload(
            @RequestParam(value = "file") file: MultipartFile,
            @RequestParam(value = "restaurant") restaurant: String,
            @RequestParam(value = "user") user: String): MenuDocumentMetadata {

        val document = MenuDocument(
            fileData = file.bytes,
            fileName = file.originalFilename,
            restaurantName = restaurant,
            uploadedAt = Date(),
            userName = user
        )
        menuDocumentService.save(document)
        return document.metadata
    }
}
