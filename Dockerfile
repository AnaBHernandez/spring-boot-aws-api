# Primera etapa: construir la aplicación con Maven
FROM maven:3.9.4-eclipse-temurin-21 AS build
WORKDIR /workspace/app
COPY pom.xml .
COPY src src
RUN mvn package -DskipTests

# Segunda etapa: ejecutar la aplicación con Java
FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /workspace/app/target/*.jar app.jar
ENV DB_HOST=mysql
ENV DB_PORT=3306
ENV DB_NAME=api_database
ENV DB_USERNAME=root
ENV DB_PASSWORD=password
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]