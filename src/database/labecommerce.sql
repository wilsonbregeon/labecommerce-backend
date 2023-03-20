-- Active: 1674755508981@@127.0.0.1@3306


-- Exercício 2 - Introdução SQL: A) Cria a tabela "users";
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);


-- B) Popula a tabela "users";
INSERT INTO users ( id, email, password)
VALUES 
("u001", "fulano@gmail.com", "fulano123"),
("u002", "ciclano@hotmail.com", "ciclano1990"),
("u003", "beltrano@gmail.com", "beltrano2000");


-- Exercício 3 - Introdução SQL: A) Cria a tabela "products";
CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    category TEXT NOT NULL
);


-- B) Popula a tabela "products";
INSERT INTO products (id, name, price, category)
VALUES
("p001", "mouse" , 50, "periférico"),
("p002", "teclado", 100, "periférico"),
("p003", "smart tv LG", 2000, "eletrônico"),
("p004", "placa de vídeo", 3000, "hardware"),
("p005", "processador ryzen 7", 2500, "hardware");


-- Exercício 1 - Aprofundamento SQL: A) Retorna todos os usuários cadastrados da tabela "users";
SELECT * FROM users;


-- B) Retorna todos os produtos cadastrados da tabela "products";
SELECT * FROM products;


-- C) Retorna um produto baseado no "name";
SELECT * FROM products
WHERE name = "mouse";


-- D) Insere um novo usuário na tabela "users";
INSERT INTO users (id, email, password)
VALUES ("u004", "astrodev@email.com", "astrodev123");


-- E) Insere um novo produto na tabela "products";
INSERT INTO products (id, name, price, category)
VALUES ("p006", "web cam", 150, "periférico");


-- Exercício 2 - Aprofundamento SQL: A) Retorna o produto baseado no "id";
SELECT * FROM products
WHERE id = "p005";


-- B) Deleta o usuário baseado no "id";
DELETE FROM users
WHERE id = "u004";


-- C) Deleta o produto baseado no "id";
DELETE FROM products
WHERE id = "p006";


-- D) Edita o usuário baseado nos valores mockados;
UPDATE users 
SET email = "astrodev99@email.com"
WHERE id = "u004";


-- E) Edita o produto baseado nos valores mockados;
UPDATE products
SET name = "cooler"
WHERE id = "p006";


-- Exercício 3 - Aprofundamento SQL: A) Retorna o resultado ordenado pela coluna email em ordem crescente;
SELECT * FROM users
ORDER BY email ASC;


-- B) Retorna o resultado ordenado pela coluna price em ordem crescente;
SELECT * FROM products
ORDER BY price ASC
LIMIT 2;


-- C) Retorna os produtos com preços dentro do intervalo mockado em ordem crescente;
SELECT * FROM products
WHERE price >= 1000 AND price <= 2500
ORDER BY price ASC;


-- Exercício 1 - Relações SQL I: Criação da tabela de pedidos;
CREATE TABLE purchases (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    total_price REAL NOT NULL,
    paid INTEGER NOT NULL,
    delivered_at TEXT NULL,
    buyer_id TEXT NOT NULL,
    FOREIGN KEY (buyer_id) REFERENCES users (id)
);


-- Exercício 2 - Relações SQL I: A) Criação de dois pedidos para cada usuário cadastrado;
INSERT INTO purchases (id, total_price, paid, delivered_at, buyer_id)
VALUES
("purchase001", 1000, 0, NULL, "u001"),
("purchase002", 2500, 0, NULL, "u001"),
("purchase003", 1200, 0, NULL, "u002"),
("purchase004", 1800, 0, NULL, "u002");


-- B) Edição do status da data de entrega dos pedidos;
UPDATE purchases
SET delivered_at = "18/03/2023"
WHERE buyer_id = "u001";

UPDATE purchases
SET delivered_at = "20/03/2023"
WHERE buyer_id = "u002";


-- Exercício 3 - Relações SQL I: Retorna a junção das tabelas "purchases" e "users";
SELECT * FROM purchases
INNER JOIN users
ON purchases.buyer_id = users.id;


-- Exercício 1 - Relações SQL II: Criação da tabela de relações "purchases_products";
CREATE TABLE purchases_products (
    purchase_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL
);


-- Exercício 2 - Relações SQL II: Popula a tabela "purchases_products" simulando 3 compras diferentes;
INSERT INTO purchases_products (purchase_id, product_id, quantity)
VALUES
("purchase001", "p001", 2),
("purchase002", "p002", 3),
("purchase003", "p003", 1);