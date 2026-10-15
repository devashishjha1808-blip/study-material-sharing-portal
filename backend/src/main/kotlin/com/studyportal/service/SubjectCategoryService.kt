package com.studyportal.service

import com.studyportal.dto.CategoryDto
import com.studyportal.dto.SubjectDto
import com.studyportal.exception.ResourceNotFoundException
import com.studyportal.model.Category
import com.studyportal.model.Subject
import com.studyportal.repository.CategoryRepository
import com.studyportal.repository.SubjectRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class SubjectCategoryService(
    private val subjectRepository: SubjectRepository,
    private val categoryRepository: CategoryRepository
) {

    fun getAllSubjects(): List<SubjectDto> {
        return subjectRepository.findAll().map { it.toDto() }
    }

    fun getSubjectById(id: Long): Subject {
        return subjectRepository.findById(id)
            .orElseThrow { ResourceNotFoundException("Subject with ID #$id was not found.") }
    }

    @Transactional
    fun createSubject(dto: SubjectDto): SubjectDto {
        val subject = Subject(
            code = dto.code.trim().uppercase(),
            name = dto.name.trim(),
            department = dto.department.trim(),
            semester = dto.semester
        )
        return subjectRepository.save(subject).toDto()
    }

    fun getAllCategories(): List<CategoryDto> {
        return categoryRepository.findAll().map { it.toDto() }
    }

    fun getCategoryById(id: Long): Category {
        return categoryRepository.findById(id)
            .orElseThrow { ResourceNotFoundException("Category with ID #$id was not found.") }
    }

    @Transactional
    fun createCategory(dto: CategoryDto): CategoryDto {
        val category = Category(
            name = dto.name.trim(),
            slug = dto.slug.trim().lowercase(),
            description = dto.description.trim(),
            icon = dto.icon.trim()
        )
        return categoryRepository.save(category).toDto()
    }

    private fun Subject.toDto() = SubjectDto(id, code, name, department, semester)
    private fun Category.toDto() = CategoryDto(id, name, slug, description, icon)
}
