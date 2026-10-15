package com.studyportal.model

import jakarta.persistence.*

@Entity
@Table(name = "categories")
data class Category(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @Column(nullable = false, unique = true)
    var name: String, // e.g. "Lecture Notes", "Previous Year Papers (PYQ)"

    @Column(nullable = false, unique = true)
    var slug: String, // e.g. "notes", "pyq", "lab-manual"

    @Column(nullable = false)
    var description: String,

    @Column(nullable = false)
    var icon: String = "book" // UI icon key
) {
    constructor() : this(0, "", "", "", "book")
}
