package com.studyportal.user

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.util.UUID

@SpringBootApplication
class UserServiceApplication

fun main(args: Array<String>) {
    System.setProperty("server.port", "8081")
    runApplication<UserServiceApplication>(*args)
}

data class UserDto(val id: Long, val name: String, val email: String, val role: String)
data class AuthRequest(val email: String, val role: String = "STUDENT")
data class AuthResponse(val token: String, val user: UserDto)

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = ["*"])
class UserController {

    private val demoUsers = mutableMapOf<String, UserDto>(
        "token_aarav" to UserDto(1L, "Aarav Sharma", "aarav@campus.edu", "STUDENT"),
        "token_faculty" to UserDto(2L, "Dr. R. K. Mukherjee", "mukherjee@campus.edu", "FACULTY"),
        "token_admin" to UserDto(3L, "Platform Admin", "admin@campus.edu", "ADMIN")
    )

    @PostMapping("/login")
    fun login(@RequestBody req: AuthRequest): ResponseEntity<AuthResponse> {
        val token = "token_" + UUID.randomUUID().toString().take(8)
        val user = UserDto(10L, req.email.substringBefore("@"), req.email, req.role)
        demoUsers[token] = user
        return ResponseEntity.ok(AuthResponse(token, user))
    }

    /**
     * Internal REST verification endpoint invoked by Material Service
     */
    @GetMapping("/verify")
    fun verifyUser(@RequestParam token: String): ResponseEntity<UserDto> {
        val user = demoUsers[token] ?: return ResponseEntity.status(401).build()
        return ResponseEntity.ok(user)
    }
}
