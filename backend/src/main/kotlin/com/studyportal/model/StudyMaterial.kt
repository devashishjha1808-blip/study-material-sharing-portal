package com.studyportal.model

import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
@Table(name = "study_materials")
data class StudyMaterial(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @Column(nullable = false)
    var title: String,

    @Column(nullable = false, length = 2000)
    var description: String,

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "subject_id", nullable = false)
    var subject: Subject,

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "category_id", nullable = false)
    var category: Category,

    @Column(nullable = false)
    var semester: Int,

    @Column(nullable = false)
    var fileUrl: String,

    @Column(nullable = false)
    var fileSize: String = "2.5 MB",

    @Column(nullable = false)
    var fileType: String = "PDF",

    @Column(nullable = false)
    var pageCount: Int = 1,

    @Column(nullable = false)
    var downloads: Int = 0,

    @Column(nullable = false)
    var views: Int = 0,

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    var uploader: User,

    @Column(nullable = false)
    var isVerified: Boolean = false,

    @Column(nullable = false, updatable = false)
    val createdAt: LocalDateTime = LocalDateTime.now(),

    @Column(nullable = false)
    var updatedAt: LocalDateTime = LocalDateTime.now()
) {
    constructor() : this(
        0, "", "", Subject(), Category(), 1, "", "2.5 MB", "PDF", 1, 0, 0,
        User(), false, LocalDateTime.now(), LocalDateTime.now()
    )
}
