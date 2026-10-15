# Experiments 4 & 5: Kotlin Core Demonstrations
### Study Material Sharing Portal

This directory contains standalone, runnable Kotlin source files designed to fulfill **Experiment 4 (Kotlin Core Concepts & OOP)** and **Experiment 5 (Kotlin Exceptions, Domain Validation & Functional Collections)**.

---

## 1. Experiment 4: OOP Concepts (`Experiment4_CoreConcepts.kt`)
Demonstrates:
- Abstract base classes (`AcademicPerson`)
- Inheritance and polymorphism (`Student`, `Faculty`)
- Encapsulation with custom property getters/setters (`gpa`)
- Kotlin Data Classes with automatic `toString()`, `copy()`, and destructuring declarations (`component1()`, `component2()`, etc.)
- Companion objects providing factory methods (`createVerifiedNote`)
- Immutability and polymorphic collection filtering

### How to Run:
```bash
# Using Kotlin command line compiler
kotlinc Experiment4_CoreConcepts.kt -include-runtime -d Exp4.jar
java -jar Exp4.jar
```
*(Or right-click and run in IntelliJ IDEA or Antigravity IDE)*

---

## 2. Experiment 5: Exceptions & Functional Collections (`Experiment5_ExceptionsCollections.kt`)
Demonstrates:
- Custom domain exception class hierarchy (`StudyPortalException`, `InvalidSemesterException`, `FileExceedsSizeLimitException`)
- Defensive domain validation with structured try-catch-finally blocks
- Higher-order functional collection pipelines:
  - `filter`: selecting high-rated materials
  - `map`: transforming model entities into UI summary strings
  - `groupBy`: partitioning catalog resources by academic semester
  - `fold`: calculating total megabytes with an accumulator
  - `reduce`: aggregating download statistics

### How to Run:
```bash
kotlinc Experiment5_ExceptionsCollections.kt -include-runtime -d Exp5.jar
java -jar Exp5.jar
```
