# 📚 Biblioteca Online (Full Stack Edition)

Sistema completo de gestión de biblioteca que permite a los usuarios explorar un catálogo, gestionar un carrito de alquileres y realizar préstamos de libros.

Este proyecto ha evolucionado de una demo frontend a una aplicación **Full Stack** robusta, conectando una interfaz moderna en React con un backend empresarial en Java Spring Boot y base de datos MySQL.

---

## 🚀 Tecnologías Utilizadas

### Frontend (Cliente)
* **React + Vite**: Para una interfaz rápida y reactiva.
* **Context API**: Gestión del estado global (Carrito, Autenticación, Rentas).
* **CSS Modules**: Estilos modulares y organizados.

### Backend (Servidor)
* **Java 21**: Última versión LTS.
* **Spring Boot 3**: Framework principal.
* **Spring Data JPA**: Para la persistencia de datos y ORM.
* **MySQL**: Base de datos relacional para usuarios, libros y transacciones.
* **Maven**: Gestión de dependencias.
* **Swagger / OpenAPI**: Documentación automática de la API.

---

## ✨ Funcionalidades Principales

1.  **Catálogo de Libros**: Visualización de portadas, detalles y disponibilidad en tiempo real.
2.  **Carrito de Compras Persistente**:
    * Los items se guardan en base de datos (MySQL), no se pierden al cerrar el navegador.
    * Cálculo automático de totales según días de renta.
3.  **Sistema de Rentas (Checkout)**:
    * Conversión de carrito a rentas activas.
    * Control de stock (disminuye al rentar, aumenta al devolver).
    * Validación de fechas de devolución.
4.  **Gestión de Usuarios**:
    * Simulación de Login/Registro.
    * Historial de préstamos por usuario.

---

## 🛠️ Instalación y Configuración

### Prerrequisitos
* Java JDK 21
* Node.js & npm
* MySQL Server (XAMPP o Workbench)

### 1. Configuración del Backend (Java)

1.  **Base de Datos**: Crea una base de datos en MySQL llamada `biblioteca_online`.
2.  **Conexión**: Edita `src/main/resources/application.properties` con tus credenciales:
    ```properties
    spring.datasource.url=jdbc:mysql://localhost:3306/biblioteca_online?serverTimezone=UTC
    spring.datasource.username=root
    spring.datasource.password=TU_CONTRASEÑA
    ```
3.  **Carga de Datos**: Ejecuta los scripts `schema.sql` (tablas) y `data-simulation.sql` (datos de prueba) en tu gestor de SQL.
4.  **Ejecutar**:
    ```bash
    ./mvnw spring-boot:run
    ```
    *El servidor iniciará en `http://localhost:8080`*

### 2. Configuración del Frontend (React)

1.  Navega a la carpeta del frontend:
    ```bash
    cd biblioteca-online
    ```
2.  Instala las dependencias:
    ```bash
    npm install
    ```
3.  Ejecuta el servidor de desarrollo:
    ```bash
    npm run dev
    ```
    *La web estará disponible en `http://localhost:5173`*

---

## 🔌 Documentación de API (Endpoints)

Una vez iniciado el backend, puedes ver y probar todos los endpoints disponibles (Users, Cart, Rentals) en la documentación interactiva de Swagger:

👉 **URL Local:** [http://localhost:8080/swagger-ui/index.html](http://localhost:8080/swagger-ui/index.html)

### Endpoints Clave
* `POST /api/cart/{userId}/items` - Agregar libro al carrito.
* `POST /api/rentals/checkout` - Confirmar alquiler.
* `GET /api/rentals/user/{userId}/active` - Ver libros alquilados actualmente.
* `PUT /api/rentals/{id}/return` - Devolver un libro.

---

## 👤 Autor

Desarrollado por **Grupo Actividad 2** como parte de un proyecto de portafolio Full Stack.
