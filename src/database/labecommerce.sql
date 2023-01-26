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

SELECT * FROM products;