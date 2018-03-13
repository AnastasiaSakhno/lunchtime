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
        getDirectory(document).deleteRecursively()
        getDirectory(document).mkdir()
        saveFileData(document)
        saveMetaData(document)
    }

    override fun loadAll(): List<MenuDocumentMetadata> =
        uuidList.mapNotNullTo(destination = ArrayList(uuidList.size)) { loadMetadataFromFileSystem(it) }

    override fun load(uuid: String): MenuDocument? =
        loadFromFileSystem(uuid)

    private fun loadMetadataFromFileSystem(uuid: String): MenuDocumentMetadata? =
        File(getDirectoryPath(uuid)).takeIf { it.exists() }?.let {
            MenuDocumentMetadata(readProperties(uuid))
        }

    private fun loadFromFileSystem(uuid: String): MenuDocument? =
        loadMetadataFromFileSystem(uuid)?.let { metadata ->
            val path = Paths.get(getFilePath(metadata))
            MenuDocument(metadata).also { document -> document.fileData = Files.readAllBytes(path) }
        }

    private fun getFilePath(metadata: MenuDocumentMetadata): String =
        "${getDirectoryPath(metadata.uuid)}${File.separator}${metadata.fileName}"

    private fun saveFileData(document: MenuDocument) {
        val path = Paths.get(getDirectoryPath(document), document.metadata.fileName)
        Files.newOutputStream(path).use { it.write(document.fileData) }
    }

    private fun saveMetaData(document: MenuDocument) {
        val path = Paths.get(getDirectoryPath(document), fileSystemDocumentConfig.metadataFileName)
        Files.newOutputStream(path).use { document.metadata.properties.store(it, "Document meta data") }
    }

    private fun readProperties(uuid: String): Properties =
        Properties().also { props ->
            val path = Paths.get(getDirectoryPath(uuid), fileSystemDocumentConfig.metadataFileName)
            Files.newInputStream(path).use { props.load(it) }
        }

    private fun getDirectory(document: MenuDocument): File =
        File(getDirectoryPath(document))

    private fun getDirectoryPath(document: MenuDocument): String =
        getDirectoryPath(document.metadata.uuid)

    private fun getDirectoryPath(uuid: String): String =
        "${fileSystemDocumentConfig.directory}${File.separator}$uuid"
}
