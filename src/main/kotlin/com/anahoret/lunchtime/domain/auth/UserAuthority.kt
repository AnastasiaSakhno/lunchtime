package com.anahoret.lunchtime.domain.auth

import com.anahoret.lunchtime.domain.User
import com.fasterxml.jackson.annotation.JsonIgnore
import org.springframework.security.core.GrantedAuthority
import javax.persistence.*
import javax.validation.constraints.NotNull

@Entity
@Table(name = "user_authorities")
class UserAuthority(
    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @Id
    val user: User,

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @Id
    val authority: Authority) : GrantedAuthority {

    override fun getAuthority() = authority.name

    override fun equals(other: Any?): Boolean {
        if (other !is UserAuthority)
            return false

        val ua = other as UserAuthority?
        return ua!!.getAuthority() === this.getAuthority() || ua!!.getAuthority() == this.getAuthority()
    }

    override fun hashCode() = getAuthority().hashCode()

    override fun toString() = javaClass.simpleName + ": " + getAuthority()
}
