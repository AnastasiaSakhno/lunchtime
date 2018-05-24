package com.anahoret.lunchtime.services

import com.anahoret.lunchtime.domain.MenuDocument
import com.anahoret.lunchtime.repositories.MenuDocumentRepository
import com.anahoret.lunchtime.repositories.RestaurantRepository
import com.anahoret.lunchtime.repositories.UserRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.multipart.MultipartFile

interface MenuDocumentsUploader {
    fun upload(file: MultipartFile, userEmail: String, restaurantId: Long): MenuDocument
}

@Service
class MenuDocumentsUploaderImpl(
    var menuDocumentRepository: MenuDocumentRepository,
    var userRepository: UserRepository,
    var restaurantRepository: RestaurantRepository) : MenuDocumentsUploader {

    @Transactional(rollbackFor = [Throwable::class])
    override fun upload(file: MultipartFile, userEmail: String, restaurantId: Long): MenuDocument {
        menuDocumentRepository.findByRestaurantId(restaurantId)?.let {
            menuDocumentRepository.delete(it)
        }

        val document = MenuDocument()
        document.fileData = file.bytes
        document.fileName = file.originalFilename
        document.user = userRepository.findByEmail(userEmail)
        document.restaurant = restaurantRepository.findOne(restaurantId)

        return menuDocumentRepository.save(document)
    }
}
