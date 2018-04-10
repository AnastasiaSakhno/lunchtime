package com.anahoret.lunchtime.repositories

import com.anahoret.lunchtime.domain.MenuDocument
import org.hibernate.SessionFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Repository
import javax.transaction.Transactional


interface DocumentDAO<T> {
    fun findOne(id: Long) : T
    fun findAll() : Iterable<T>
    fun save(document: T)
}

@Repository
class MenuDocumentFileUploadDAO : DocumentDAO<MenuDocument> {
    @Autowired
    private lateinit var sessionFactory: SessionFactory

    constructor() {}

    constructor(sessionFactory: SessionFactory) {
        this.sessionFactory = sessionFactory
    }

    @Transactional
    override fun save(menuDocument: MenuDocument) {
        sessionFactory.currentSession.save(menuDocument)
    }

    override fun findAll(): Iterable<MenuDocument> =
        sessionFactory.currentSession.createCriteria(MenuDocument::class.java).list()

    override fun findOne(id: Long): MenuDocument =
        sessionFactory.currentSession.byId(MenuDocument::class.java).getReference(id)
}
