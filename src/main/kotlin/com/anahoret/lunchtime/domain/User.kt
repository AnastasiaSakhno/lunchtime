package com.anahoret.lunchtime.domain

import com.anahoret.lunchtime.domain.auth.Authority
import com.fasterxml.jackson.annotation.JsonIgnore
import org.springframework.social.security.SocialUserDetails
import java.util.*
import javax.persistence.*
import javax.validation.constraints.NotNull
import javax.validation.constraints.Size

@Entity
@Table(name = "users", uniqueConstraints = arrayOf(UniqueConstraint(columnNames = arrayOf("username"))))
class User : SocialUserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null

    @NotNull
    var fullName: String? = null

    @NotNull
    @JsonIgnore
    var providerId: String? = null

    @NotNull
    @JsonIgnore
    var providerUserId: String? = null

    @Transient
    var accessToken: String? = null

    @NotNull
    @Size(min = 4, max = 30)
    private var username: String? = null

    @Transient
    var expires: Long = 0

    @NotNull
    var accountEnabled: Boolean = true

    @NotNull
    private val accountExpired: Boolean = false

    @NotNull
    private val accountLocked: Boolean = false

    @NotNull
    private val credentialsExpired: Boolean = false

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "user_authorities",
        joinColumns = [JoinColumn(name = "user_id", referencedColumnName = "id")],
        inverseJoinColumns = [JoinColumn(name = "authority_id", referencedColumnName = "id")])
    private var authorities: MutableSet<Authority> = LinkedHashSet()

    // Use Roles as external API
    val roles: Set<String>
        get() = authorities.map { it.name }.toHashSet()

    @JsonIgnore
    override fun getUserId() = id!!.toString()

    override fun getUsername() = username

    fun setUsername(username: String) {
        this.username = username
    }

    @JsonIgnore
    override fun getAuthorities() = authorities.flatMap { it.userAuthorities }

    fun grantAuthority(authority: Authority) {
        authorities.add(authority)
    }

    @JsonIgnore
    override fun isAccountNonExpired() = !accountExpired

    @JsonIgnore
    override fun isAccountNonLocked() = !accountLocked

    @JsonIgnore
    override fun isCredentialsNonExpired() = !credentialsExpired

    @JsonIgnore
    override fun isEnabled() = accountEnabled

    override fun toString() = "$javaClass.simpleName : ${getUsername()}"

    @JsonIgnore
    override fun getPassword() = throw IllegalStateException("password should never be used")

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as User

        if (id != other.id) return false

        return true
    }

    override fun hashCode() = id?.hashCode() ?: 0
}
