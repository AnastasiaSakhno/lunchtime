package com.anahoret.lunchtime.security

class Constants {
    companion object {
        const val SECRET = "secretfromproperties"
        const val EXPIRATION_TIME: Long = 864000000 // 10 days
        const val TOKEN_PREFIX = "Bearer "
        const val HEADER_STRING = "Authorization"
    }
}
