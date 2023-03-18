-- Active: 1674755508981@@127.0.0.1@3306

CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

INSERT INTO users ( id, email, password)
VALUES 
("u001", "fulano@gmail.com", "fulano123"),
("u002", "ciclano@hotmail.com", "ciclano1990"),
("u003", "beltrano@gmail.com", "beltrano2000");

INSERT INTO users (id, email, password)
VALUES ("u004", "astrodev@email.com", "astrodev123");

SELECT * FROM users;


CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    category TEXT NOT NULL
);

INSERT INTO products (id, name, price, category)
VALUES
("p001", "mouse" , 50, "periférico"),
("p002", "teclado", 100, "periférico"),
("p003", "smart tv LG", 2000, "eletrônico"),
("p004", "placa de vídeo", 3000, "hardware"),
("p005", "processador ryzen 7", 2500, "hardware");

INSERT INTO products (id, name, price, category)
VALUES ("p006", "web cam", 150, "periférico");

SELECT * FROM products;

SELECT * FROM products
WHERE name = "mouse";

SELECT * FROM products
WHERE id = "p005";

DELETE FROM users
WHERE id = "u004";

DELETE FROM products
WHERE id = "p006";

UPDATE users 
SET email = "astrodev99@email.com"
WHERE id = "u004";

UPDATE products
SET name = "cooler"
WHERE id = "p006";

SELECT * FROM users
ORDER BY email ASC;

SELECT * FROM products
ORDER BY price ASC
LIMIT 10;

SELECT * FROM products
WHERE price >= 1000 AND price <= 2500
ORDER BY price ASC;

CREATE TABLE purchases (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    total_price REAL NOT NULL,
    paid INTEGER NOT NULL,
    delivered_at TEXT NULL,
    buyer_id TEXT NOT NULL,
    FOREIGN KEY (buyer_id) REFERENCES users (id)
);

INSERT INTO purchases (id, total_price, paid, delivered_at, buyer_id)
VALUES
("purchase001", 1000, 0, NULL, "u001"),
("purchase002", 2500, 0, NULL, "u001"),
("purchase003", 1200, 0, NULL, "u002"),
("purchase004", 1800, 0, NULL, "u002");

SELECT * FROM purchases;

UPDATE purchases
SET delivered_at = "18/03/2023"
WHERE buyer_id = "u001";

UPDATE purchases
SET delivered_at = "20/03/2023"
WHERE buyer_id = "u002";

SELECT * FROM purchases
INNER JOIN users
ON purchases.buyer_id = users.id;