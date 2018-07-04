package com.anahoret.lunchtime.domain

import com.anahoret.lunchtime.config.social.UserAuthority
import com.anahoret.lunchtime.config.social.UserRole
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
    @JsonIgnore
    var providerId: String? = null

    @NotNull
    @JsonIgnore
    var providerUserId: String? = null

    @NotNull
    @JsonIgnore
    var accessToken: String? = null

    @NotNull
    @Size(min = 4, max = 30)
    private var username: String? = null

    @Transient
    var expires: Long = 0

    @NotNull
    private val accountExpired: Boolean = false

    @NotNull
    private val accountLocked: Boolean = false

    @NotNull
    private val credentialsExpired: Boolean = false

    @NotNull
    private val accountEnabled: Boolean = false

    @OneToMany(cascade = [CascadeType.ALL], mappedBy = "user")
    var userDayMenu: MutableSet<UserDayMenu> = LinkedHashSet()

    @OneToMany(cascade = arrayOf(CascadeType.ALL), mappedBy = "user", fetch = FetchType.EAGER, orphanRemoval = true)
    private var authorities: MutableSet<UserAuthority>? = null

    // Use Roles as external API
    var roles: Set<UserRole>
        get() {
            val roles = EnumSet.noneOf(UserRole::class.java)
            if (authorities != null) {
                for (authority in authorities!!) {
                    roles.add(UserRole.valueOf(authority))
                }
            }
            return roles
        }
        set(roles) {
            for (role in roles) {
                grantRole(role)
            }
        }

    @JsonIgnore
    override fun getUserId(): String {
        return id!!.toString()
    }

    override fun getUsername(): String? {
        return username
    }

    fun setUsername(username: String) {
        this.username = username
    }

    @JsonIgnore
    override fun getAuthorities(): Set<UserAuthority>? {
        return authorities
    }

    fun grantRole(role: UserRole) {
        if (authorities == null) {
            authorities = HashSet<UserAuthority>()
        }
        authorities!!.add(role.asAuthorityFor(this))
    }

    fun revokeRole(role: UserRole) {
        if (authorities != null) {
            authorities!!.remove(role.asAuthorityFor(this))
        }
    }

    fun hasRole(role: UserRole): Boolean {
        return authorities!!.contains(role.asAuthorityFor(this))
    }

    @JsonIgnore
    override fun isAccountNonExpired(): Boolean {
        return !accountExpired
    }

    @JsonIgnore
    override fun isAccountNonLocked(): Boolean {
        return !accountLocked
    }

    @JsonIgnore
    override fun isCredentialsNonExpired(): Boolean {
        return !credentialsExpired
    }

    @JsonIgnore
    override fun isEnabled(): Boolean {
        return !accountEnabled
    }

    override fun toString(): String {
        return javaClass.simpleName + ": " + getUsername()
    }

    @JsonIgnore
    override fun getPassword(): String {
        throw IllegalStateException("password should never be used")
    }

    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as User

        if (id != other.id) return false

        return true
    }

    override fun hashCode(): Int {
        return id?.hashCode() ?: 0
    }
}
