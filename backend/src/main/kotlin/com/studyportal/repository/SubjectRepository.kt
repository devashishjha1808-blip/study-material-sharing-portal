package com.studyportal.repository

import com.studyportal.model.Subject
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.Optional

@Repository
interface SubjectRepository : JpaRepository<Subject, Long> {
    fun findByCode(code: String): Optional<Subject>
    fun findBySemester(semester: Int): List<Subject>
}
