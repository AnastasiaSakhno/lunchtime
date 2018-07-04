package com.anahoret.lunchtime.config.social

import com.anahoret.lunchtime.domain.User
import com.fasterxml.jackson.core.JsonProcessingException
import com.fasterxml.jackson.databind.ObjectMapper
import java.io.ByteArrayInputStream
import java.io.IOException
import java.security.InvalidKeyException
import java.security.NoSuchAlgorithmException
import java.util.*
import javax.crypto.Mac
import javax.crypto.spec.SecretKeySpec
import javax.xml.bind.DatatypeConverter

class TokenHandler(secretKey: ByteArray) {

    private val hmac: Mac

    init {
        try {
            hmac = Mac.getInstance(HMAC_ALGO)
            hmac.init(SecretKeySpec(secretKey, HMAC_ALGO))
        } catch (e: NoSuchAlgorithmException) {
            throw IllegalStateException("failed to initialize HMAC: " + e.message, e)
        } catch (e: InvalidKeyException) {
            throw IllegalStateException("failed to initialize HMAC: " + e.message, e)
        }

    }

    fun parseUserFromToken(token: String): User? {
        val parts = token.split(SEPARATOR_SPLITTER.toRegex()).dropLastWhile { it.isEmpty() }.toTypedArray()
        if (parts.size == 2 && parts[0].length > 0 && parts[1].length > 0) {
            try {
                val userBytes = fromBase64(parts[0])
                val hash = fromBase64(parts[1])

                val validHash = Arrays.equals(createHmac(userBytes), hash)
                if (validHash) {
                    val user = fromJSON(userBytes)
                    if (Date().time < user.expires) {
                        return user
                    }
                }
            } catch (e: IllegalArgumentException) {
                //log tempering attempt here
            }

        }
        return null
    }

    fun createTokenForUser(user: User): String {
        val userBytes = toJSON(user)
        val hash = createHmac(userBytes)
        val sb = StringBuilder(170)
        sb.append(toBase64(userBytes))
        sb.append(SEPARATOR)
        sb.append(toBase64(hash))
        return sb.toString()
    }

    private fun fromJSON(userBytes: ByteArray): User {
        try {
            return ObjectMapper().readValue(ByteArrayInputStream(userBytes), User::class.java)
        } catch (e: IOException) {
            throw IllegalStateException(e)
        }

    }

    private fun toJSON(user: User): ByteArray {
        try {
            return ObjectMapper().writeValueAsBytes(user)
        } catch (e: JsonProcessingException) {
            throw IllegalStateException(e)
        }

    }

    private fun toBase64(content: ByteArray): String {
        return DatatypeConverter.printBase64Binary(content).replace('+', '-').replace('/', '_').replace("=".toRegex(), "")
    }

    private fun fromBase64(urlsafeBase64: String): ByteArray {
        var urlsafeBase64 = urlsafeBase64
        urlsafeBase64 = urlsafeBase64.replace('-', '+').replace('_', '/')
        val rest = urlsafeBase64.length % 4
        if (rest != 0) {
            urlsafeBase64 += if (rest == 3) "=" else "=="
        }
        return DatatypeConverter.parseBase64Binary(urlsafeBase64)
    }

    // synchronized to guard internal hmac object
    @Synchronized
    private fun createHmac(content: ByteArray): ByteArray {
        return hmac.doFinal(content)
    }

    companion object {

        private val HMAC_ALGO = "HmacSHA256"
        private val SEPARATOR = "."
        private val SEPARATOR_SPLITTER = "\\."
    }
}
