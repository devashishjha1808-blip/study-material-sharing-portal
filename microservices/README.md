# Experiment 9: Microservices Architecture
### Study Material Sharing Portal

This directory demonstrates the decomposition of the monolithic Study Material Sharing Portal into two autonomous, REST-communicating microservices as required by **Experiment 9**.

---

## Architecture Overview

```
                      +-----------------------------+
                      |         Web Client          |
                      +--------------+--------------+
                                     |
                 +-------------------+-------------------+
                 |                                       |
          POST /api/auth/*                        GET /api/materials
                 |                                       |
                 v                                       v
    +-------------------------+             +-------------------------+
    |      User Service       |             |    Material Service     |
    |      (Port: 8081)       |             |      (Port: 8082)       |
    |                         |             |                         |
    | - User Registration     |<------------|- Inter-service REST      |
    | - Authentication & JWT  | GET /verify |   token verification    |
    | - Role Management       |             | - Materials catalog     |
    +------------+------------+             +------------+------------+
                 |                                       |
                 v                                       v
        [User H2 / MySQL DB]                   [Material H2 / MySQL DB]
```

## Service Responsibilities

### 1. User Service (Port 8081)
- Handles authentication, registrations, and user profiles.
- Exposes an internal verification endpoint: `GET /api/users/verify?token=...`
- Returns identity data and authorization role (`STUDENT`, `FACULTY`, `ADMIN`).

### 2. Material Service (Port 8082)
- Manages study resources, file references, downloads, and subject taxonomies.
- When an author requests resource deletion or modification (`DELETE /api/materials/{id}`), Material Service issues an HTTP GET to `http://localhost:8081/api/users/verify` via Spring `RestTemplate` to validate token authenticity and user permissions.

## Key Viva Questions for Experiment 9
1. **Why decouple into microservices?**
   - Independent deployability, localized failure domains, and technology polyglot capability.
2. **How do the services communicate?**
   - Synchronously via HTTP REST requests with Bearer tokens passed in request headers.
3. **What happens if User Service is temporarily down?**
   - Material reads can be cached or served anonymously; write operations will fail gracefully with a 503 Service Unavailable or Circuit Breaker fallback.
