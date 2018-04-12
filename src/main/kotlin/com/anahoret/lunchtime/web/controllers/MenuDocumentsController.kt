package com.anahoret.lunchtime.web.controllers

import com.anahoret.lunchtime.domain.MenuDocument
import com.anahoret.lunchtime.repositories.MenuDocumentRepository
import com.anahoret.lunchtime.repositories.RestaurantRepository
import com.anahoret.lunchtime.repositories.UserRepository
import org.springframework.http.HttpEntity
import org.springframework.http.ResponseEntity
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile

@RestController
@RequestMapping("/api/menu_documents")
class MenuDocumentsController(
        var menuDocumentRepository: MenuDocumentRepository,
        var userRepository: UserRepository,
        var restaurantRepository: RestaurantRepository) {

    @GetMapping
    fun index(): HttpEntity<Iterable<MenuDocument>> =
            ResponseEntity.ok(menuDocumentRepository.findAll())

    @GetMapping("/{id}")
    fun show(@PathVariable id: Long): HttpEntity<ByteArray> =
            ResponseEntity.ok(menuDocumentRepository.findOne(id).fileData)

    @PostMapping
    @ResponseBody
    @Transactional
    fun upload(
            @RequestParam(value = "file") file: MultipartFile,
            @RequestParam(value = "restaurant_id") restaurantId: Long,
            @RequestParam(value = "user_email") userEmail: String): Map<String, Any?> {

        menuDocumentRepository.findByRestaurantId(restaurantId)?.let {
            menuDocumentRepository.delete(it.id)
        }

        val document = MenuDocument()
        document.fileData = file.bytes
        document.fileName = file.originalFilename
        document.user = userRepository.findByEmail(userEmail)
        document.restaurant = restaurantRepository.findOne(restaurantId)

        val savedDocument = menuDocumentRepository.save(document)

        return savedDocument.metadata()
    }
}
