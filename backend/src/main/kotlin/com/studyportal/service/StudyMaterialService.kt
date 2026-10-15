package com.studyportal.service

import com.studyportal.dto.*
import com.studyportal.exception.ResourceNotFoundException
import com.studyportal.exception.UnauthorizedActionException
import com.studyportal.model.Role
import com.studyportal.model.StudyMaterial
import com.studyportal.repository.StudyMaterialRepository
import com.studyportal.repository.UserRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.time.LocalDateTime

@Service
class StudyMaterialService(
    private val materialRepository: StudyMaterialRepository,
    private val userRepository: UserRepository,
    private val subjectCategoryService: SubjectCategoryService
) {

    fun searchMaterials(
        query: String?,
        subjectId: Long?,
        categoryId: Long?,
        semester: Int?
    ): List<StudyMaterialResponse> {
        val sanitizedQuery = query?.trim()?.ifEmpty { null }
        return materialRepository.searchMaterials(sanitizedQuery, subjectId, categoryId, semester)
            .map { it.toResponse() }
    }

    @Transactional
    fun getMaterialById(id: Long): StudyMaterialResponse {
        val material = materialRepository.findById(id)
            .orElseThrow { ResourceNotFoundException("Study Material #$id not found in catalogue.") }
        
        // Increment views
        material.views += 1
        materialRepository.save(material)

        return material.toResponse()
    }

    fun getMaterialsByUploader(email: String): List<StudyMaterialResponse> {
        val user = userRepository.findByEmail(email)
            .orElseThrow { ResourceNotFoundException("User not found: $email") }
        return materialRepository.findByUploaderId(user.id).map { it.toResponse() }
    }

    @Transactional
    fun createMaterial(req: CreateMaterialRequest, uploaderEmail: String): StudyMaterialResponse {
        val user = userRepository.findByEmail(uploaderEmail)
            .orElseThrow { ResourceNotFoundException("User not found: $uploaderEmail") }

        val subject = subjectCategoryService.getSubjectById(req.subjectId)
        val category = subjectCategoryService.getCategoryById(req.categoryId)

        val material = StudyMaterial(
            title = req.title.trim(),
            description = req.description?.trim() ?: "No additional description provided.",
            subject = subject,
            category = category,
            semester = req.semester,
            fileUrl = req.fileUrl?.trim() ?: "https://raw.githubusercontent.com/campus/assets/sample.pdf",
            fileSize = req.fileSize ?: "2.5 MB",
            fileType = req.fileType ?: "PDF",
            pageCount = req.pageCount ?: 12,
            downloads = 0,
            views = 1,
            uploader = user,
            isVerified = user.role == Role.FACULTY || user.role == Role.ADMIN,
            createdAt = LocalDateTime.now(),
            updatedAt = LocalDateTime.now()
        )

        val saved = materialRepository.save(material)
        return saved.toResponse()
    }

    @Transactional
    fun updateMaterial(
        id: Long,
        req: UpdateMaterialRequest,
        userEmail: String
    ): StudyMaterialResponse {
        val material = materialRepository.findById(id)
            .orElseThrow { ResourceNotFoundException("Study Material #$id not found.") }

        val currentUser = userRepository.findByEmail(userEmail)
            .orElseThrow { ResourceNotFoundException("User not found: $userEmail") }

        // Check ownership or admin role
        if (material.uploader.id != currentUser.id && currentUser.role != Role.ADMIN) {
            throw UnauthorizedActionException("You can only modify study materials that you uploaded.")
        }

        req.title?.let { material.title = it.trim() }
        req.description?.let { material.description = it.trim() }
        req.semester?.let { material.semester = it }
        req.fileUrl?.let { material.fileUrl = it.trim() }
        req.subjectId?.let { material.subject = subjectCategoryService.getSubjectById(it) }
        req.categoryId?.let { material.category = subjectCategoryService.getCategoryById(it) }

        if (req.isVerified != null && currentUser.role != Role.STUDENT) {
            material.isVerified = req.isVerified
        }

        material.updatedAt = LocalDateTime.now()
        return materialRepository.save(material).toResponse()
    }

    @Transactional
    fun deleteMaterial(id: Long, userEmail: String) {
        val material = materialRepository.findById(id)
            .orElseThrow { ResourceNotFoundException("Study Material #$id not found.") }

        val currentUser = userRepository.findByEmail(userEmail)
            .orElseThrow { ResourceNotFoundException("User not found: $userEmail") }

        // Check ownership or admin role
        if (material.uploader.id != currentUser.id && currentUser.role != Role.ADMIN) {
            throw UnauthorizedActionException("You can only delete study materials that you uploaded.")
        }

        materialRepository.delete(material)
    }

    @Transactional
    fun incrementDownload(id: Long): StudyMaterialResponse {
        val material = materialRepository.findById(id)
            .orElseThrow { ResourceNotFoundException("Study Material #$id not found.") }
        material.downloads += 1
        return materialRepository.save(material).toResponse()
    }

    private fun StudyMaterial.toResponse() = StudyMaterialResponse(
        id = id,
        title = title,
        description = description,
        subject = SubjectDto(subject.id, subject.code, subject.name, subject.department, subject.semester),
        category = CategoryDto(category.id, category.name, category.slug, category.description, category.icon),
        semester = semester,
        fileUrl = fileUrl,
        fileSize = fileSize,
        fileType = fileType,
        pageCount = pageCount,
        downloads = downloads,
        views = views,
        uploader = UserSummaryDto(uploader.id, uploader.name, uploader.email, uploader.role.name),
        isVerified = isVerified,
        createdAt = createdAt,
        updatedAt = updatedAt
    )
}
