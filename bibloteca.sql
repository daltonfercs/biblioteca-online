CREATE DATABASE bookstore_db;
USE bookstore_db;

-- 1. Tabla de Usuarios (para el Login)
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL, -- Aquí guardaremos el hash de BCrypt
    role VARCHAR(20) DEFAULT 'USER'
);

-- 2. Tabla de Libros (basada en tu JSON)
CREATE TABLE books (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255),
    isbn VARCHAR(20) UNIQUE,
    category VARCHAR(100),
    cover TEXT,
    description TEXT,
    available BOOLEAN DEFAULT true,
    price DECIMAL(10, 2) NOT NULL,
    year_published INT,
    pages INT,
    rating DECIMAL(3, 2),
    publisher VARCHAR(150),
    stock INT DEFAULT 0
);

-- 3. Tabla de Carrito (cabecera)
-- Relaciona a un usuario con un carrito activo
CREATE TABLE carts (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'ACTIVE', -- ACTIVE, COMPLETED, CANCELLED
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 4. Detalle del Carrito (productos dentro)
CREATE TABLE cart_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    cart_id BIGINT NOT NULL,
    book_id BIGINT NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (cart_id) REFERENCES carts(id),
    FOREIGN KEY (book_id) REFERENCES books(id)
);