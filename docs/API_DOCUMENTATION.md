# REST API Specification
### Study Material Sharing Portal
*Base URL: `http://localhost:8080/api`*

All protected endpoints require the HTTP Header:
`Authorization: Bearer <your_jwt_token>`

---

## 1. Authentication Endpoints

### Register User
- **Method:** `POST`
- **Endpoint:** `/api/auth/register`
- **Access:** Public
- **Request Body:**
```json
{
  "name": "Aarav Sharma",
  "email": "aarav.student@campus.edu",
  "password": "Password123!",
  "role": "STUDENT"
}
```
- **Response:** `201 Created`
```json
{
  "message": "User registered successfully",
  "userId": 1,
  "email": "aarav.student@campus.edu",
  "role": "STUDENT"
}
```

### User Login
- **Method:** `POST`
- **Endpoint:** `/api/auth/login`
- **Access:** Public
- **Request Body:**
```json
{
  "email": "aarav.student@campus.edu",
  "password": "Password123!"
}
```
- **Response:** `200 OK`
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "type": "Bearer",
  "userId": 1,
  "name": "Aarav Sharma",
  "email": "aarav.student@campus.edu",
  "role": "STUDENT",
  "expiresInMs": 86400000
}
```

---

## 2. Study Materials Endpoints

### List / Search / Filter Materials
- **Method:** `GET`
- **Endpoint:** `/api/materials`
- **Query Parameters:**
  - `query` (optional): Free-text search matching title or description
  - `subjectId` (optional): Filter by Subject ID (e.g., `1` for DBMS)
  - `categoryId` (optional): Filter by Category ID (e.g., `1` for Lecture Notes)
  - `semester` (optional): Filter by Semester integer (`1` through `8`)
- **Access:** Public
- **Response:** `200 OK`
```json
[
  {
    "id": 101,
    "title": "CS301 Unit 2 - Relational Algebra & SQL Normalization",
    "description": "Comprehensive class notes covering 1NF, 2NF, 3NF, BCNF with step-by-step solved examples.",
    "subject": {
      "id": 1,
      "code": "CS301",
      "name": "Database Management Systems",
      "department": "Computer Science & Engineering"
    },
    "category": {
      "id": 1,
      "name": "Lecture Notes",
      "slug": "notes"
    },
    "semester": 5,
    "fileUrl": "https://example.edu/materials/cs301-unit2-norm.pdf",
    "fileSize": "3.4 MB",
    "fileType": "PDF",
    "pageCount": 46,
    "downloads": 1420,
    "views": 4890,
    "uploader": {
      "id": 2,
      "name": "Dr. R. K. Mukherjee",
      "role": "FACULTY"
    },
    "isVerified": true,
    "createdAt": "2026-09-12T10:30:00Z"
  }
]
```

### Get Single Material Details
- **Method:** `GET`
- **Endpoint:** `/api/materials/{id}`
- **Access:** Public
- **Response:** `200 OK` (Single Object) or `404 Not Found`

### Upload Study Material
- **Method:** `POST`
- **Endpoint:** `/api/materials`
- **Access:** Authenticated (`STUDENT`, `FACULTY`, `ADMIN`)
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
```json
{
  "title": "CS302 Operating Systems - Process Scheduling Algorithms",
  "description": "FCFS, SJF, Round Robin, and Priority scheduling algorithms solved problems and code implementations.",
  "subjectId": 2,
  "categoryId": 1,
  "semester": 5,
  "fileUrl": "https://example.edu/materials/cs302-sched.pdf",
  "fileSize": "2.1 MB",
  "fileType": "PDF",
  "pageCount": 28
}
```
- **Response:** `201 Created`

### Update Own Study Material
- **Method:** `PUT`
- **Endpoint:** `/api/materials/{id}`
- **Access:** Author of resource OR `ADMIN`
- **Headers:** `Authorization: Bearer <token>`
- **Response:** `200 OK` or `403 Forbidden`

### Delete Study Material
- **Method:** `DELETE`
- **Endpoint:** `/api/materials/{id}`
- **Access:** Author of resource OR `ADMIN`
- **Headers:** `Authorization: Bearer <token>`
- **Response:** `204 No Content` or `403 Forbidden`

---

## 3. Subjects & Categories Endpoints

### List All Subjects
- **Method:** `GET`
- **Endpoint:** `/api/subjects`
- **Access:** Public

### Create Subject
- **Method:** `POST`
- **Endpoint:** `/api/subjects`
- **Access:** `ADMIN`

### List All Categories
- **Method:** `GET`
- **Endpoint:** `/api/categories`
- **Access:** Public

### Create Category
- **Method:** `POST`
- **Endpoint:** `/api/categories`
- **Access:** `ADMIN`
