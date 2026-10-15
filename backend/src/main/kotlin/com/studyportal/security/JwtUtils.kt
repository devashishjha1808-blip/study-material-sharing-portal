package com.studyportal.security

import io.jsonwebtoken.Claims
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import io.jsonwebtoken.security.Keys
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component
import java.nio.charset.StandardCharsets
import java.security.Key
import java.util.Date

@Component
class JwtUtils(
    @Value("\${studyportal.jwt.secret:study_material_super_secret_jwt_key_at_least_256_bits_length_12345}")
    private val jwtSecret: String,

    @Value("\${studyportal.jwt.expiration-ms:86400000}")
    private val jwtExpirationMs: Long
) {

    private val signingKey: Key
        get() {
            val keyBytes = jwtSecret.toByteArray(StandardCharsets.UTF_8)
            // Ensure minimum key length for HS256
            val paddedBytes = if (keyBytes.size < 32) {
                keyBytes.copyOf(32)
            } else {
                keyBytes
            }
            return Keys.hmacShaKeyFor(paddedBytes)
        }

    fun generateToken(email: String, role: String, userId: Long): String {
        val now = Date()
        val expiryDate = Date(now.time + jwtExpirationMs)

        return Jwts.builder()
            .setSubject(email)
            .claim("role", role)
            .claim("userId", userId)
            .setIssuedAt(now)
            .setExpiration(expiryDate)
            .signWith(signingKey, SignatureAlgorithm.HS256)
            .compact()
    }

    fun getEmailFromToken(token: String): String {
        val claims: Claims = Jwts.parserBuilder()
            .setSigningKey(signingKey)
            .build()
            .parseClaimsJws(token)
            .body
        return claims.subject
    }

    fun validateToken(token: String): Boolean {
        return try {
            Jwts.parserBuilder()
                .setSigningKey(signingKey)
                .build()
                .parseClaimsJws(token)
            true
        } catch (e: Exception) {
            false
        }
    }

    fun getExpirationDuration(): Long = jwtExpirationMs
}
