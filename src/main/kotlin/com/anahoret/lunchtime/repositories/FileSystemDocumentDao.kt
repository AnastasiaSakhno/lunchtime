package com.anahoret.lunchtime.repositories

import com.anahoret.lunchtime.config.FileSystemDocumentConfig
import com.anahoret.lunchtime.domain.MenuDocument
import com.anahoret.lunchtime.domain.MenuDocumentMetadata
import org.springframework.stereotype.Service
import java.io.*
import java.nio.file.Files
import java.nio.file.Paths
import java.util.*
import javax.annotation.PostConstruct

interface IDocumentDao {

    fun insert(document: MenuDocument)

    fun loadAll(): List<MenuDocumentMetadata>

    fun load(uuid: String): MenuDocument?
}

@Service("menuDocumentDao")
class FileSystemDocumentDao(private val fileSystemDocumentConfig: FileSystemDocumentConfig) : IDocumentDao {

    private val uuidList: List<String>
        get() {
            val file = File(fileSystemDocumentConfig.directory)
            val directories = file.list { current, name -> File(current, name).isDirectory }
            return Arrays.asList(*directories!!)
        }

    @PostConstruct
    fun init() {
        File(fileSystemDocumentConfig.directory).mkdir()
    }

    override fun insert(document: MenuDocument) {
        deleteDirectory(document)
        createDirectory(document)
        saveFileData(document)
        saveMetaData(document)
    }

    override fun loadAll(): List<MenuDocumentMetadata> {
        val list = ArrayList<MenuDocumentMetadata>(uuidList.size)
        uuidList.mapNotNullTo(list) { loadMetadataFromFileSystem(it) }
        return list
    }

    override fun load(uuid: String): MenuDocument? {
        return loadFromFileSystem(uuid)
    }

    private fun loadMetadataFromFileSystem(uuid: String): MenuDocumentMetadata? =
        File(getDirectoryPath(uuid)).takeIf { it.exists() }?.let {
            MenuDocumentMetadata(readProperties(uuid))
        }

    private fun loadFromFileSystem(uuid: String): MenuDocument? {
        val metadata = loadMetadataFromFileSystem(uuid) ?: return null
        val path = Paths.get(getFilePath(metadata))
        val document = MenuDocument(metadata)
        document.fileData = Files.readAllBytes(path)
        return document
    }

    private fun getFilePath(metadata: MenuDocumentMetadata): String {
        return "${getDirectoryPath(metadata.uuid)}${File.separator}${metadata.fileName}"
    }

    private fun saveFileData(document: MenuDocument) {
        val path = Paths.get(getDirectoryPath(document), document.metadata.fileName)
        Files.newOutputStream(path).use { it.write(document.fileData) }
    }

    fun saveMetaData(document: MenuDocument) {
        val props = document.metadata.properties
        val path = File(File(getDirectoryPath(document)), fileSystemDocumentConfig.metadataFileName).toPath()
        Files.newOutputStream(path).use { props.store(it, "Document meta data") }
    }

    private fun readProperties(uuid: String): Properties {
        val props = Properties()
        val path = File(getDirectoryPath(uuid), fileSystemDocumentConfig.metadataFileName).toPath()
        Files.newInputStream(path).use { props.load(it) }
        return props
    }

    private fun createDirectory(document: MenuDocument): Boolean =
        File(getDirectoryPath(document)).mkdir()

    private fun deleteDirectory(document: MenuDocument): Boolean =
        File(getDirectoryPath(document)).deleteRecursively()

    private fun getDirectoryPath(document: MenuDocument): String =
        getDirectoryPath(document.metadata.uuid)

    private fun getDirectoryPath(uuid: String): String =
        "${fileSystemDocumentConfig.directory}${File.separator}$uuid"
}
