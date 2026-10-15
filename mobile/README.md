# Mobile Application (Flutter Client)
### Study Material Sharing Portal
*Mapped to Experiments 11, 12, 13, 14, and 15*

This Flutter mobile application mirrors the exact same academic design language, color scheme, typography, card layout, and components as the React Web Portal.

---

## Mapped Experiments

- **Experiment 11 (Flutter + Dart Basics)**:
  - Custom UI widgets: `MaterialCard`, `SemesterChips`, `CategoryChips`, `DocumentPreviewSheet`, `Navbar`.
  - Layout hierarchies: `Scaffold`, `CustomScrollView`, `SliverAppBar`, `Wrap`, `ListView.builder`.
- **Experiment 12 (Flutter State Management)**:
  - Reactive state management using `Provider` & `ChangeNotifier`.
  - `AuthProvider`: user session, role changes, and JWT token management.
  - `MaterialProvider`: study materials search, dynamic semester & category filtering, and uploads.
- **Experiment 13 (Flutter + REST Integration)**:
  - Asynchronous HTTP networking via `ApiService` consuming the Kotlin Spring Boot backend (`GET /api/materials`, `POST /api/materials`, etc.).
  - Automatic graceful fallback: If the Spring Boot backend is offline, the app seamlessly runs with realistic in-memory academic records.
- **Experiment 14 (Firebase Auth + Firestore)**:
  - Implemented in `FirebaseService.dart`: demonstrates Firebase user sign-in and Cloud Firestore metadata synchronization.
- **Experiment 15 (Final Integrated Mobile Portal)**:
  - Complete, end-to-end mobile user journey: authentication, role switching, catalog browsing, document preview, upload, and personal upload management.

---

## How to Run

```bash
cd mobile

# 1. Fetch dependencies
flutter pub get

# 2. Run on connected device, emulator, or Chrome web
flutter run -d chrome     # Web preview matching React portal
flutter run               # Android or iOS
```
