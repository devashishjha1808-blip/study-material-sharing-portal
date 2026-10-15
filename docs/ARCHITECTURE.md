# System Architecture Specification
### Study Material Sharing Portal

## 1. High-Level System Architecture

```
+-------------------------------------------------------------------------+
|                              CLIENT LAYER                               |
|                                                                         |
|   +-------------------------------+   +-----------------------------+   |
|   |          React Web            |   |        Flutter Mobile       |   |
|   |  - Responsive Modern Portal   |   |  - Material 3 Mobile Client |   |
|   |  - React 18 + Context API     |   |  - Provider State Mgmt      |   |
|   |  - In-App Document Previewer  |   |  - Identical UI & Palette   |   |
|   +---------------+---------------+   +--------------+--------------+   |
+-------------------|----------------------------------|------------------+
                    | HTTPS / JSON                     | HTTPS / JSON
                    v                                  v
+-------------------------------------------------------------------------+
|                              API GATEWAY                                |
|             Cross-Origin Resource Sharing (CORS) & Routing              |
+-------------------------------------------------------------------------+
                    |
                    v
+-------------------------------------------------------------------------+
|                         APPLICATION LAYER                               |
|                  Kotlin + Spring Boot 3 REST Service                    |
|                                                                         |
|  +-------------------+  +---------------------+  +-------------------+  |
|  |  Security Filter  |  |  Controller Layer   |  |   Service Layer   |  |
|  |  - JWT Validation |  |  - AuthController   |  |  - Auth & Token   |  |
|  |  - Role Checks    |  |  - MaterialControl. |  |  - Material CRUD  |  |
|  |  - BCrypt Hashing |  |  - Subject/CatCtrl  |  |  - Validations    |  |
|  +-------------------+  +---------------------+  +-------------------+  |
+-------------------------------------------------------------------------+
                    |
                    v
+-------------------------------------------------------------------------+
|                          PERSISTENCE LAYER                              |
|                       JPA / Hibernate ORM                               |
|                                                                         |
|  +-------------------------------------------------------------------+  |
|  |  Repositories: UserRepository, MaterialRepository, SubjectRepo    |  |
|  +-------------------------------------------------------------------+  |
|          | (dev profile)                       | (prod profile)         |
|          v                                     v                        |
|  +-------------------+                 +-------------------+            |
|  |   H2 In-Memory    |                 |   MySQL 8.0 DB    |            |
|  |   Zero-Config DB  |                 |   Persistent DB   |            |
|  +-------------------+                 +-------------------+            |
+-------------------------------------------------------------------------+
                                                 |
                                                 | (Exp 14 Connectivity)
                                                 v
                                  +-----------------------------+
                                  |   Firebase Cloud Services   |
                                  |   - Firebase Auth (Mobile)  |
                                  |   - Firestore Metadata      |
                                  +-----------------------------+
```

## 2. Microservice Decomposition (Experiment 9)

In Experiment 9, the monolithic application is separated into two decoupled microservices communicating synchronously via REST HTTP:
1. **User Service (Port 8081)**:
   - Manages user registrations, role verification, and JWT generation/validation.
   - Database: Dedicated User Schema.
2. **Material Service (Port 8082)**:
   - Handles material creation, search, filtering, and downloads.
   - Authenticates ownership by dispatching a REST call to `http://localhost:8081/api/users/verify` before modifying resources.
