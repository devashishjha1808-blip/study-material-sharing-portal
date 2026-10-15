package com.studyportal.repository

import com.studyportal.model.StudyMaterial
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository

@Repository
interface StudyMaterialRepository : JpaRepository<StudyMaterial, Long> {

    fun findByUploaderId(uploaderId: Long): List<StudyMaterial>

    @Query("""
        SELECT m FROM StudyMaterial m
        WHERE (:subjectId IS NULL OR m.subject.id = :subjectId)
          AND (:categoryId IS NULL OR m.category.id = :categoryId)
          AND (:semester IS NULL OR m.semester = :semester)
          AND (
            :query IS NULL OR :query = '' OR
            LOWER(m.title) LIKE LOWER(CONCAT('%', :query, '%')) OR
            LOWER(m.description) LIKE LOWER(CONCAT('%', :query, '%')) OR
            LOWER(m.subject.name) LIKE LOWER(CONCAT('%', :query, '%')) OR
            LOWER(m.subject.code) LIKE LOWER(CONCAT('%', :query, '%'))
          )
        ORDER BY m.createdAt DESC
    """)
    fun searchMaterials(
        @Param("query") query: String?,
        @Param("subjectId") subjectId: Long?,
        @Param("categoryId") categoryId: Long?,
        @Param("semester") semester: Int?
    ): List<StudyMaterial>
}
