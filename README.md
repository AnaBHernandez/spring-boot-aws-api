# Spring Boot AWS API

Este proyecto es una API REST desarrollada con Spring Boot, desplegada en AWS EC2 y que utiliza una base de datos MySQL en RDS.

## Características

- CRUD completo para la entidad Producto
- Interfaz web para gestionar los productos
- Despliegue automatizado con GitHub Actions
- Dockerización para facilitar el despliegue

## Tecnologías utilizadas

- Java 17
- Spring Boot 3.x
- Spring Data JPA
- MySQL
- Docker
- AWS (EC2, RDS)
- GitHub Actions

## Configuración del entorno de desarrollo

### Requisitos previos
- Java 17 o superior
- Maven
- Docker y Docker Compose (opcional para desarrollo local)
- MySQL (o usar Docker Compose)

### Pasos para ejecutar localmente
1. Clonar el repositorio
2. Configurar la base de datos MySQL local o usar Docker Compose
3. Ejecutar la aplicación con Maven: `mvn spring-boot:run`
4. Acceder a la aplicación en http://localhost:8080

## Configuración en AWS

### RDS (Base de datos)
- Instancia MySQL en RDS
- Grupo de seguridad configurado para permitir conexiones desde EC2
- Base de datos creada y configurada

### EC2 (Aplicación)
- Instancia Amazon Linux 2023
- Docker instalado
- Aplicación desplegada como contenedor Docker
- Grupo de seguridad configurado para permitir tráfico HTTP

## Despliegue

El despliegue se realiza automáticamente mediante GitHub Actions cuando se realiza un push a la rama principal. El proceso incluye:

1. Compilación de la aplicación con Maven
2. Transferencia del JAR y Dockerfile a la instancia EC2
3. Construcción de la imagen Docker
4. Ejecución del contenedor con las variables de entorno apropiadas

## Pruebas

Puedes probar la API con los siguientes endpoints:

- GET /api/products - Obtener todos los productos
- GET /api/products/{id} - Obtener un producto por ID
- POST /api/products - Crear un nuevo producto
- PUT /api/products/{id} - Actualizar un producto existente
- DELETE /api/products/{id} - Eliminar un producto

## Seguridad

Este proyecto implementa las mejores prácticas de seguridad:
- No se almacenan credenciales en el código
- Se utilizan variables de entorno para la configuración sensible
- Los grupos de seguridad de AWS están configurados para permitir solo el tráfico necesario