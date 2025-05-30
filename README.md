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

## Verificación Rápida del Despliegue CI/CD

Después de configurar los secretos en GitHub Actions (EC2_HOST, EC2_PRIVATE_KEY, etc.), sigue estos pasos para verificar que la pipeline funciona correctamente:

1.  **Haz un cambio menor:** Modifica este archivo `README.md` (o cualquier otro archivo no crítico de tu proyecto).
2.  **Commitea y sube los cambios:**
    ```bash
    git add .
    git commit -m "Test: Verificando despliegue CI/CD"
    git push origin main
    ```
3.  **Monitorea la ejecución en GitHub Actions:**
    * Ve a la pestaña "Actions" en tu repositorio de GitHub.
    * Asegúrate de que el workflow "Deploy to AWS EC2" se ejecute y complete con éxito (todos los pasos con un check verde ✅).
4.  **Verifica la aplicación en EC2:**
    * Abre tu navegador y ve a `http://[TU_IP_EC2]/api/products` (reemplaza `[TU_IP_EC2]` con la IP pública de tu instancia EC2).
    * Comprueba que la API responda correctamente.

Si la API no responde como esperas, revisa los logs del workflow en GitHub Actions para identificar cualquier error.

## Estado del Proyecto

### URLs de Acceso
- **Aplicación en producción:** http://54.219.146.20/
- **API REST:** http://54.219.146.20/api/products
- **Repositorio GitHub:** https://github.com/AnaBHernandez/spring-boot-aws-api

### Infraestructura AWS
- **Servidor EC2:** anabelen-spring-boot-server (t2.micro)
- **Base de datos RDS:** anabelen-products-db (MySQL 8.0)
- **Región:** us-west-1 (California)
- **VPC Peering:** Configurado entre EC2 y RDS

### Pipeline CI/CD
- **Herramienta:** GitHub Actions
- **Trigger:** Push a rama main
- **Despliegue:** Automático con Docker en EC2
- **Estado:** Operativo

## Documentación Técnica

Para más detalles técnicos, consultar los archivos de documentación:
- `DOCUMENTACION_CONFLUENCE.md` - Documentación técnica completa
- `RESUMEN_TRABAJO_AYER.md` - Resumen de actividades realizadas

## Troubleshooting

### Problema Común: Communications Link Failure
Si encuentras este error durante el despliegue:

**Causa:** EC2 y RDS en VPCs diferentes
**Solución:** Configurar VPC Peering entre las VPCs

**Pasos para resolver:**
1. Crear VPC Peering connection
2. Aceptar la conexión en ambas VPCs
3. Actualizar Route Tables
4. Verificar Security Groups

### Verificación de Conectividad
```bash
# Desde EC2, probar conexión a RDS
nc -zv anabelen-products-db.c38cka2oapfl.us-west-1.rds.amazonaws.com 3306
```

## Contacto

Proyecto desarrollado por Ana Belén Hernández
Fecha: Mayo 2025