package com.studyportal.dto

import jakarta.validation.constraints.Max
import jakarta.validation.constraints.Min
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.NotNull
import java.time.LocalDateTime

data class CreateMaterialRequest(
    @field:NotBlank(message = "Title is required")
    val title: String,

    val description: String? = null,

    @field:NotNull(message = "Subject ID is required")
    val subjectId: Long,

    @field:NotNull(message = "Category ID is required")
    val categoryId: Long,

    @field:NotNull(message = "Semester is required")
    @field:Min(value = 1, message = "Semester must be between 1 and 8")
    @field:Max(value = 8, message = "Semester must be between 1 and 8")
    val semester: Int,

    val fileUrl: String? = null,
    val fileSize: String? = "2.5 MB",
    val fileType: String? = "PDF",
    val pageCount: Int? = 1
)

data class UpdateMaterialRequest(
    val title: String?,
    val description: String?,
    val subjectId: Long?,
    val categoryId: Long?,
    val semester: Int?,
    val fileUrl: String?,
    val isVerified: Boolean?
)

data class SubjectDto(
    val id: Long,
    val code: String,
    val name: String,
    val department: String,
    val semester: Int
)

data class CategoryDto(
    val id: Long,
    val name: String,
    val slug: String,
    val description: String,
    val icon: String
)

data class StudyMaterialResponse(
    val id: Long,
    val title: String,
    val description: String,
    val subject: SubjectDto,
    val category: CategoryDto,
    val semester: Int,
    val fileUrl: String,
    val fileSize: String,
    val fileType: String,
    val pageCount: Int,
    val downloads: Int,
    val views: Int,
    val uploader: UserSummaryDto,
    val isVerified: Boolean,
    val createdAt: LocalDateTime,
    val updatedAt: LocalDateTime
)
