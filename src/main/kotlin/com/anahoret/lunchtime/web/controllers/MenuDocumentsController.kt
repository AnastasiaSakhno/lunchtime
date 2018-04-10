package com.anahoret.lunchtime.web.controllers

import com.anahoret.lunchtime.domain.MenuDocument
import com.anahoret.lunchtime.repositories.DocumentDAO
import com.anahoret.lunchtime.repositories.RestaurantRepository
import com.anahoret.lunchtime.repositories.UserRepository
import org.springframework.http.HttpEntity
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile

@RestController
@RequestMapping("/api/menu_documents")
class MenuDocumentsController(
    var menuDocumentDAO: DocumentDAO<MenuDocument>,
    var userRepository: UserRepository,
    var restaurantRepository: RestaurantRepository) {

    @GetMapping
    fun index(): HttpEntity<Iterable<MenuDocument>> =
        ResponseEntity.ok(menuDocumentDAO.findAll())

    @GetMapping("/{id}")
    fun show(@PathVariable id: Long): HttpEntity<ByteArray> =
        ResponseEntity.ok(menuDocumentDAO.findOne(id).fileData)

    @PostMapping
    @ResponseBody
    fun upload(
        @RequestParam(value = "file") file: MultipartFile,
        @RequestParam(value = "restaurant_id") restaurantId: Long,
        @RequestParam(value = "user_id") userId: Long): MenuDocument {

        val document = MenuDocument()
        document.fileData = file.bytes
        document.fileName = file.originalFilename
        document.user = userRepository.findOne(userId)
        document.restaurant = restaurantRepository.findOne(restaurantId)

        menuDocumentDAO.save(document)
        return document
    }
}
