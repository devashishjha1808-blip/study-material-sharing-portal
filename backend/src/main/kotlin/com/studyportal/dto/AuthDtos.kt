package com.studyportal.dto

import com.studyportal.model.Role
import jakarta.validation.constraints.Email
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.Size

data class RegisterRequest(
    @field:NotBlank(message = "Name is required")
    val name: String,

    @field:NotBlank(message = "Email is required")
    @field:Email(message = "Valid email address is required")
    val email: String,

    @field:NotBlank(message = "Password is required")
    @field:Size(min = 6, message = "Password must be at least 6 characters")
    val password: String,

    val role: Role = Role.STUDENT
)

data class LoginRequest(
    @field:NotBlank(message = "Email is required")
    @field:Email(message = "Valid email address is required")
    val email: String,

    @field:NotBlank(message = "Password is required")
    val password: String
)

data class AuthResponse(
    val token: String,
    val type: String = "Bearer",
    val userId: Long,
    val name: String,
    val email: String,
    val role: String,
    val expiresInMs: Long
)

data class UserSummaryDto(
    val id: Long,
    val name: String,
    val email: String,
    val role: String
)
