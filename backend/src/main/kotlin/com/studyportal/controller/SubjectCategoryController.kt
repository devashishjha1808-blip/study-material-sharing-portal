package com.studyportal.controller

import com.studyportal.dto.CategoryDto
import com.studyportal.dto.SubjectDto
import com.studyportal.service.SubjectCategoryService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = ["*"])
class SubjectCategoryController(private val service: SubjectCategoryService) {

    @GetMapping("/subjects")
    fun getAllSubjects(): ResponseEntity<List<SubjectDto>> {
        return ResponseEntity.ok(service.getAllSubjects())
    }

    @PostMapping("/subjects")
    fun createSubject(@RequestBody dto: SubjectDto): ResponseEntity<SubjectDto> {
        val created = service.createSubject(dto)
        return ResponseEntity.status(HttpStatus.CREATED).body(created)
    }

    @GetMapping("/categories")
    fun getAllCategories(): ResponseEntity<List<CategoryDto>> {
        return ResponseEntity.ok(service.getAllCategories())
    }

    @PostMapping("/categories")
    fun createCategory(@RequestBody dto: CategoryDto): ResponseEntity<CategoryDto> {
        val created = service.createCategory(dto)
        return ResponseEntity.status(HttpStatus.CREATED).body(created)
    }
}
