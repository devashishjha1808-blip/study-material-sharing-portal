# CampusPortal — Study Material Sharing Portal
### Integrated Full-Stack & Mobile Academic System Mapped to Experiments 1–15

[![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen.svg)]()
[![Backend](https://img.shields.io/badge/Backend-Kotlin%20%7C%20Spring%20Boot%203-blue.svg)]()
[![Database](https://img.shields.io/badge/Persistence-JPA%20%2F%20Hibernate%20%7C%20H2%20%2F%20MySQL-orange.svg)]()
[![Frontend](https://img.shields.io/badge/Web-React%2018%20%7C%20Vite%20%7C%20Context%20API-61dafb.svg)]()
[![Mobile](https://img.shields.io/badge/Mobile-Flutter%20%7C%20Dart%20%7C%20Provider-02569B.svg)]()
[![Security](https://img.shields.io/badge/Security-Stateless%20JWT%20%7C%20BCrypt-red.svg)]()
[![License](https://img.shields.io/badge/License-Academic%20Open%20Source-purple.svg)]()

---

## 1. Executive Summary & Core Promise

The **Study Material Sharing Portal** is a centralized, multi-platform academic repository engineered for college students and faculty. It replaces chaotic communication channels (chat groups, unsorted drives, personal flash drives) with a structured, verified catalog for lecture notes, previous year question papers (PYQs), laboratory manuals, and assignments.

This project is built from the ground up to map seamlessly to **all 15 prescribed academic computer science experiments**, linking REST concepts, React, Kotlin OOP, Spring Boot, JPA persistence, JWT security, microservice decomposition, Docker deployment, Flutter mobile engineering, and Firebase cloud services into one coherent, enterprise-grade project.

---

## 2. Shared Visual Identity (Web & Mobile)

Both the **React Web Portal** and the **Flutter Mobile Client** share an **identical, non-AI handcrafted academic design system**:
- **University Palette**: Deep collegiate navy (`#0F172A`), slate surface canvas (`#F8FAFC`), university royal blue (`#2563EB`), and verified faculty emerald (`#059669`).
- **Standardized Resource Tags**:
  - `Lecture Notes`: Slate Blue badge
  - `Previous Year Papers (PYQ)`: Amber Gold badge
  - `Lab Manuals & Code`: Teal Emerald badge
  - `Assignments & Solutions`: Purple Violet badge
- **Academic Hierarchy**: Clear course codes (`CS301`, `CS302`, `MA201`), semester tags (`Sem 1` through `Sem 8`), file sizes, page counts, verified uploader badges, and simulated document preview readers.
- **Viva Demo Switcher**: Instant role toggling between `Student`, `Faculty`, and `Admin` in both web and mobile headers for live RBAC examination without re-authenticating.

---

## 3. High-Level System Architecture

```
+-------------------------------------------------------------------------+
|                               CLIENT TIER                               |
|                                                                         |
|    +------------------------------+     +--------------------------+    |
|    |      React 18 Web Portal     |     |   Flutter Mobile Client  |    |
|    |  - Hooks + Context API       |     |  - Provider Architecture |    |
|    |  - Document Preview Reader   |     |  - Identical UI & Theme  |    |
|    |  - Live Viva & API Console   |     |  - Material 3 Components |    |
|    +--------------+---------------+     +------------+-------------+    |
+-------------------|----------------------------------|------------------+
                    | HTTPS / JSON                     | HTTPS / JSON
                    v                                  v
+-------------------------------------------------------------------------+
|                               API GATEWAY                               |
|                     CORS Configuration & Web Routing                    |
+-------------------------------------------------------------------------+
                    |
                    v
+-------------------------------------------------------------------------+
|                           APPLICATION SERVER                            |
|                  Kotlin + Spring Boot 3 REST Services                   |
|                                                                         |
|   +--------------------+  +--------------------+  +-----------------+   |
|   |   Security Filter  |  |  Controller Layer  |  |  Service Layer  |   |
|   |  - JWT Filter      |  |  - AuthController  |  |  - Auth Service |   |
|   |  - BCrypt Hashing  |  |  - MaterialCtrl    |  |  - Material Svc |   |
|   |  - Role Checks     |  |  - Subject/CatCtrl |  |  - Subject Svc  |   |
|   +--------------------+  +--------------------+  +-----------------+   |
+-------------------------------------------------------------------------+
                    |
                    v
+-------------------------------------------------------------------------+
|                           PERSISTENCE TIER                              |
|                         JPA / Hibernate ORM                             |
|                                                                         |
|            +-----------------------+   +----------------------+         |
|            |  H2 In-Memory (Dev)   |   |   MySQL 8.0 (Prod)   |         |
|            |  Zero-config startup  |   |   Persistent storage |         |
|            +-----------------------+   +----------------------+         |
+-------------------------------------------------------------------------+
```

---

## 4. Complete Mapping to All 15 Experiments

| Exp # | Prescribed Academic Module | Portal Implementation | Key Deliverable Files |
|:---:|---|---|---|
| **1** | **REST API + CRUD using Postman** | Full CRUD for materials, subjects, categories, and JWT auth chaining. | [`postman/Study_Material_Portal.postman_collection.json`](file:///postman/Study_Material_Portal.postman_collection.json) |
| **2** | **React + Components + JSX** | Component hierarchy with JSX: Navbar, MaterialCard, MaterialList, Dashboard stats. | [`frontend/src/components/`](file:///frontend/src/components/) |
| **3** | **Hooks + Context API + Forms** | `useState`, `useEffect`, `AuthContext`, `MaterialContext`, validated upload form. | [`frontend/src/context/`](file:///frontend/src/context/) |
| **4** | **Kotlin Core Concepts & OOP** | Class inheritance (`Person` -> `Student`, `Faculty`), data classes, companion objects. | [`kotlin-core-demos/Experiment4_CoreConcepts.kt`](file:///kotlin-core-demos/Experiment4_CoreConcepts.kt) |
| **5** | **Exceptions + Collections Operations** | Custom exceptions (`InvalidSemesterException`), functional pipeline (`filter`, `map`, `reduce`). | [`kotlin-core-demos/Experiment5_ExceptionsCollections.kt`](file:///kotlin-core-demos/Experiment5_ExceptionsCollections.kt) |
| **6** | **Kotlin Spring Boot REST** | Production REST controllers, service layer, dependency injection with `@RestController`. | [`backend/src/main/kotlin/com/studyportal/controller/`](file:///backend/src/main/kotlin/com/studyportal/controller/) |
| **7** | **JPA / Hibernate + Database** | ORM mappings (`@Entity`, `@Table`, `@ManyToOne`), Spring Data JPA repositories, H2/MySQL. | [`backend/src/main/kotlin/com/studyportal/model/`](file:///backend/src/main/kotlin/com/studyportal/model/) |
| **8** | **JWT Authentication & RBAC** | Stateless JWT authentication, Spring Security 6 filter chain, BCrypt hashing, role authorization. | [`backend/src/main/kotlin/com/studyportal/security/`](file:///backend/src/main/kotlin/com/studyportal/security/) |
| **9** | **Microservices Architecture** | Decomposition into `UserService` (8081) and `MaterialService` (8082) communicating via REST. | [`microservices/`](file:///microservices/) |
| **10** | **Cloud / Server Deployment** | Multi-container `docker-compose.yml`, multi-stage `Dockerfile` for Spring Boot and React. | [`docker-compose.yml`](file:///docker-compose.yml) |
| **11** | **Flutter + Dart Basics** | Mobile layout widgets: `StatelessWidget`, `StatefulWidget`, `Scaffold`, `CustomScrollView`. | [`mobile/lib/screens/`](file:///mobile/lib/screens/) |
| **12** | **Flutter State Management** | State management using `Provider` & `ChangeNotifier` (`AuthProvider`, `MaterialProvider`). | [`mobile/lib/providers/`](file:///mobile/lib/providers/) |
| **13** | **Flutter + REST Integration** | HTTP networking via `ApiService` consuming Kotlin backend endpoints. | [`mobile/lib/services/api_service.dart`](file:///mobile/lib/services/api_service.dart) |
| **14** | **Firebase Auth + Firestore** | Demonstration of Firebase Auth sign-in and Cloud Firestore metadata sync. | [`mobile/lib/services/firebase_service.dart`](file:///mobile/lib/services/firebase_service.dart) |
| **15** | **Final Integrated Project** | End-to-end full-stack demonstration connecting React Web, Kotlin Backend, and Flutter Mobile. | Complete repository ecosystem |

---

## 5. Getting Started & Running Locally

### Prerequisites
- **Java JDK 21+**
- **Node.js 18+** & npm
- **Flutter 3.0+** (for mobile client)
- **Docker & Docker Compose** (optional, for containerized run)

---

### A. Running the React Web Application (Frontend)

```bash
cd frontend

# 1. Install dependencies
npm install

# 2. Run developer server
npm run dev

# 3. Or build and preview production bundle
npm run build
npm run preview -- --port 5173
```
*Access the Web Portal at:* **`http://localhost:5173`**

---

### B. Running the Kotlin / Spring Boot Backend

```bash
cd backend

# Build and run with default H2 in-memory database (zero config required!)
./gradlew bootRun

# On Windows PowerShell:
.\gradlew.bat bootRun
```
*API Base URL:* **`http://localhost:8080/api`**  
*H2 Database Console:* **`http://localhost:8080/h2-console`** *(JDBC URL: `jdbc:h2:mem:studyportal_db`)*

---

### C. Running the Flutter Mobile Application

```bash
cd mobile

# Fetch packages
flutter pub get

# Run on Chrome (web preview matching React)
flutter run -d chrome

# Or run on Android Emulator / Physical Device
flutter run
```

---

### D. Running with Docker Compose (Full Stack)

To run the entire system (MySQL 8.0, Kotlin Backend, and React Frontend) with one command:
```bash
docker-compose up --build
```
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:8080/api`
- MySQL DB: `localhost:3306`

---

### E. Running Standalone Kotlin Experiments (Exp 4 & 5)

```bash
cd kotlin-core-demos

# Experiment 4: OOP Concepts
kotlinc Experiment4_CoreConcepts.kt -include-runtime -d Exp4.jar
java -jar Exp4.jar

# Experiment 5: Exceptions & Functional Collections
kotlinc Experiment5_ExceptionsCollections.kt -include-runtime -d Exp5.jar
java -jar Exp5.jar
```

---

### F. Testing with Postman (Exp 1)

1. Open Postman.
2. Click **Import** and select:
   - `postman/Study_Material_Portal.postman_collection.json`
   - `postman/Study_Material_Portal.postman_environment.json`
3. Select the environment **Study Material Portal - Local Environment**.
4. Run **Login - Student**: It automatically extracts the JWT token into your environment variables and authenticates all protected CRUD requests!

---

## 6. Security & GitHub Readiness

This repository is **100% GitHub Ready**:
- **Comprehensive `.gitignore`**: Automatically ignores all `.env` files, `.idea`, `build/`, `node_modules/`, `target/`, `.dart_tool/`, `google-services.json`, `keystore.jks`, and private credentials.
- **Environment Templates (`.env.example`)**: Sample environment files are provided for root, backend, frontend, and mobile with dummy placeholders.
- **Stateless Authorization**: Passwords are saved strictly using **BCrypt** hashing (`$2a$10$...`), and protected endpoints reject unauthenticated requests with `401 Unauthorized` or `403 Forbidden`.

---

## 7. Recommended Viva Demonstration Sequence

1. **Authentication (Exp 8 & 14)**: Show registration and login on React/Flutter. Demonstrate JWT token decoded in the built-in *API & Viva Console*.
2. **Browsing & Search (Exp 2, 3, 6, 7)**: Filter materials by semester (Sem 5), category (Notes vs PYQ), and instant search.
3. **In-App Document Preview**: Open the document reader modal and inspect the verified academic content.
4. **Validated Upload (Exp 3 & 6)**: Upload a new study resource with required field validation and watch it appear dynamically in the catalog.
5. **Ownership & Role Enforcement (Exp 8)**: Show that a Student can only delete their own notes, while an Admin has moderation privileges.
6. **Mobile App (Exp 11–15)**: Open Flutter client, demonstrate identical UI palette and Provider state updates.
7. **Postman & Architecture (Exp 1, 4, 5, 9, 10)**: Walk through Postman CRUD tests, Kotlin OOP demo, and Microservices decomposition.
