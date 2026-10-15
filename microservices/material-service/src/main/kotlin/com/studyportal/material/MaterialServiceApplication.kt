package com.studyportal.material

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.http.*
import org.springframework.web.bind.annotation.*
import org.springframework.web.client.RestTemplate
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@SpringBootApplication
class MaterialServiceApplication

fun main(args: Array<String>) {
    System.setProperty("server.port", "8082")
    runApplication<MaterialServiceApplication>(*args)
}

@Configuration
class AppConfig {
    @Bean
    fun restTemplate(): RestTemplate = RestTemplate()
}

data class UserVerificationResponse(val id: Long, val name: String, val email: String, val role: String)

data class MicroMaterial(
    val id: Long,
    val title: String,
    val subjectCode: String,
    val uploaderId: Long
)

@RestController
@RequestMapping("/api/micro-materials")
@CrossOrigin(origins = ["*"])
class MaterialMicroController(private val restTemplate: RestTemplate) {

    private val userVerifyUrl = "http://localhost:8081/api/users/verify"

    private val sampleStore = mutableListOf(
        MicroMaterial(1L, "DBMS Relational Calculus & SQL", "CS301", 1L),
        MicroMaterial(2L, "OS Concurrency & Semaphores", "CS302", 2L)
    )

    @GetMapping
    fun getAll(): List<MicroMaterial> = sampleStore

    /**
     * Demonstrates inter-service REST communication with User Service
     */
    @DeleteMapping("/{id}")
    fun deleteMaterial(
        @PathVariable id: Long,
        @RequestHeader("Authorization") authHeader: String
    ): ResponseEntity<Map<String, String>> {
        val token = authHeader.removePrefix("Bearer ").trim()

        // 1. Synchronous REST call to User Service (port 8081)
        val verifyTarget = "$userVerifyUrl?token=$token"
        val response = try {
            restTemplate.getForEntity(verifyTarget, UserVerificationResponse::class.java)
        } catch (e: Exception) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(mapOf("error" to "User Service token verification failed: ${e.message}"))
        }

        val verifiedUser = response.body
            ?: return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(mapOf("error" to "Invalid token"))

        val material = sampleStore.find { it.id == id }
            ?: return ResponseEntity.status(HttpStatus.NOT_FOUND).body(mapOf("error" to "Material not found"))

        // 2. Enforce Ownership or Admin role
        if (material.uploaderId != verifiedUser.id && verifiedUser.role != "ADMIN") {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body(mapOf("error" to "Forbidden: You are not the author of this material and lack ADMIN role"))
        }

        sampleStore.removeIf { it.id == id }
        return ResponseEntity.ok(mapOf("message" to "Material #$id successfully deleted by verified ${verifiedUser.name}"))
    }
}
