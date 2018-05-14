package com.anahoret.lunchtime.web.controllers

import com.anahoret.lunchtime.domain.MenuDocument
import com.anahoret.lunchtime.repositories.MenuDocumentRepository
import com.anahoret.lunchtime.services.MenuDocumentsUploader
import org.springframework.http.HttpEntity
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile

@RestController
@RequestMapping("api/menu_documents")
class MenuDocumentsController(
        var menuDocumentRepository: MenuDocumentRepository,
        var menuDocumentsUploader: MenuDocumentsUploader) {

    @GetMapping
    fun index(): HttpEntity<Iterable<MenuDocument>> =
            ResponseEntity.ok(menuDocumentRepository.findAll())

    @GetMapping("{id}")
    fun show(@PathVariable id: Long): HttpEntity<ByteArray> =
            ResponseEntity.ok(menuDocumentRepository.findOne(id).fileData)

    @PostMapping
    @ResponseBody
    fun upload(
            @RequestParam(value = "file") file: MultipartFile,
            @RequestParam(value = "restaurant_id") restaurantId: Long,
            @RequestParam(value = "user_email") userEmail: String): Map<String, Any?> {

        val savedDocument = menuDocumentsUploader.upload(file, userEmail, restaurantId)
        return savedDocument.metadata()
    }
}
