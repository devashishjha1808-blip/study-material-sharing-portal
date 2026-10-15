# Academic Experiments Complete Mapping Guide (1 to 15)
### Study Material Sharing Portal
*Standard Mapping for Full-Stack, Kotlin, Spring Boot, React, and Flutter Lab Evaluations*

This document provides complete evidence, implementation locations, code files, and viva questions for all 15 academic experiments mapped to this project.

---

## Complete Experiments Matrix

| Exp # | Prescribed Experiment / Module | Portal Implementation | Primary Files / Evidence | Viva / Practical Key Questions & Proof |
|:---:|---|---|---|---|
| **1** | **REST API + CRUD using Postman** | Full CRUD operations for Study Materials, Subjects, Categories, and User Authentication. | `postman/Study_Material_Portal.postman_collection.json`<br>`postman/Study_Material_Portal.postman_environment.json` | How are tokens dynamically chained? How do you test 400/401/404 response codes? |
| **2** | **React + Components + JSX** | Component hierarchy with JSX: Navbar, SubjectList, MaterialCard, MaterialList, MaterialDetails modal, Dashboard stats. | `frontend/src/components/`<br>`frontend/src/pages/Dashboard.jsx` | What is JSX? How does component decomposition promote reusability? |
| **3** | **Hooks + Context API + Forms** | `useState`, `useEffect`, `useMemo`, `useCallback`, `AuthContext`, `MaterialContext`, validated upload form with live validation. | `frontend/src/context/`<br>`frontend/src/components/UploadModal.jsx` | How does Context API eliminate prop drilling? What lifecycle triggers does `useEffect` replace? |
| **4** | **Kotlin Core OOP Concepts** | Class inheritance (`Person` -> `Student`, `Faculty`), data classes (`StudyMaterial`, `Subject`), companion objects, constructors. | `kotlin-core-demos/Experiment4_CoreConcepts.kt`<br>`backend/.../model/` | How do Kotlin `data class` equals/hashCode work? Explain companion objects vs Java static. |
| **5** | **Exceptions + Collections** | Custom exceptions (`InvalidSemesterException`), functional operations: `filter`, `map`, `groupBy`, `fold`, `reduce` on academic datasets. | `kotlin-core-demos/Experiment5_ExceptionsCollections.kt`<br>`backend/.../exception/` | How does Kotlin handle checked vs unchecked exceptions? Contrast eager vs lazy collections. |
| **6** | **Kotlin Spring Boot REST** | Production RESTful controllers, service layer, dependency injection with `@RestController`, `@Autowired`, `@RequestMapping`. | `backend/.../controller/`<br>`backend/.../service/` | Explain the Spring lifecycle and how `@RestController` combines `@Controller` and `@ResponseBody`. |
| **7** | **JPA / Hibernate + Database** | Object-Relational Mapping (ORM) with `@Entity`, `@Table`, `@ManyToOne`, `@Id`, Spring Data JPA repository queries, H2 & MySQL schemas. | `backend/.../entity/`<br>`backend/.../repository/` | How does Hibernate prevent N+1 queries? What is the role of `JpaRepository`? |
| **8** | **JWT Authentication & RBAC** | Stateless JWT authentication, Spring Security 6 filter chain, BCrypt password hashing, role-based authorization (Student, Faculty, Admin). | `backend/.../security/`<br>`backend/.../controller/AuthController.kt` | Explain JWT header, payload, signature. Why use stateless auth over HTTP sessions? |
| **9** | **Microservices Architecture** | Decomposition into two autonomous services: `UserService` (port 8081) and `MaterialService` (port 8082) communicating via REST. | `microservices/user-service/`<br>`microservices/material-service/`<br>`microservices/README.md` | What are the pros and cons of microservices vs monolith? How do services communicate synchronously vs asynchronously? |
| **10** | **Cloud / Server Deployment** | Multi-container `docker-compose.yml`, multi-stage `Dockerfile` for Spring Boot & React, environment variables, production profiles. | `docker-compose.yml`<br>`backend/Dockerfile`<br>`frontend/Dockerfile` | How do multi-stage Docker builds reduce image size? How are secrets injected via environment variables? |
| **11** | **Flutter + Dart Basics** | Mobile layout tree using Dart: `StatelessWidget`, `StatefulWidget`, `Scaffold`, `AppBar`, `ListView.builder`, `Card`, `Wrap`. | `mobile/lib/screens/`<br>`mobile/lib/widgets/` | What is the widget tree in Flutter? Differentiate `Stateless` vs `Stateful` widgets. |
| **12** | **Flutter State Management** | State management using `Provider` & `ChangeNotifier` (`AuthProvider`, `MaterialProvider`) driving UI updates reactively. | `mobile/lib/providers/` | How does `notifyListeners()` trigger widget rebuilds? Why use Provider over `setState` across screens? |
| **13** | **Flutter + REST Integration** | Asynchronous HTTP networking using `http` package, JSON deserialization, error handling, token injection in Authorization headers. | `mobile/lib/services/ApiService.dart` | How do Dart `Future` and `async`/`await` handle network I/O without freezing the UI thread? |
| **14** | **Firebase Auth + Firestore** | Demonstration of Firebase Authentication (email/password sign-in) and Cloud Firestore connectivity for real-time mobile metadata. | `mobile/lib/services/FirebaseService.dart` | What is NoSQL document structure in Firestore? How does Firebase Authentication secure mobile users? |
| **15** | **Final Integrated Project** | End-to-end full-stack portal: React Web & Flutter Mobile sharing identical UI design, consuming Kotlin Spring Boot API & Firebase features. | Entire repository & live demonstration sequence | Explain the end-to-end data flow from user tap on mobile/web to persistent database write. |

---

## Demonstration Sequence for Practical / Viva Examination

1. **Authentication Flow (Exp 8 & 14)**:
   - Register a new Student on the React Web Portal.
   - Show JWT token received and stored in browser session.
   - Switch role to Faculty or Admin and demonstrate elevated privileges.
2. **Browsing & Filtering (Exp 2, 3, 6, 7)**:
   - Browse by subject (e.g., *Database Management Systems CS301*).
   - Filter by semester (*Semester 5*) and category (*Lecture Notes* vs *PYQ*).
   - Search by keyword with instant reactive response.
3. **Resource Upload & Ownership Rules (Exp 3, 6, 7, 8)**:
   - Upload a new resource using the validated form.
   - Open the simulated in-app Document Previewer.
   - Verify that the author can Edit/Delete the note, but another student is prevented by server-side authorization.
4. **Mobile Experience (Exp 11, 12, 13, 15)**:
   - Open the Flutter mobile application.
   - Verify identical collegiate UI design system, color tokens, and layout.
   - Demonstrate Provider state updates and REST API connectivity.
5. **Academic Core & Microservices (Exp 1, 4, 5, 9, 10)**:
   - Run Postman collection displaying all green CRUD tests.
   - Run Kotlin OOP and Functional Collection demos (`Experiment4` & `Experiment5`).
   - Walk through the Microservices decomposition in `microservices/`.
