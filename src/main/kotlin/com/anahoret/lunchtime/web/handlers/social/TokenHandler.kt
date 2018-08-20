package com.anahoret.lunchtime.web.handlers.social

import com.anahoret.lunchtime.domain.User
import com.fasterxml.jackson.databind.ObjectMapper
import java.io.ByteArrayInputStream
import java.util.*
import javax.crypto.Mac
import javax.crypto.spec.SecretKeySpec
import javax.xml.bind.DatatypeConverter

class TokenHandler(secretKey: ByteArray) {

    private val hmac: Mac = Mac.getInstance(HMAC_ALGO)

    init {
        hmac.init(SecretKeySpec(secretKey, HMAC_ALGO))
    }

    fun parseUserFromToken(token: String): User? {
        val parts = token.split(SEPARATOR_SPLITTER.toRegex()).dropLastWhile { it.isEmpty() }.toTypedArray()
        if (parts.size == 2 && parts[0].isNotEmpty() && parts[1].isNotEmpty()) {
            val userBytes = fromBase64(parts[0])
            val hash = fromBase64(parts[1])

            val validHash = Arrays.equals(createHmac(userBytes), hash)
            if (validHash) {
                val user = fromJSON(userBytes)
                if (Date().time < user.expires) {
                    return user
                }
            }
        }
        return null
    }

    fun createTokenForUser(user: User): String {
        val userBytes = toJSON(user)
        val hash = createHmac(userBytes)
        return StringBuilder(170)
            .append(toBase64(userBytes))
            .append(SEPARATOR)
            .append(toBase64(hash)).toString()
    }

    private fun fromJSON(userBytes: ByteArray) = ObjectMapper().readValue(ByteArrayInputStream(userBytes), User::class.java)

    private fun toJSON(user: User) = ObjectMapper().writeValueAsBytes(user)

    private fun toBase64(content: ByteArray) =
        DatatypeConverter.printBase64Binary(content)
            .replace('+', '-')
            .replace('/', '_')
            .replace("=".toRegex(), "")

    private fun fromBase64(urlsafeBase64: String): ByteArray {
        var url = urlsafeBase64.replace('-', '+').replace('_', '/')
        val rest = url.length % 4
        if (rest != 0) {
            url += if (rest == 3) "=" else "=="
        }
        return DatatypeConverter.parseBase64Binary(url)
    }

    // synchronized to guard internal hmac object
    @Synchronized
    private fun createHmac(content: ByteArray) = hmac.doFinal(content)

    companion object {
        private const val HMAC_ALGO = "HmacSHA256"
        private const val SEPARATOR = "."
        private const val SEPARATOR_SPLITTER = "\\."
    }
}
