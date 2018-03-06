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
        val dirPath = getDirectoryPath(metadata.uuid)
        val sb = StringBuilder()
        sb.append(dirPath).append(File.separator).append(metadata.fileName)
        return sb.toString()
    }

    private fun saveFileData(document: MenuDocument) {
        val path = getDirectoryPath(document)
        val stream = BufferedOutputStream(FileOutputStream(File(File(path), document.metadata.fileName)))
        stream.write(document.fileData)
        stream.close()
    }

    fun saveMetaData(document: MenuDocument) {
        val path = getDirectoryPath(document)
        val props = document.metadata.properties
        val f = File(File(path), fileSystemDocumentConfig.metadataFileName)
        val out = FileOutputStream(f)
        props.store(out, "Document meta data")
    }

    private fun readProperties(uuid: String): Properties {
        val prop = Properties()
        var input: InputStream? = null
        try {
            input = FileInputStream(File(getDirectoryPath(uuid), fileSystemDocumentConfig.metadataFileName))
            prop.load(input)
        } finally {
            if (input != null) {
                try {
                    input.close()
                } catch (e: IOException) {
                    e.printStackTrace()
                }

            }
        }
        return prop
    }

    private fun createDirectory(document: MenuDocument): Boolean {
        val path = getDirectoryPath(document)
        return File(path).mkdir()
    }

    private fun deleteDirectory(document: MenuDocument): Boolean =
        File(getDirectoryPath(document)).deleteRecursively()

    private fun getDirectoryPath(document: MenuDocument): String {
        return getDirectoryPath(document.metadata.uuid)
    }

    private fun getDirectoryPath(uuid: String): String {
        return "${fileSystemDocumentConfig.directory}${File.separator}$uuid"
    }
}
