package com.studyportal.demo

/**
 * ===================================================================
 * EXPERIMENT 4: Kotlin Core Concepts & OOP Principles
 * Study Material Sharing Portal Academic Demonstration
 *
 * Demonstrates:
 * - Abstract classes, inheritance, polymorphism
 * - Encapsulation, getters/setters, properties
 * - Data classes with componentN() and copy()
 * - Companion objects and factory pattern
 * - Kotlin collections (immutable vs mutable)
 * ===================================================================
 */

// 1. Abstract Base Class demonstrating OOP inheritance
abstract class AcademicPerson(
    val id: Long,
    var name: String,
    val email: String
) {
    // Abstract property to be implemented by child classes
    abstract val roleName: String

    // Open method demonstrating polymorphism
    open fun displayProfile() {
        println("[$roleName Profile] ID: $id | Name: $name | Email: $email")
    }

    // Concrete method shared by all academic persons
    fun notify(message: String) {
        println("--> [Notification to $email]: $message")
    }
}

// 2. Student Subclass extending AcademicPerson
class Student(
    id: Long,
    name: String,
    email: String,
    val rollNumber: String,
    var semester: Int
) : AcademicPerson(id, name, email) {

    override val roleName: String = "STUDENT"

    // Custom getter/setter with domain validation
    var gpa: Double = 3.5
        set(value) {
            require(value in 0.0..10.0) { "GPA must be between 0.0 and 10.0" }
            field = value
        }

    override fun displayProfile() {
        super.displayProfile()
        println("   Roll No: $rollNumber | Current Semester: $semester | GPA: $gpa")
    }
}

// 3. Faculty Subclass extending AcademicPerson
class Faculty(
    id: Long,
    name: String,
    email: String,
    val department: String,
    val designation: String
) : AcademicPerson(id, name, email) {

    override val roleName: String = "FACULTY"

    override fun displayProfile() {
        super.displayProfile()
        println("   Department: $department | Designation: $designation")
    }

    fun verifyMaterial(material: AcademicResource) {
        println("Faculty $name is formally verifying resource '${material.title}'")
    }
}

// 4. Data Classes representing academic domain entities
data class CourseSubject(
    val id: Long,
    val code: String,
    val name: String,
    val department: String,
    val semester: Int
)

data class AcademicResource(
    val id: Long,
    val title: String,
    val subject: CourseSubject,
    val category: String, // e.g., Notes, PYQ, Lab Manual
    val semester: Int,
    val uploader: AcademicPerson,
    val downloadCount: Int = 0
) {
    // Companion object implementing factory patterns and constants
    companion object {
        const val MAX_ALLOWED_FILE_MB = 25

        fun createVerifiedNote(
            id: Long,
            title: String,
            subject: CourseSubject,
            faculty: Faculty
        ): AcademicResource {
            return AcademicResource(
                id = id,
                title = "$title [Verified by ${faculty.name}]",
                subject = subject,
                category = "Lecture Notes",
                semester = subject.semester,
                uploader = faculty,
                downloadCount = 100 // initial seed
            )
        }
    }
}

fun main() {
    println("================================================================")
    println("  EXPERIMENT 4: KOTLIN CORE OOP DEMONSTRATION")
    println("  Study Material Sharing Portal")
    println("================================================================\n")

    // Instantiating derived classes
    val student1 = Student(101L, "Aarav Sharma", "aarav@campus.edu", "21CS104", 5)
    val faculty1 = Faculty(201L, "Dr. R. K. Mukherjee", "mukherjee@campus.edu", "Computer Science", "Professor")

    student1.displayProfile()
    faculty1.displayProfile()
    println()

    // Creating domain data classes
    val dbmsSubject = CourseSubject(1L, "CS301", "Database Management Systems", "CSE", 5)
    val osSubject = CourseSubject(2L, "CS302", "Operating Systems", "CSE", 5)

    // Using companion object factory
    val facultyNotes = AcademicResource.createVerifiedNote(1L, "Relational Normalization Masterclass", dbmsSubject, faculty1)
    val studentNotes = AcademicResource(2L, "Process Scheduling Solved PYQs", osSubject, "PYQ", 5, student1, 240)

    // Demonstration of Kotlin Data Class Features: toString(), copy(), componentN()
    println("1. Kotlin Data Class toString():")
    println("   $facultyNotes")

    println("\n2. Kotlin Data Class copy() with modification:")
    val updatedStudentNotes = studentNotes.copy(downloadCount = studentNotes.downloadCount + 1)
    println("   Original downloads: ${studentNotes.downloadCount}")
    println("   Updated downloads: ${updatedStudentNotes.downloadCount}")

    println("\n3. Kotlin Destructuring Declaration:")
    val (id, title, subject, category) = studentNotes
    println("   Destructured -> ID: $id | Title: '$title' | Code: ${subject.code} | Cat: $category")

    println("\n4. Kotlin Collections Demonstration:")
    val repository = listOf(facultyNotes, studentNotes, updatedStudentNotes)
    println("   Total resources in repository: ${repository.size}")
    
    // Filtering collection by uploader role
    val facultyUploaded = repository.filter { it.uploader is Faculty }
    println("   Faculty-authored resources count: ${facultyUploaded.size}")

    println("\n[SUCCESS] Experiment 4 OOP concepts successfully demonstrated.")
}
