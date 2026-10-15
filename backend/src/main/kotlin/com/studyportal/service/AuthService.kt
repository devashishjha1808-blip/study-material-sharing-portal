package com.studyportal.service

import com.studyportal.dto.AuthResponse
import com.studyportal.dto.LoginRequest
import com.studyportal.dto.RegisterRequest
import com.studyportal.exception.UserAlreadyExistsException
import com.studyportal.model.User
import com.studyportal.repository.UserRepository
import com.studyportal.security.JwtUtils
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class AuthService(
    private val userRepository: UserRepository,
    private val passwordEncoder: PasswordEncoder,
    private val authenticationManager: AuthenticationManager,
    private val jwtUtils: JwtUtils
) {

    @Transactional
    fun register(request: RegisterRequest): AuthResponse {
        if (userRepository.existsByEmail(request.email)) {
            throw UserAlreadyExistsException("An account with email '${request.email}' is already registered.")
        }

        val newUser = User(
            name = request.name.trim(),
            email = request.email.trim().lowercase(),
            password = passwordEncoder.encode(request.password),
            role = request.role
        )

        val savedUser = userRepository.save(newUser)
        val token = jwtUtils.generateToken(savedUser.email, savedUser.role.name, savedUser.id)

        return AuthResponse(
            token = token,
            userId = savedUser.id,
            name = savedUser.name,
            email = savedUser.email,
            role = savedUser.role.name,
            expiresInMs = jwtUtils.getExpirationDuration()
        )
    }

    fun login(request: LoginRequest): AuthResponse {
        authenticationManager.authenticate(
            UsernamePasswordAuthenticationToken(request.email.trim().lowercase(), request.password)
        )

        val user = userRepository.findByEmail(request.email.trim().lowercase())
            .orElseThrow { UsernameNotFoundException("User not found with email: ${request.email}") }

        val token = jwtUtils.generateToken(user.email, user.role.name, user.id)

        return AuthResponse(
            token = token,
            userId = user.id,
            name = user.name,
            email = user.email,
            role = user.role.name,
            expiresInMs = jwtUtils.getExpirationDuration()
        )
    }
}
