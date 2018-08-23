package com.anahoret.lunchtime

import org.springframework.beans.factory.InitializingBean
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Profile
import org.springframework.stereotype.Service
import javax.persistence.EntityManager
import javax.persistence.Table
import javax.persistence.metamodel.Metamodel
import javax.transaction.Transactional
import kotlin.reflect.full.findAnnotation

@Service
@Profile("test")
class DatabaseCleanupService @Autowired constructor(private val entityManager: EntityManager) : InitializingBean {
    private lateinit var tableNames: List<String>

    override fun afterPropertiesSet() {
        val metaModel: Metamodel = entityManager.metamodel
        tableNames = metaModel.managedTypes
            .filter {
                it.javaType.kotlin.findAnnotation<Table>() != null &&
                it.javaType.kotlin.simpleName != "Authority"
            }
            .map {
                val tableAnnotation: Table? = it.javaType.kotlin.findAnnotation()
                tableAnnotation?.name ?: throw IllegalStateException("should never get here")
            }
    }

    @Transactional
    fun truncate() {
        tableNames.forEach { tableName ->
            entityManager.createNativeQuery("TRUNCATE TABLE $tableName CASCADE").executeUpdate()
        }
    }
}
