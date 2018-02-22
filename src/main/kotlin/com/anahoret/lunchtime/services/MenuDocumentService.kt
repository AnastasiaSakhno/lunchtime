package com.anahoret.lunchtime.services

import com.anahoret.lunchtime.domain.MenuDocument
import com.anahoret.lunchtime.domain.MenuDocumentMetadata
import com.anahoret.lunchtime.repositories.IDocumentDao
import org.springframework.stereotype.Service
import java.io.Serializable

interface IMenuDocumentService {

    fun save(document: MenuDocument): MenuDocumentMetadata

    fun findAllDocuments(): List<MenuDocumentMetadata>

    fun getDocumentFile(id: String): ByteArray?
}

@Service("menuDocumentService")
class MenuDocumentService(var documentDao: IDocumentDao) : IMenuDocumentService, Serializable {

    override fun save(document: MenuDocument): MenuDocumentMetadata {
        documentDao.insert(document)
        return document.metadata
    }

    override fun findAllDocuments(): List<MenuDocumentMetadata> {
        return documentDao.loadAll()
    }

    override fun getDocumentFile(id: String): ByteArray? {
        val document = documentDao.load(id)
        return if (document != null) {
            document.fileData
        } else {
            null
        }
    }
}
