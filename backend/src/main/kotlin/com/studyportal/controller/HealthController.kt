package com.studyportal.controller

import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.time.LocalDateTime

@RestController
@RequestMapping("/api/health")
@CrossOrigin(origins = ["*"])
class HealthController {

    @GetMapping
    fun health(): ResponseEntity<Map<String, Any>> {
        return ResponseEntity.ok(
            mapOf(
                "status" to "UP",
                "service" to "Study Material Sharing Portal Backend",
                "version" to "1.0.0",
                "timestamp" to LocalDateTime.now().toString(),
                "runtime" to "Kotlin + Spring Boot 3 + JPA"
            )
        )
    }
}
