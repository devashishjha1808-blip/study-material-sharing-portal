package com.studyportal.controller

import com.studyportal.dto.CreateMaterialRequest
import com.studyportal.dto.StudyMaterialResponse
import com.studyportal.dto.UpdateMaterialRequest
import com.studyportal.service.StudyMaterialService
import jakarta.validation.Valid
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.core.Authentication
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/materials")
@CrossOrigin(origins = ["*"])
class StudyMaterialController(private val materialService: StudyMaterialService) {

    @GetMapping
    fun getMaterials(
        @RequestParam(required = false) query: String?,
        @RequestParam(required = false) subjectId: Long?,
        @RequestParam(required = false) categoryId: Long?,
        @RequestParam(required = false) semester: Int?
    ): ResponseEntity<List<StudyMaterialResponse>> {
        val list = materialService.searchMaterials(query, subjectId, categoryId, semester)
        return ResponseEntity.ok(list)
    }

    @GetMapping("/{id}")
    fun getMaterialById(@PathVariable id: Long): ResponseEntity<StudyMaterialResponse> {
        val item = materialService.getMaterialById(id)
        return ResponseEntity.ok(item)
    }

    @GetMapping("/my-uploads")
    fun getMyUploads(authentication: Authentication): ResponseEntity<List<StudyMaterialResponse>> {
        val list = materialService.getMaterialsByUploader(authentication.name)
        return ResponseEntity.ok(list)
    }

    @PostMapping
    fun createMaterial(
        @Valid @RequestBody req: CreateMaterialRequest,
        authentication: Authentication
    ): ResponseEntity<StudyMaterialResponse> {
        val created = materialService.createMaterial(req, authentication.name)
        return ResponseEntity.status(HttpStatus.CREATED).body(created)
    }

    @PutMapping("/{id}")
    fun updateMaterial(
        @PathVariable id: Long,
        @RequestBody req: UpdateMaterialRequest,
        authentication: Authentication
    ): ResponseEntity<StudyMaterialResponse> {
        val updated = materialService.updateMaterial(id, req, authentication.name)
        return ResponseEntity.ok(updated)
    }

    @DeleteMapping("/{id}")
    fun deleteMaterial(
        @PathVariable id: Long,
        authentication: Authentication
    ): ResponseEntity<Map<String, String>> {
        materialService.deleteMaterial(id, authentication.name)
        return ResponseEntity.ok(mapOf("message" to "Material #$id successfully deleted."))
    }

    @PostMapping("/{id}/download")
    fun registerDownload(@PathVariable id: Long): ResponseEntity<StudyMaterialResponse> {
        val updated = materialService.incrementDownload(id)
        return ResponseEntity.ok(updated)
    }
}
