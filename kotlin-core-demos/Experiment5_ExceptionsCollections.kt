package com.studyportal.demo

/**
 * ===================================================================
 * EXPERIMENT 5: Kotlin Exceptions, Validation & Collections Operations
 * Study Material Sharing Portal Academic Demonstration
 *
 * Demonstrates:
 * - Custom checked & unchecked domain exceptions
 * - Try-Catch-Finally and domain rule validation
 * - Functional collection pipeline: filter, map, groupBy, fold, reduce
 * ===================================================================
 */

// 1. Custom Domain Exception Hierarchy
sealed class StudyPortalException(message: String) : Exception(message)

class ResourceNotFoundException(resourceId: Long) : 
    StudyPortalException("Academic resource with ID #$resourceId was not found in catalog.")

class InvalidSemesterException(sem: Int) : 
    StudyPortalException("Invalid academic semester: $sem. Allowed university semesters are 1 through 8.")

class FileExceedsSizeLimitException(sizeMb: Double, maxMb: Double) : 
    StudyPortalException("Uploaded file size ($sizeMb MB) exceeds the maximum allowed limit of $sizeMb MB.")

// 2. Study Resource Domain Entity for Functional Testing
data class StudyDoc(
    val id: Long,
    val title: String,
    val subjectCode: String,
    val semester: Int,
    val fileSizeMb: Double,
    val downloads: Int,
    val rating: Double // 1.0 to 5.0
)

// 3. Validator Class Demonstrating Error Handling
class StudyPortalValidator {
    fun validateUpload(title: String, semester: Int, fileSizeMb: Double) {
        if (title.isBlank()) {
            throw IllegalArgumentException("Title cannot be blank or empty.")
        }
        if (semester !in 1..8) {
            throw InvalidSemesterException(semester)
        }
        if (fileSizeMb > 25.0) {
            throw FileExceedsSizeLimitException(fileSizeMb, 25.0)
        }
    }
}

fun main() {
    println("================================================================")
    println("  EXPERIMENT 5: KOTLIN EXCEPTIONS & FUNCTIONAL COLLECTIONS")
    println("  Study Material Sharing Portal")
    println("================================================================\n")

    val validator = StudyPortalValidator()

    // 1. Exception Handling Demonstration
    println("--- PART 1: Exception Handling Demonstration ---")
    val testCases = listOf(
        Triple("Valid Title", 5, 12.5),
        Triple("Invalid Sem", 10, 4.0),
        Triple("Oversized PDF", 4, 38.0)
    )

    for ((title, sem, size) in testCases) {
        try {
            print("Testing upload ('$title', Sem: $sem, Size: ${size}MB) -> ")
            validator.validateUpload(title, sem, size)
            println("[PASSED] Successfully validated.")
        } catch (e: InvalidSemesterException) {
            println("[CAUGHT InvalidSemesterException]: ${e.message}")
        } catch (e: FileExceedsSizeLimitException) {
            println("[CAUGHT FileExceedsSizeLimitException]: ${e.message}")
        } catch (e: Exception) {
            println("[CAUGHT Generic Exception]: ${e.message}")
        } finally {
            // finally block demo
            // println("   Validation cycle concluded.")
        }
    }

    // 2. Functional Collections Demonstration
    println("\n--- PART 2: Advanced Functional Collection Operations ---")
    val materials = listOf(
        StudyDoc(101, "DBMS SQL Indexing & Query Optimization", "CS301", 5, 4.2, 1250, 4.8),
        StudyDoc(102, "Operating Systems Deadlock Detection Algorithms", "CS302", 5, 3.1, 980, 4.6),
        StudyDoc(103, "Computer Networks OSI vs TCP/IP Protocols", "CS401", 6, 5.0, 1540, 4.9),
        StudyDoc(104, "Data Structures Binary Trees & Heaps", "CS201", 3, 2.8, 2300, 4.9),
        StudyDoc(105, "Discrete Mathematics Graph Theory Notes", "MA201", 3, 3.9, 870, 4.3),
        StudyDoc(106, "Compiler Design Lexical & Syntax Analysis", "CS402", 6, 6.1, 620, 4.4),
        StudyDoc(107, "Machine Learning Supervised Algorithms Lab", "CS405", 7, 7.8, 1890, 4.9)
    )

    // A. FILTER: Find materials with rating >= 4.7
    val highRated = materials.filter { it.rating >= 4.7 }
    println("\nA. FILTER (High-Rated Resources >= 4.7):")
    highRated.forEach { println("   • [${it.subjectCode}] ${it.title} (Rating: ${it.rating} ★, Downloads: ${it.downloads})") }

    // B. MAP: Transform into simplified summary strings
    val summaries = materials.map { "${it.subjectCode}: ${it.title} [${it.downloads} dl]" }
    println("\nB. MAP (Summarized List, first 3):")
    summaries.take(3).forEach { println("   • $it") }

    // C. GROUP BY: Group materials by Semester
    println("\nC. GROUP BY (Materials grouped by Semester):")
    val groupedBySem = materials.groupBy { it.semester }
    groupedBySem.forEach { (sem, docs) ->
        println("   Semester $sem: ${docs.size} materials (${docs.joinToString { it.subjectCode }})")
    }

    // D. FOLD & REDUCE: Calculate total downloads and aggregate statistics
    val totalDownloads = materials.map { it.downloads }.reduce { acc, dl -> acc + dl }
    val totalFileSize = materials.fold(0.0) { sum, doc -> sum + doc.fileSizeMb }
    val averageRating = materials.map { it.rating }.average()

    println("\nD. REDUCE & FOLD (Aggregations):")
    println("   • Total Portal Downloads (using reduce): $totalDownloads downloads")
    println("   • Total Catalog Storage (using fold):    ${String.format("%.2f", totalFileSize)} MB")
    println("   • Catalog Average Rating:               ${String.format("%.2f", averageRating)} / 5.0 ★")

    println("\n[SUCCESS] Experiment 5 Exceptions & Collections successfully demonstrated.")
}
