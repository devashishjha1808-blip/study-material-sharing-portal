package com.studyportal.model

import jakarta.persistence.*

@Entity
@Table(name = "subjects")
data class Subject(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @Column(nullable = false, unique = true)
    var code: String, // e.g. "CS301"

    @Column(nullable = false)
    var name: String, // e.g. "Database Management Systems"

    @Column(nullable = false)
    var department: String, // e.g. "Computer Science & Engineering"

    @Column(nullable = false)
    var semester: Int = 1
) {
    constructor() : this(0, "", "", "", 1)
}
