-- Crear base de datos
CREATE DATABASE IF NOT EXISTS biblioteca_online;
USE biblioteca_online;

-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de libros
CREATE TABLE IF NOT EXISTS books (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(150) NOT NULL,
    isbn VARCHAR(20) UNIQUE NOT NULL,
    category VARCHAR(50) NOT NULL,
    cover TEXT,
    description TEXT,
    available BOOLEAN DEFAULT TRUE,
    price DECIMAL(10, 2) NOT NULL,
    year INT,
    pages INT,
    rating DECIMAL(2, 1),
    publisher VARCHAR(100),
    stock INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_category (category),
    INDEX idx_author (author),
    INDEX idx_isbn (isbn)
);

-- Tabla de rentas
CREATE TABLE IF NOT EXISTS rentals (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    book_id INT NOT NULL,
    rental_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    return_date DATE,
    actual_return_date DATE NULL,
    status ENUM('active', 'returned', 'overdue') DEFAULT 'active',
    total_price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_status (status)
);

-- Tabla del carrito de compras
CREATE TABLE IF NOT EXISTS cart_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    book_id INT NOT NULL,
    quantity INT DEFAULT 1,
    rental_days INT DEFAULT 7,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_book (user_id, book_id)
);

-- Insertar datos de libros desde tu archivo books.js
INSERT INTO books (id, title, author, isbn, category, cover, description, available, price, year, pages, rating, publisher, stock) VALUES
(1, 'Cien años de soledad', 'Gabriel García Márquez', '978-0307474728', 'Novela', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3HyJszEBBsOkWKXgyQ0U1ZxJYMzuTuI-2hw&s', 'La historia de la familia Buendía a través de generaciones en el pueblo de Macondo.', TRUE, 25000, 1967, 417, 4.8, 'Editorial Sudamericana', 5),
(2, 'Clean Code', 'Robert C. Martin', '978-0132350884', 'Programación', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRD3_XaypHG3td10NZtLc-OvB9iteYUDVGp-w&s', 'Guía esencial para escribir código limpio y mantenible.', TRUE, 45000, 2008, 464, 4.7, 'Prentice Hall', 3),
(3, 'El Principito', 'Antoine de Saint-Exupéry', '978-0156012195', 'Infantil', 'https://images.cdn3.buscalibre.com/fit-in/360x360/02/fb/02fb19970ccf22763313a73744bfdaf7.jpg', 'Un cuento poético y filosófico que toca el corazón de lectores de todas las edades.', TRUE, 20000, 1943, 96, 4.9, 'Reynal & Hitchcock', 8),
(4, '1984', 'George Orwell', '978-0451524935', 'Ciencia Ficción', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgABV7JJClHBTauFqHgw_Ju3wghw97cft-5Q&s', 'Novela de distopía que retrata un futuro totalitario inquietante.', TRUE, 28000, 1949, 328, 4.7, 'Secker & Warburg', 2),
(5, 'Dune', 'Frank Herbert', '978-0441172719', 'Ciencia Ficción', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUv50XfIOnbXJ_97KbD7jrnE_OjSaI7qBGfg&s', 'Épica de ciencia ficción con política, religión y ecología en un planeta desértico.', TRUE, 32000, 1965, 688, 4.8, 'Ace Books', 4),
(6, 'Don Quijote', 'Miguel de Cervantes', '978-8408086529', 'Clásicos', 'https://www.edicontinente.com.ar/image/titulos/9788419087003.jpg?%3E', 'Las aventuras del famoso caballero andante Don Quijote de la Mancha.', TRUE, 35000, 1605, 1072, 4.6, 'Planeta', 1),
(7, 'El Código Da Vinci', 'Dan Brown', '978-0307474278', 'Misterio', 'https://www.casadellibro.com.co/libro-el-codigo-da-vinci/9788408175728/5750447', 'Thriller que mezcla arte, historia y religión en una investigación emocionante.', TRUE, 30000, 2003, 689, 4.4, 'Doubleday', 6),
(8, 'Orgullo y Prejuicio', 'Jane Austen', '978-0141439518', 'Romance', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcUY8dY8dY8dY8dY8dY8dY8dY8dY8dY8dY8dY&s', 'Clásico romance que explora el amor, el matrimonio y las convenciones sociales.', FALSE, 22000, 1813, 432, 4.8, 'Penguin', 0),
(9, 'El Hobbit', 'J.R.R. Tolkien', '978-0547928227', 'Fantasía', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcVV9vV9vV9vV9vV9vV9vV9vV9vV9vV9vV9vV&s', 'Aventura fantástica del hobbit Bilbo Bolsón en busca del tesoro perdido.', TRUE, 29000, 1937, 310, 4.9, 'George Allen & Unwin', 7),
(10, 'Harry Potter y la Piedra Filosofal', 'J.K. Rowling', '978-0439708180', 'Fantasía', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcW1w1w1w1w1w1w1w1w1w1w1w1w1w1w1w1w1w&s', 'El inicio de la saga de Harry Potter, el mago más famoso del mundo mágico.', TRUE, 28000, 1997, 309, 4.9, 'Bloomsbury', 5),
(11, 'Crimen y Castigo', 'Fiódor Dostoyevski', '978-0143112211', 'Novela', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcX2x2x2x2x2x2x2x2x2x2x2x2x2x2x2x2x2x&s', 'Profundo análisis psicológico de un crimen y sus consecuencias morales.', TRUE, 35000, 1866, 671, 4.7, 'Penguin', 3),
(12, 'Python para Todos', 'Charles Severance', '978-1491927281', 'Programación', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcY3y3y3y3y3y3y3y3y3y3y3y3y3y3y3y3y3y&s', 'Guía completa de Python desde principiante hasta intermedio con ejemplos prácticos.', TRUE, 38000, 2016, 240, 4.6, 'CreateSpace', 4),
(13, 'La Bruja Blair', 'Susan Dennard', '978-0062405844', 'Fantasía', 'https://images-na.ssl-images-amazon.com/images/P/B01N3T2FPU.01.L.jpg', 'Una joven bruja debe enfrentarse a sus miedos para proteger su coven.', TRUE, 27000, 2015, 480, 4.5, 'Sourcebooks Fire', 2),
(14, 'La Culpa es de la Gravedad', 'John Green', '978-0143122029', 'Novela Contemporánea', 'https://images-na.ssl-images-amazon.com/images/P/B003ZX7QXO.01.L.jpg', 'Dos adolescentes que luchan contra el cáncer descubren el sentido de la vida.', TRUE, 26000, 2012, 313, 4.9, 'Penguin', 9),
(15, 'El Señor de los Anillos', 'J.R.R. Tolkien', '978-0544003415', 'Fantasía Épica', 'https://images-na.ssl-images-amazon.com/images/P/B008EGMD8U.01.L.jpg', 'La épica aventura para destruir el anillo único y salvar la Tierra Media.', TRUE, 48000, 1954, 1216, 4.9, 'Mariner Books', 6),
(16, 'El Viaje Inesperado de Harold Fry', 'Rachel Joyce', '978-0385667319', 'Novela', 'https://images-na.ssl-images-amazon.com/images/P/B009TDBHF4.01.L.jpg', 'Un hombre jubilado camina miles de kilómetros para salvar a una vieja amiga.', TRUE, 24000, 2012, 413, 4.7, 'Random House', 3),
(17, 'La Revolución Francesa', 'Christopher Hibbert', '978-0141023205', 'Historia', 'https://images-na.ssl-images-amazon.com/images/P/B001NNRF4U.01.L.jpg', 'Un relato detallado y apasionante de los eventos que cambiaron Europa.', TRUE, 42000, 1980, 534, 4.6, 'Penguin', 2),
(18, 'Sapiens', 'Yuval Noah Harari', '978-0062316097', 'No Ficción', 'https://images-na.ssl-images-amazon.com/images/P/B00ICN066G.01.L.jpg', 'Una historia de la humanidad desde la era de piedra hasta el presente.', TRUE, 46000, 2011, 496, 4.8, 'Harper', 5),
(19, 'La Chica del Tren', 'Paula Hawkins', '978-0735212725', 'Misterio/Thriller', 'https://images-na.ssl-images-amazon.com/images/P/B00QLFOOKO.01.L.jpg', 'Una mujer obsesionada con una pareja desaparecida se ve envuelta en un misterio.', FALSE, 28000, 2015, 395, 4.5, 'Riverhead', 0),
(20, 'Fundación', 'Isaac Asimov', '978-0553382891', 'Ciencia Ficción', 'https://images-na.ssl-images-amazon.com/images/P/B000FC1PWE.01.L.jpg', 'Un imperio galáctico enfrenta su caída y un hombre intenta prevenirlo.', TRUE, 31000, 1951, 368, 4.7, 'Spectra', 4),
(21, 'El Amor en Tiempos de Cólera', 'Gabriel García Márquez', '978-1400034734', 'Romance', 'https://images-na.ssl-images-amazon.com/images/P/B003UYUP58.01.L.jpg', 'Una historia de amor que transcurre durante cincuenta años.', TRUE, 26000, 1985, 387, 4.8, 'Knopf', 7),
(22, 'Diseño de Interfaces de Usuario', 'Susan Norman', '978-0465067947', 'Diseño/Tecnología', 'https://images-na.ssl-images-amazon.com/images/P/B00FHQF4TS.01.L.jpg', 'Cómo crear productos digitales que sea un placer usar.', TRUE, 52000, 2013, 360, 4.6, 'Basic Books', 3);

-- Insertar usuario de prueba (password: 'password123' - deberías hashearlo en producción)
INSERT INTO users (name, email, password) VALUES
('Usuario Demo', 'demo@biblioteca.com', '$2a$10$YourHashedPasswordHere');


-- 1. Crear usuarios adicionales (El ID 1 ya es 'Usuario Demo')
INSERT INTO users (name, email, password) VALUES
('Dalton Developer', 'dalton@dev.com', '$2a$10$FakeHashForTest123'),
('Ana Tester', 'ana@test.com', '$2a$10$FakeHashForTest456');

-- 2. Simular un CARRITO para el Usuario 1 (Usuario Demo)
-- Esto te permitirá probar GET /api/cart/1 inmediatamente
INSERT INTO cart_items (user_id, book_id, quantity, rental_days, added_at) VALUES
(1, 4, 1, 7, NOW()),  -- Libro ID 4: 1984
(1, 12, 1, 14, NOW()); -- Libro ID 12: Python para Todos (Renta por 2 semanas)

-- 3. Simular RENTAS ACTIVAS (Para probar /api/rentals/user/1/active)
-- Estas aparecerán en la sección "Mis Alquileres" como pendientes de devolución
INSERT INTO rentals (user_id, book_id, rental_date, return_date, status, total_price) VALUES
(1, 2, NOW(), DATE_ADD(NOW(), INTERVAL 7 DAY), 'active', 45000.00), -- Clean Code
(1, 5, NOW(), DATE_ADD(NOW(), INTERVAL 7 DAY), 'active', 32000.00); -- Dune

-- 4. Simular HISTORIAL DE RENTAS (Ya devueltas)
-- Para probar historiales o reportes
INSERT INTO rentals (user_id, book_id, rental_date, return_date, actual_return_date, status, total_price) VALUES
(1, 3, DATE_SUB(NOW(), INTERVAL 30 DAY), DATE_SUB(NOW(), INTERVAL 23 DAY), DATE_SUB(NOW(), INTERVAL 22 DAY), 'returned', 20000.00), -- El Principito
(1, 10, DATE_SUB(NOW(), INTERVAL 60 DAY), DATE_SUB(NOW(), INTERVAL 53 DAY), DATE_SUB(NOW(), INTERVAL 53 DAY), 'returned', 28000.00); -- Harry Potter

-- 5. Simular datos para otro usuario (Dalton - ID 2)
INSERT INTO cart_items (user_id, book_id, quantity, rental_days) VALUES
(2, 1, 1, 30); -- Cien años de soledad para Dalton