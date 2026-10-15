package com.studyportal.config

import com.studyportal.model.*
import com.studyportal.repository.CategoryRepository
import com.studyportal.repository.StudyMaterialRepository
import com.studyportal.repository.SubjectRepository
import com.studyportal.repository.UserRepository
import org.springframework.boot.CommandLineRunner
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Component
import java.time.LocalDateTime

@Component
class DataLoader(
    private val userRepository: UserRepository,
    private val subjectRepository: SubjectRepository,
    private val categoryRepository: CategoryRepository,
    private val materialRepository: StudyMaterialRepository,
    private val passwordEncoder: PasswordEncoder
) : CommandLineRunner {

    override fun run(vararg args: String?) {
        if (userRepository.count() > 0) return

        println("--> [DataLoader] Seeding Study Material Sharing Portal database...")

        // 1. Seed Users (Student, Faculty, Admin)
        val defaultPassword = passwordEncoder.encode("Password123!")

        val studentUser = userRepository.save(
            User(
                name = "Aarav Sharma",
                email = "student@campus.edu",
                password = defaultPassword,
                role = Role.STUDENT
            )
        )

        val facultyUser = userRepository.save(
            User(
                name = "Dr. R. K. Mukherjee",
                email = "faculty@campus.edu",
                password = defaultPassword,
                role = Role.FACULTY
            )
        )

        val adminUser = userRepository.save(
            User(
                name = "Academic Administrator",
                email = "admin@campus.edu",
                password = defaultPassword,
                role = Role.ADMIN
            )
        )

        val student2 = userRepository.save(
            User(
                name = "Priya Sundaram",
                email = "priya.student@campus.edu",
                password = defaultPassword,
                role = Role.STUDENT
            )
        )

        // 2. Seed Subjects
        val dbms = subjectRepository.save(
            Subject(code = "CS301", name = "Database Management Systems", department = "Computer Science & Engineering", semester = 5)
        )
        val os = subjectRepository.save(
            Subject(code = "CS302", name = "Operating Systems", department = "Computer Science & Engineering", semester = 5)
        )
        val cn = subjectRepository.save(
            Subject(code = "CS401", name = "Computer Networks", department = "Computer Science & Engineering", semester = 6)
        )
        val dsa = subjectRepository.save(
            Subject(code = "CS201", name = "Data Structures & Algorithms", department = "Computer Science & Engineering", semester = 3)
        )
        val math = subjectRepository.save(
            Subject(code = "MA201", name = "Discrete Mathematics & Graph Theory", department = "Mathematics", semester = 3)
        )
        val ai = subjectRepository.save(
            Subject(code = "CS405", name = "Machine Learning & Neural Networks", department = "Artificial Intelligence", semester = 7)
        )

        // 3. Seed Categories
        val notes = categoryRepository.save(
            Category(name = "Lecture Notes", slug = "notes", description = "Curated faculty and student handwritten or typed classroom notes.", icon = "book")
        )
        val pyq = categoryRepository.save(
            Category(name = "Previous Year Papers (PYQ)", slug = "pyq", description = "Past 5-year mid-term and end-term university examination question papers.", icon = "file-text")
        )
        val lab = categoryRepository.save(
            Category(name = "Lab Manuals & Code", slug = "lab-manual", description = "Experiment documentation, observation guides, and verified code implementations.", icon = "terminal")
        )
        val assignments = categoryRepository.save(
            Category(name = "Assignments & Solutions", slug = "assignment", description = "Weekly assignment problem sets with verified solution breakdowns.", icon = "check-square")
        )

        // 4. Seed Study Materials
        val materials = listOf(
            StudyMaterial(
                title = "CS301 Unit 2 - Normalization & BCNF Solved Numerical Problems",
                description = "Detailed handwritten notes by Prof. Mukherjee explaining 1NF, 2NF, 3NF, BCNF step-by-step with 15 previous university exam solved decomposition questions.",
                subject = dbms,
                category = notes,
                semester = 5,
                fileUrl = "https://raw.githubusercontent.com/campus/assets/sample-dbms-unit2.pdf",
                fileSize = "3.8 MB",
                fileType = "PDF",
                pageCount = 38,
                downloads = 1420,
                views = 4280,
                uploader = facultyUser,
                isVerified = true,
                createdAt = LocalDateTime.now().minusDays(18)
            ),
            StudyMaterial(
                title = "CS302 CPU Scheduling Algorithms & Deadlock Prevention Cheatsheet",
                description = "Complete formula sheet and Gantt chart walkthroughs for FCFS, SJF, Priority Scheduling, Round Robin, Banker's Algorithm, and Resource Allocation Graphs.",
                subject = os,
                category = notes,
                semester = 5,
                fileUrl = "https://raw.githubusercontent.com/campus/assets/sample-os-scheduling.pdf",
                fileSize = "2.2 MB",
                fileType = "PDF",
                pageCount = 24,
                downloads = 1180,
                views = 3590,
                uploader = studentUser,
                isVerified = true,
                createdAt = LocalDateTime.now().minusDays(12)
            ),
            StudyMaterial(
                title = "CS301 DBMS End-Semester Question Papers (2021-2025 Solved)",
                description = "Compilation of past 5 years university end-semester papers with typed model answer keys, ER diagram notations, and relational algebra queries.",
                subject = dbms,
                category = pyq,
                semester = 5,
                fileUrl = "https://raw.githubusercontent.com/campus/assets/sample-dbms-pyq-bundle.pdf",
                fileSize = "5.6 MB",
                fileType = "PDF",
                pageCount = 62,
                downloads = 2890,
                views = 7410,
                uploader = facultyUser,
                isVerified = true,
                createdAt = LocalDateTime.now().minusDays(45)
            ),
            StudyMaterial(
                title = "CS201 Data Structures Lab Record - All 12 Experiments with C++ Code",
                description = "Complete lab record containing verified code for Linked Lists, Stacks, Queues, Binary Search Trees, AVL rotations, and Dijkstra's Algorithm.",
                subject = dsa,
                category = lab,
                semester = 3,
                fileUrl = "https://raw.githubusercontent.com/campus/assets/sample-dsa-lab-manual.pdf",
                fileSize = "4.1 MB",
                fileType = "PDF",
                pageCount = 54,
                downloads = 2040,
                views = 5620,
                uploader = student2,
                isVerified = true,
                createdAt = LocalDateTime.now().minusDays(30)
            ),
            StudyMaterial(
                title = "CS401 Computer Networks Subnetting & CIDR Calculation Guide",
                description = "In-depth visual guide on VLSM, Classless Inter-Domain Routing (CIDR), IP packet fragmentation calculations, and Wireshark trace analysis.",
                subject = cn,
                category = notes,
                semester = 6,
                fileUrl = "https://raw.githubusercontent.com/campus/assets/sample-cn-subnetting.pdf",
                fileSize = "3.1 MB",
                fileType = "PDF",
                pageCount = 30,
                downloads = 890,
                views = 2400,
                uploader = facultyUser,
                isVerified = true,
                createdAt = LocalDateTime.now().minusDays(8)
            ),
            StudyMaterial(
                title = "MA201 Discrete Mathematics Graph Theory & Tree Traversal PYQ Set",
                description = "Eulerian circuits, Hamiltonian paths, Planar graphs, chromatic number proofs, and tree recurrence relations solved questions.",
                subject = math,
                category = pyq,
                semester = 3,
                fileUrl = "https://raw.githubusercontent.com/campus/assets/sample-discrete-maths.pdf",
                fileSize = "2.9 MB",
                fileType = "PDF",
                pageCount = 36,
                downloads = 760,
                views = 1950,
                uploader = studentUser,
                isVerified = false,
                createdAt = LocalDateTime.now().minusDays(4)
            ),
            StudyMaterial(
                title = "CS405 Machine Learning Assignment 3 - Backpropagation & CNN Implementation",
                description = "Step-by-step mathematical derivation of gradient descent backpropagation in Multi-Layer Perceptrons and PyTorch MNIST classifier code.",
                subject = ai,
                category = assignments,
                semester = 7,
                fileUrl = "https://raw.githubusercontent.com/campus/assets/sample-ml-backprop.pdf",
                fileSize = "4.5 MB",
                fileType = "PDF",
                pageCount = 42,
                downloads = 940,
                views = 2780,
                uploader = facultyUser,
                isVerified = true,
                createdAt = LocalDateTime.now().minusDays(6)
            )
        )

        materialRepository.saveAll(materials)
        println("--> [DataLoader] Seeded ${userRepository.count()} users, ${subjectRepository.count()} subjects, ${categoryRepository.count()} categories, and ${materialRepository.count()} study materials.")
    }
}
