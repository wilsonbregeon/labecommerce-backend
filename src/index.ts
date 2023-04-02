import { products, users, purchases, queryProductsByName, createUser, createProduct, createPurchase } from "./database"
import express, { Request, Response } from 'express'
import cors from 'cors'
import { TCategory, TProduct, TProductDB, TPurchase, TPurchaseDB, TUserDB } from "./types"
import { db } from "./database/knex"

const app = express()
app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

// Exercício 1 - Introdução Knex: A) Pesquisa todos os usuários;
app.get('/users', async (req: Request, res: Response) => {
    try {
        const result = await db.raw(`
            SELECT * FROM users;
        `)
        res.status(200).send(result)
    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

// Exercício 1 - Introdução Knex: B) Pesquisa todos os produtos;
app.get('/products', async (req: Request, res: Response) => {
    try {
        const result = await db.raw(`
            SELECT * FROM products;
        `)
        res.status(200).send(result)
    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

// Exercício 1 - Introdução Knex: C) Pesquisa um produto pelo seu "name";
app.get('/product/search', async (req: Request, res: Response) => {
    try {
        const query = req.query.q as string
        if (query !== undefined) {
            if (query.length < 1) {
                res.status(400)
                throw new Error("'query' deve possuir ao menos 1 caractere!")
            }
        } else {
            res.status(400)
            throw new Error("'query' precisa ser definida!")
        }

        const result = await db.raw(`
            SELECT * FROM products
            WHERE name = "${query}";
        `)
        res.status(200).send(result)

    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

// Exercício 2 - Introdução Knex: A) Cria um usuário;
app.post('/users', async (req: Request, res: Response) => {
    try {

        const { id, name, email, password } = req.body

        if (typeof id !== "string") {
            res.status(400)
            throw new Error("'id' deve ser string!")
        }

        if (id.length < 4) {
            res.status(400)
            throw new Error("'id' deve possuir pelo menos 4 caracteres!")
        }

        if (typeof name !== "string") {
            res.status(400)
            throw new Error("'name' deve ser string!")
        }

        if (name.length < 2) {
            res.status(400)
            throw new Error("'name' deve possuir pelo menos 2 caracteres!")
        }

        if (typeof email !== "string") {
            res.status(400)
            throw new Error("'email' deve ser string!")
        }

        if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,12}$/g)) {
            throw new Error("'password' deve possuir entre 8 e 12 caracteres, com letras maiúsculas e minúsculas e no mínimo um número e um caractere especial")
        }

        // const [userIdAlreadyExists]: TUserDB[] | undefined[] = await db("users").where({id})

        const [userIdAlreadyExists] = await db.raw(`
            SELECT * FROM users
            WHERE id = "${id}";
        `)

        if (userIdAlreadyExists) {
            res.status(400)
            throw new Error("'id' já existe!")
        }

        const [userEmailAlreadyExists] = await db.raw(`
            SELECT * FROM users
            WHERE email = "${email}";
        `)

        if (userEmailAlreadyExists) {
            res.status(400)
            throw new Error("'email' já existe!")
        }

        await db.raw(`
            INSERT INTO users (id, name, email, password)
            VALUES ("${id}","${name}","${email}", "${password}");
        `)

        // const [userEmailAlreadyExists]: TUserDB[] | undefined[] = await db("users").where({email})

        // const newUser: TUserDB = {
        //     id,
        //     name,
        //     email,
        //     password
        // }

        // await db("users").insert(newUser)

        res.status(201).send({
            message: "User criado com sucesso!",
        })

    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

// Exercício 2 - Introdução Knex: B) Cria um produto;
app.post('/products', async (req: Request, res: Response) => {
    try {
        const { id, name, price, description, image_url } = req.body

        if (typeof id !== "string") {
            res.status(400)
            throw new Error("'id' deve ser string!")
        }

        if (id.length < 4) {
            res.status(400)
            throw new Error("'id' deve possuir pelo menos 4 caracteres!")
        }

        if (typeof name !== "string") {
            res.status(400)
            throw new Error("'name' deve ser string!")
        }

        if (typeof price !== "number") {
            res.status(400)
            throw new Error("'price' tem que ser number!")
        }

        if (typeof description !== "string") {
            res.status(400)
            throw new Error("'description' tem que ser string!")
        }

        if (typeof image_url !== "string") {
            res.status(400)
            throw new Error("'image_url' tem que ser string!")
        }

        // const [productIdAlreadyExists]: TProductDB[] | undefined[] = await db("products").where({ id })

        const [productIdAlreadyExists] = await db.raw(`
            SELECT * FROM products
            WHERE id = "${id}"
        `)

        if (productIdAlreadyExists) {
            res.status(400)
            throw new Error("'id' já existe!")
        }

        // const newProduct: TProductDB = {
        //     id,
        //     name,
        //     price,
        //     description,
        //     image_url
        // }

        // await db("products").insert(newProduct)

        await db.raw(`
            INSERT INTO products (id, name, price, description, image_url)
            VALUES ("${id}", "${name}", "${price}", "${description}", "${image_url}")
        `)

        res.status(201).send("Produto cadastrado com sucesso!")
    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

// Exercício 2 - Introdução Knex: C) Cria uma compra;
app.post('/purchases', async (req: Request, res: Response) => {
    try {
        const { id, buyer, total_price } = req.body

        if (typeof id !== "string") {
            res.status(400)
            throw new Error("'id' deve ser string!")
        }

        if (typeof buyer !== "string") {
            res.status(400)
            throw new Error("'buyer' deve ser string!")
        }

        if (typeof total_price !== "number") {
            res.status(400)
            throw new Error("'total_price' deve ser number")
        }

        // const [purchaseIdAlreadyExists]: TPurchaseDB[] | undefined[] = await db("purchases").where({ id })

        const [purchaseIdAlreadyExists] = await db.raw(`
            SELECT * FROM purchases
            WHERE id = "${id}";
        `)

        if (purchaseIdAlreadyExists) {
            res.status(400)
            throw new Error("'id' da compra já existe!")
        }

        await db.raw(`
            INSERT INTO purchases (id, buyer, total_price)
            VALUES ("${id}", "${buyer}", "${total_price}");
        `)

        // const newPurchase = {
        //     id,
        //     buyer,
        //     total_price,
        // }

        // await db("purchases").insert(newPurchase)

        // const [insertedPurchase]: TPurchaseDB[] = await db("purchases").where({ id })

        res.status(201).send({
            message: "Compra cadastrada com sucesso!"
            // purchase: insertedPurchase
        })

    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

// Exercício 3 - Introdução Knex: A) Pesquisa um produto através do "id";
app.get('/products/:id', async (req: Request, res: Response) => {
    try {
        const id = req.query.id as string

        if (id[0] !== "p") {
            res.status(400)
            throw new Error("'id' deve iniciar com a letra 'p' minúscula!")
        }

        if (id.length < 4 || id.length > 4) {
            res.status(400)
            throw new Error("'query' deve possuir 4 caracteres!")
        }

        const result = await db.raw(`
            SELECT * FROM products
            WHERE id = "${id}";
        `)

        res.status(200).send(result)
    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

app.get('/user/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const filterUser = users.find((user) => user.id === id)

        if (!filterUser) {
            res.status(404)
            throw new Error("Usuário não encontrado!")
        }
        if (filterUser) {
            res.status(200).send(filterUser)
        } else {
            res.status(200).send("Usuário não encontrado!")
        }
    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

// Exercício 3 - Introdução Knex: B) Pesquisa uma compra de um usuário pelo "id";
app.get('/users/:buyerId/purchases', async (req: Request, res: Response) => {
    try {
        const buyerId = req.params.buyerId as string

        if (buyerId[0] !== "u") {
            res.status(400)
            throw new Error("'buyerId' deve iniciar com a letra 'u' minúscula!")
        }

        if (buyerId.length < 4 || buyerId.length > 4) {
            res.status(400)
            throw new Error("'buyerId' deve possuir 4 caracteres!")
        }

        const result = await db.raw(`
            SELECT * FROM purchases
            WHERE buyer = "${buyerId}";
    `)

        res.status(200).send(result)
    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

// Deletar usuário pelo ID
app.delete('users/:id', async (req: Request, res: Response) => {
    const id = req.params.id
    const filterDeleteUser = users.findIndex((user) => user.id === id)

    if (filterDeleteUser >= 0) {
        users.splice(filterDeleteUser, 1)
    } else {
        res.status(404)
        throw new Error("Usuário não encontrado!")
    }
    res.status(200).send("Usuário excluído com sucesso!")
})

// Editar usuário pelo ID
app.put('users/:id', async (req: Request, res: Response) => {
    const id = req.params.id
    const newId = req.body.id as string | undefined
    const newEmail = req.body.email as string | undefined
    const newPass = req.body.password as string | undefined
    const filterUser = users.find((user) => user.id === id)

    if (!filterUser) {
        res.status(404)
        throw new Error("Usuário não encontrado!")
    }

    if (newEmail !== undefined) {
        if (typeof newEmail !== "string") {
            res.status(400)
            throw new Error("Email deve ser uma string")
        }
    }

    if (newPass !== undefined) {
        if (typeof newPass !== "string") {
            res.status(400)
            throw new Error("Senha deve ser uma string!")
        }
    }

    if (filterUser) {
        filterUser.id = newId || filterUser.id
        filterUser.email = newEmail || filterUser.email
        filterUser.password = newPass || filterUser.password
    }
    res.status(200).send("Atualização realizada com sucesso!")
})

// Criar produto
app.put('/products/:id', async (req: Request, res: Response) => {
    const id = req.params.id
    const newId = req.body.id as string | undefined
    const newName = req.body.name as string | undefined
    const newPrice = req.body.price as number | undefined
    const newCategory = req.body.category as TCategory | undefined

    const filterProduct = products.find((product) => product.id === id)

    if (!filterProduct) {
        res.status(404)
        throw new Error("Produto não encontrado!")
    }

    if (newName !== undefined) {
        if (typeof newName !== "string") {
            res.status(400)
            throw new Error("Valor inválido, nome do cliente precisa ser string!")
        }
    }

    if (newPrice !== undefined) {
        if (typeof newPrice !== "number") {
            res.status(400)
            throw new Error("Valor inválido, preço do produto precisa ser um número!")
        }
    }

    if (newCategory !== undefined) {
        if (
            newCategory !== "Eletrônicos" &&
            newCategory !== "Periféricos" &&
            newCategory !== "Hardware"
        ) {
            res.status(400)
            throw new Error("Valor inválido, categoria do produto informado não existe!")
        }
    }

    if (filterProduct) {
        filterProduct.id = newId || filterProduct.id
        filterProduct.name = newName || filterProduct.name
        filterProduct.price = newPrice || filterProduct.price
        filterProduct.category = newCategory || filterProduct.category
    }
    res.status(200).send("Atualização realizada com sucesso!")
})

// Deletar produto pelo ID
app.delete('/products/:id', async (req: Request, res: Response) => {
    const id = req.params.id
    const filterProductUser = products.findIndex((product) => product.id === id)

    if (filterProductUser >= 0) {
        products.splice(filterProductUser, 1)
    }
    res.status(200).send("Produto excluído com sucesso!")
})

app.get('/purchases', async (req: Request, res: Response) => {
    const result = await db.raw(`
            SELECT * FROM purchases_products;
        `)
    res.status(200).send(result)
})





