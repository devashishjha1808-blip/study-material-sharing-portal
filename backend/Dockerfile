# Multi-stage Docker build for Kotlin / Spring Boot backend
FROM eclipse-temurin:21-jdk-jammy AS builder
WORKDIR /app
COPY gradle/ gradle/
COPY gradlew build.gradle.kts settings.gradle.kts ./
# Download dependencies
RUN chmod +x gradlew || true
COPY src ./src
# Build Spring Boot executable jar (skip test for rapid build)
RUN ./gradlew bootJar -x test || gradle bootJar -x test

# Runtime Stage
FROM eclipse-temurin:21-jre-jammy
WORKDIR /app
EXPOSE 8080
COPY --from=builder /app/build/libs/*SNAPSHOT.jar app.jar
ENV SPRING_PROFILES_ACTIVE=mysql
ENTRYPOINT ["java", "-jar", "app.jar"]
