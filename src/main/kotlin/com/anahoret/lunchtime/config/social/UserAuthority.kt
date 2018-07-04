package com.anahoret.lunchtime.config.social

import com.anahoret.lunchtime.domain.User
import com.fasterxml.jackson.annotation.JsonIgnore
import org.springframework.security.core.GrantedAuthority
import javax.persistence.*
import javax.validation.constraints.NotNull

@Entity
//@IdClass(UserAuthority::class)
@Table(name = "user_authorities")
class UserAuthority : GrantedAuthority {

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @Id
    var user: User? = null

    @NotNull
    @Id
    private var authority: String? = null

    override fun getAuthority(): String? {
        return authority
    }

    fun setAuthority(authority: String) {
        this.authority = authority
    }

    override fun equals(other: Any?): Boolean {
        if (other !is UserAuthority)
            return false

        val ua = other as UserAuthority?
        return ua!!.getAuthority() === this.getAuthority() || ua!!.getAuthority() == this.getAuthority()
    }

    override fun hashCode(): Int {
        return if (getAuthority() == null) 0 else getAuthority()!!.hashCode()
    }

    override fun toString(): String {
        return javaClass.simpleName + ": " + getAuthority()
    }
}
