# BalanceFlow API - Despliegue en AWS Elastic Beanstalk con DynamoDB

Este proyecto es la API REST de BalanceFlow, desarrollada con Spring Boot, cuyo despliegue se ha adaptado para utilizar **AWS Elastic Beanstalk (PaaS)** y **Amazon DynamoDB (base de datos NoSQL)** como parte del Ejercicio 3 de AWS. El enfoque principal es la optimización de costes y el uso de servicios gestionados.

## Características

-   API RESTful para la gestión de productos (CRUD completo)
-   Despliegue en una plataforma PaaS para simplificar la administración del servidor.
-   Utilización de una base de datos NoSQL para flexibilidad y escalabilidad.
-   Configuración para minimizar costes de infraestructura.
-   Planificación de automatización de encendido/apagado de recursos (cron jobs).

## Tecnologías Utilizadas para este Ejercicio

-   Java 17
-   Spring Boot 3.x
-   **Amazon DynamoDB (Base de Datos NoSQL)**
-   **AWS Elastic Beanstalk (Plataforma PaaS)**
-   AWS SDK para Java (para integración con DynamoDB)
-   Maven

## Configuración del Entorno de Desarrollo Local

### Requisitos Previos
-   Java 17 o superior
-   Maven
-   AWS CLI configurado (para desarrollo con DynamoDB real)

### Ejecutar la aplicación
```bash
# 1. Clonar el repositorio
git clone <tu-repositorio>

# 2. Configurar AWS CLI (si no está configurado)
aws configure

# 3. Ejecutar la aplicación
mvn spring-boot:run

# 4. Acceder a la aplicación en http://localhost:8086
```

## Configuración en AWS (para el Ejercicio 3)

### Región Principal
-   **US West (N. California) - `us-west-1`**: Esta es la región donde se desplegarán todos los recursos de este ejercicio, alineada con la ubicación de tu VPC existente. Es crucial que la configuración `amazon.aws.region` en `application.properties` de tu proyecto sea `us-west-1` antes de compilar el JAR.

### Elastic Beanstalk (Plataforma de Aplicación)
-   Entorno de servidor web en la plataforma **Java (Corretto 17)**.
-   Configurado con **"Single instance"** para optimización de costes (evitando el balanceador de carga inicial).
-   Se utiliza el rol de servicio IAM por defecto de Elastic Beanstalk para la gestión de recursos.
-   Puerto de la aplicación configurado en `8085`. El grupo de seguridad de Elastic Beanstalk debe permitir tráfico HTTP (puerto 80) y potencialmente el puerto `8085` para comunicaciones directas o salud de la aplicación.

### Amazon DynamoDB (Base de Datos NoSQL)
-   Tabla `anabelen-products`.
-   Configurada en modo de capacidad **"On-demand"** para pagar solo por el uso real y minimizar costos iniciales.
-   Se otorgan los permisos necesarios al rol de la instancia EC2 (asociado a Elastic Beanstalk) para interactuar con DynamoDB (lectura, escritura).

### Optimización de Costes (Directrices de Giacomo)
-   **Instancia Única:** Despliegue inicial con una sola instancia para evitar costes de Load Balancer.
-   **Cron Jobs para Encendido/Apagado (Pendiente de Configurar):** Implementación de acciones programadas (cron jobs) en Elastic Beanstalk para apagar (capacidad deseada a 0) las instancias fuera del horario laboral y encenderlas de nuevo, reduciendo el consumo de EC2.
-   **Monitoreo y Limpieza:** Prácticas de revisar y eliminar recursos no utilizados (como buckets de S3 creados por Elastic Beanstalk) para evitar cargos innecesarios.
-   **IP Elásticas:** Consciente de que Elastic Beanstalk asigna una IP elástica, la cual tiene un costo si no está asociada a una instancia en ejecución.

## Despliegue en AWS Elastic Beanstalk

El despliegue se realiza subiendo el archivo `.jar` compilado de la aplicación directamente a un entorno de Elastic Beanstalk previamente configurado.

### Pasos
1.  Asegurarse de que `amazon.aws.region=us-west-1` en `application.properties` y recompilar la aplicación (`mvn clean package`).
2.  Acceder a la consola de AWS, ir a Elastic Beanstalk.
3.  Crear un nuevo entorno de "Web server environment".
4.  Configurar la aplicación: Nombre (`AnabelenApp`), Entorno (`Anabelen-dev`), Plataforma (`Java Corretto 17`).
5.  Subir el archivo `spring-boot-aws-api-0.0.1-SNAPSHOT.jar` (o el nombre de tu JAR).
6.  En Presets, seleccionar **"Single instance"** para minimizar costes.
7.  Dejar los roles de servicio por defecto.
8.  Crear el entorno y esperar a que esté en estado "OK" (verde).

## Pruebas de la API (con DynamoDB)

Una vez desplegada la aplicación y configurada la tabla DynamoDB, podrás probar la API.

-   **URL Base de Elastic Beanstalk:** `http://[URL_DE_TU_ENTORNO_EB]/` (proporcionada por Elastic Beanstalk).
-   **API REST:** `http://[URL_DE_TU_ENTORNO_EB]/api/products`

### Endpoints (CRUD de Productos)
-   `POST /api/products` - Crear un nuevo producto
-   `GET /api/products` - Obtener todos los productos
-   `GET /api/products/{id}` - Obtener un producto por ID
-   `PUT /api/products/{id}` - Actualizar un producto existente
-   `DELETE /api/products/{id}` - Eliminar un producto

## Troubleshooting

### Problemas Comunes
-   **Error de conexión a DynamoDB:**
    -   Verificar que la región en `application.properties` (`us-west-1`) coincida con la región del despliegue en Elastic Beanstalk y donde se creó la tabla DynamoDB.
    -   Asegurarse de que el rol de la instancia EC2 (asociado a Elastic Beanstalk) tenga los permisos IAM correctos para `dynamodb:CreateTable`, `dynamodb:GetItem`, `dynamodb:PutItem`, etc.,