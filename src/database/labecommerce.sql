-- Active: 1679336615120@@127.0.0.1@3306


-- Exercício 2 - Introdução SQL: A) Cria a tabela "users";
-- Exercício 3 - Relações SQL II: Refatoração para a inserção de novas colunas na tabela "users"
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT(DATETIME())
);


-- Exercício 2 - Introdução SQL: B) Popula a tabela "users";
INSERT INTO users ( id, name, email, password)
VALUES 
("u001", "fulano", "fulano@gmail.com", "fulano123"),
("u002", "ciclano", "ciclano@hotmail.com", "ciclano1990"),
("u003", "beltrano", "beltrano@gmail.com", "beltrano2000");


-- Exercício 3 - Introdução SQL: A) Cria a tabela "products";
-- Exercício 3 - Relações SQL II: Refatoração para a inserção de novas colunas na tabela "products"; 
CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL
);


-- B) Popula a tabela "products";
-- Exercício 3 - Relações SQL II: Refatoração para a inserção de novos produtos na tabela "products"; 
INSERT INTO products (id, name, price, description, image_url)
VALUES
("p001", "mouse" , 50, "periférico", "https://picsum.photos/200/300"),
("p002", "teclado", 100, "periférico", "https://picsum.photos/200/300"),
("p003", "smart tv LG", 2000, "eletrônico", "https://picsum.photos/200/300"),
("p004", "placa de vídeo", 3000, "hardware", "https://picsum.photos/200/300"),
("p005", "processador ryzen 7", 2500, "hardware", "https://picsum.photos/200/300");


-- Exercício 1 - Aprofundamento SQL: A) Retorna todos os usuários cadastrados da tabela "users";
SELECT * FROM users;


-- Exercício 1 - Aprofundamento SQL: B) Retorna todos os produtos cadastrados da tabela "products";
SELECT * FROM products;


-- Exercício 1 - Aprofundamento SQL: C) Retorna um produto baseado no "name";
SELECT * FROM products
WHERE name = "mouse";


-- Exercício 1 - Aprofundamento SQL: D) Insere um novo usuário na tabela "users";
INSERT INTO users (id, name, email, password)
VALUES ("u004", "Astrodev", "astrodev@email.com", "astrodev123");


-- Exercício 1 - Aprofundamento SQL: E) Insere um novo produto na tabela "products";
INSERT INTO products (id, name, price, description, image_url)
VALUES ("p006", "web cam", 150, "periférico", "https://picsum.photos/200/300");


-- Exercício 2 - Aprofundamento SQL: A) Retorna o produto baseado no "id";
SELECT * FROM products
WHERE id = "p005";


-- Exercício 2 - Aprofundamento SQL: B) Deleta o usuário baseado no "id";
DELETE FROM users
WHERE id = "u004";


-- Exercício 2 - Aprofundamento SQL: C) Deleta o produto baseado no "id";
DELETE FROM products
WHERE id = "p006";


-- Exercício 2 - Aprofundamento SQL: D) Edita o usuário baseado nos valores mockados;
UPDATE users 
SET email = "astrodev99@email.com"
WHERE id = "u004";


-- Exercício 2 - Aprofundamento SQL: E) Edita o produto baseado nos valores mockados;
UPDATE products
SET name = "cooler"
WHERE id = "p006";


-- Exercício 3 - Aprofundamento SQL: A) Retorna o resultado ordenado pela coluna email em ordem crescente;
SELECT * FROM users
ORDER BY email ASC;


-- Exercício 3 - Aprofundamento SQL: B) Retorna o resultado ordenado pela coluna price em ordem crescente;
SELECT * FROM products
ORDER BY price ASC
LIMIT 2;


-- Exercício 3 - Aprofundamento SQL: C) Retorna os produtos com preços dentro do intervalo mockado em ordem crescente;
SELECT * FROM products
WHERE price >= 1000 AND price <= 2500
ORDER BY price ASC;


-- Exercício 1 - Relações SQL I: Criação da tabela de pedidos;
-- Exercício 3 - Relações SQL II: Refatoração para a inserção de novas colunas na tabela "purchases";
CREATE TABLE purchases (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    buyer TEXT NOT NULL,
    total_price REAL NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL,
    paid INTEGER DEFAULT (0) NOT NULL,
    FOREIGN KEY (buyer) REFERENCES users (id) 
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- Exercício 2 - Relações SQL I: A) Criação de dois pedidos para cada usuário cadastrado;
-- Exercício 3 - Relações SQL II: Refatoração para a inserção de novas compras na tabela "purchases";
INSERT INTO purchases (id, buyer, total_price, paid)
VALUES
("purchase001", "u001", 1000, 0),
("purchase002", "u001", 2500, 0),
("purchase003", "u002", 1200, 0),
("purchase004", "u002", 1800, 0);

SELECT * FROM purchases; 

-- Exercício 2 - Relações SQL I: B) Edição do status da data de entrega dos pedidos;
UPDATE purchases
SET delivered_at = "18/03/2023"
WHERE buyer_id = "u001";

UPDATE purchases
SET delivered_at = "20/03/2023"
WHERE buyer_id = "u002";


-- Exercício 3 - Relações SQL I: Retorna a junção das tabelas "purchases" e "users";
SELECT * FROM purchases
INNER JOIN users
ON purchases.buyer = users.id;


-- Exercício 1 - Relações SQL II: Criação da tabela de relações "purchases_products";
CREATE TABLE purchases_products (
    purchase_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL DEFAULT (1),
    FOREIGN KEY (purchase_id) REFERENCES purchases (id) 
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products (id) 
        ON DELETE CASCADE
        ON UPDATE CASCADE
);


-- Exercício 2 - Relações SQL II: Popula a tabela "purchases_products" simulando 3 compras diferentes;
INSERT INTO purchases_products (purchase_id, product_id, quantity)
VALUES
("purchase001", "p001", 2),
("purchase002", "p002", 3),
("purchase003", "p003", 1);

SELECT * FROM purchases_products;