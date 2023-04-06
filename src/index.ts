import express, { Request, Response } from 'express'
import cors from 'cors'
import { TProductDB, TPurchaseDB, TUserDB } from "./types"
import { db } from "./database/knex"

const app = express()
app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

// Exercício 1 - Introdução Knex: A) Pesquisa todos os usuários ------ Exercício 1 - Aprofundando Knex: Refatoração do código de raw para query builder;
app.get('/users', async (req: Request, res: Response) => {
    try {
        const result = await db("users")

        res.status(200).send(result)

    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

// Exercício 1 - Introdução Knex: B) Pesquisa todos os produtos ------ Exercício 1 - Aprofundando Knex: Refatoração do código de raw para query builder;
app.get('/products', async (req: Request, res: Response) => {
    try {
        const result = await db("products")

        res.status(200).send(result)

    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

// Exercício 1 - Introdução Knex: C) Pesquisa um produto pelo seu "name" ------ Exercício 1 - Aprofundando Knex: Refatoração do código de raw para query builder;
app.get('/product/search', async (req: Request, res: Response) => {
    try {
        const query = req.query.q as string | undefined

        if (query !== undefined) {
            if (query.length < 1) {
                res.status(400)
                throw new Error("'query' deve possuir ao menos 1 caractere!")
            }
        } else {
            res.status(400)
            throw new Error("'query' precisa ser definida!")
        }

        const result = await db("products").where("name", "LIKE", `%${query}%`)

        res.status(200).send(result)

    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

// Exercício 2 - Introdução Knex: A) Cria um usuário ------ Exercício 1 - Aprofundando Knex: Refatoração do código de raw para query builder;
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
            res.status(400)
            throw new Error("'password' deve possuir entre 8 e 12 caracteres, com letras maiúsculas e minúsculas e no mínimo um número e um caractere especial")
        }

        // Verifica se o "id" do usuário já existe
        const [userIdAlreadyExists]: TUserDB[] | undefined[] = await db("users").where({ id })

        if (userIdAlreadyExists) {
            res.status(400)
            throw new Error("'id' já existe!")
        }

        // Verifica se o "email" do usuário já existe
        const [userEmailAlreadyExists]: TUserDB[] | undefined[] = await db("users").where({ email })

        if (userEmailAlreadyExists) {
            res.status(400)
            throw new Error("'email' já existe!")
        }

        const newUser: TUserDB = {
            id,
            name,
            email,
            password
        }

        await db("users").insert(newUser)

        res.status(201).send({
            message: "User criado com sucesso!",
            user: newUser
        })

    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

// Exercício 2 - Introdução Knex: B) Cria um produto ------ Exercício 1 - Aprofundando Knex: Refatoração do código de raw para query builder;
app.post('/products', async (req: Request, res: Response) => {
    try {
        const { id, name, price, description, image_url } = req.body

        if (typeof id !== "string") {
            res.status(400)
            throw new Error("'id' deve ser string!")
        }

        if (id[0] !== "p") {
            res.status(400)
            throw new Error("'id' deve iniciar com a letra 'p' minúscula!")
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

        // Verifica se a "id" do produto já existe
        const [productIdAlreadyExists]: TProductDB[] | undefined[] = await db("products").where({ id })

        if (productIdAlreadyExists) {
            res.status(400)
            throw new Error("'id' já existe!")
        }

        const newProduct: TProductDB = {
            id,
            name,
            price,
            description,
            image_url
        }

        await db("products").insert(newProduct)

        res.status(201).send({
            message: "Produto cadastrado com sucesso!",
            product: newProduct
        })

    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

// Exercício 2 - Introdução Knex: C) Cria uma compra ------ Exercício 1 - Aprofundando Knex: Refatoração do código de raw para query builder;
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

        // Verifica se o "id" da compra já existe
        const [purchaseIdAlreadyExists]: TPurchaseDB[] | undefined[] = await db("purchases").where({ id })

        if (purchaseIdAlreadyExists) {
            res.status(400)
            throw new Error("'id' da compra já existe!")
        }

        const newPurchase = {
            id,
            buyer,
            total_price,
        }

        await db("purchases").insert(newPurchase)

        const [insertedPurchase]: TPurchaseDB[] = await db("purchases").where({ id })

        res.status(201).send({
            message: "Compra cadastrada com sucesso!",
            purchase: insertedPurchase
        })

    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

// Exercício 3 - Introdução Knex: A) Pesquisa um produto através do "id" ------ Exercício 1 - Aprofundando Knex: Refatoração do código de raw para query builder;
app.get('/products/:id', async (req: Request, res: Response) => {
    try {
        const searchProductId = req.query.id as string

        if (searchProductId === undefined) {
            res.status(400)
            throw new Error("'id' do produto precisa ser definido!")
        }

        if (searchProductId[0] !== "p") {
            res.status(400)
            throw new Error("'id' deve iniciar com a letra 'p' minúscula!")
        }

        if (searchProductId.length < 4 || searchProductId.length > 4) {
            res.status(400)
            throw new Error("'query' deve possuir 4 caracteres!")
        }

        // Procura o "id" do produto no banco de dados para ver se existe
        const [product]: TProductDB[] | undefined[] = await db("products").where({ id: searchProductId })

        // Caso o "id" do produto não existir, retorna a condição abaixo
        if (!product) {
            res.status(404)
            throw new Error("'id' do produto não encontrado!")
        }

        const result = await db("products").where("id", "=", `${searchProductId}`)

        res.status(200).send(result)
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

// ------ Exercício 1 - Aprofundando Knex: Refatoração do código de raw para query builder;
app.get('/users/:id', async (req: Request, res: Response) => {
    try {
        const searchUserId = req.query.id as string

        if (searchUserId === undefined) {
            res.status(400)
            throw new Error("'id' do usuário precisa ser definido!")
        }

        if (searchUserId[0] !== "u" || searchUserId.length > 4 || searchUserId.length < 4) {
            res.status(400)
            throw new Error("'id' do usuário deve iniciar com a letra 'u' minúscula, seguido de 3 números e possuir 4 caracteres. Ex: u001")
        }

        // Procura o "id" do usuário no banco de dados para ver se existe
        const [user]: TUserDB[] | undefined[] = await db("users").where({ id: searchUserId })

        // Caso o "id" do usuário não existir, retorna a condição abaixo
        if (!user) {
            res.status(404)
            throw new Error("'id' do usuário não encontrado!")
        }

        const result = await db("users").where("id", "=", `${searchUserId}`)

        res.status(200).send(result)

    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

// Exercício 3 - Introdução Knex: B) Pesquisa uma compra de um usuário pelo "id" do usuário ------ Exercício 1 - Aprofundando Knex: Refatoração do código de raw para query builder;
app.get('/users/:buyerId/purchases', async (req: Request, res: Response) => {
    try {
        const buyerId = req.params.buyerId as string

        if (buyerId[0] !== "u" || buyerId.length < 4 || buyerId.length > 4) {
            res.status(400)
            throw new Error("'buyerId' deve iniciar com a letra 'u' minúscula, seguido de 3 números e possuir 4 caracteres. Ex: u001")
        }

        const [user]: TPurchaseDB[] | undefined[] = await db("purchases").where({ buyer: buyerId })

        if (!user) {
            res.status(404)
            throw new Error("'id' do usuário não encontrado!")
        }

        const result = await db("purchases")
            .select(
                "id AS purchaseId",
                "buyer AS buyerId",
                "total_price AS totalPrice",
                "created_at AS createdAt",
                "paid"
            )
            .where("buyer", "=", `${buyerId}`)

        res.status(200).send(result)
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

// Deletar usuário pelo ID
app.delete('/users/:id', async (req: Request, res: Response) => {
    try {
        const idToDelete = req.params.id

        if (idToDelete[0] !== "u" || idToDelete.length < 4 || idToDelete.length > 4) {
            res.status(400)
            throw new Error("'id' do usuário deve iniciar com a letra 'u' minúscula, seguido de 3 números e possuir 4 caracteres. Ex: u001")
        }

        const [userIdAlreadyExists]: TUserDB[] | undefined[] = await db("users").where({ id: idToDelete })

        if (!userIdAlreadyExists) {
            res.status(404)
            throw new Error("'id' do usuário não encontrado!")
        }

        await db("purchases").del().where({ buyer: idToDelete })
        await db("users").del().where({ id: idToDelete })

        res.status(200).send({ message: "Usuário deletado com sucesso!" })

    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

// Editar usuário pelo ID
app.put('/users/:id', async (req: Request, res: Response) => {
    try {
        const idToEdit = req.params.id

        const { newId, newName, newEmail, newPassword } = req.body

        // Validações do idToEdit
        if (idToEdit === ":id") {
            res.status(400)
            throw new Error("'id' do usuário a ser editado precisa ter um valor definido!")
        }

        if (idToEdit[0] !== "u") {
            res.status(400)
            throw new Error("'id' do usuário a ser editado precisa iniciar com a letra 'u' minúscula!")
        }

        if (idToEdit.length > 4 || idToEdit.length < 4) {
            res.status(400)
            throw new Error("'id' deve possuir 4 caracteres!")
        }

        if (req.body.raw === undefined) {
            res.status(400)
            throw new Error("Inserir a estrutura do body!")
        }

        // Validações do newId
        if (newId === "") {
            res.status(400)
            throw new Error("'newId' tem que ser preenchido!")
        }

        if (newId[0] !== "u") {
            res.status(400)
            throw new Error("'newId' deve iniciar com a letra 'u' minúscula!")
        }

        if (typeof newId !== "string") {
            res.status(400)
            throw new Error("'newId' precisa ser string!")
        }

        // Validações do newName
        if (newName === "") {
            res.status(400)
            throw new Error("'newName' precisa ser preenchido!")
        }

        if (typeof newName !== "string") {
            res.status(400)
            throw new Error("'newName' precisa ser string!")
        }

        // Validações do newEmail
        if (newEmail === "") {
            res.status(400)
            throw new Error("'newEmail' precisa ser preenchido!")
        }

        if (typeof newEmail !== "string") {
            res.status(400)
            throw new Error("'newEmail' precisa ser string!")
        }

        // Validações do newPassword
        if (typeof newPassword !== "string") {
            res.status(400)
            throw new Error("'newPassword' precisa ser string!")
        }

        if (!newPassword.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,12}$/g)) {
            res.status(400)
            throw new Error("'password' deve possuir entre 8 e 12 caracteres, com letras maiúsculas e minúsculas e no mínimo um número e um caractere especial")
        }

        // Verifica se o "id" do usuário a ser editado existe no banco de dados
        const [user]: TUserDB[] | undefined[] = await db("users").where({ id: idToEdit })

        if (!user) {
            res.status(404)
            throw new Error(`Id:'${idToEdit}' não encontrado na base de dados!`)
        }

        if (user.id === newId) {
            res.status(400)
            throw new Error(`'id' ${newId} já está em uso por esse usuário atualmente!`)
        }

        // Verifica se o "id" do usuário existe no banco de dados
        const [userIdAlreadyExists]: TUserDB[] | undefined[] = await db("users").where({ id: newId })

        if (userIdAlreadyExists) {
            res.status(400)
            throw new Error(`'id' ${newId} já está em uso por um outro usuário!`)
        }

        // Verifica se o "email" do usuário existe no banco de dados
        const [userEmailAlreadyExists]: TUserDB[] | undefined[] = await db("users").where({ email: newEmail })

        if (userEmailAlreadyExists) {
            res.status(400)
            throw new Error(`Email: '${newEmail}' já está sendo utilizado!`)
        }

        const newUser: TUserDB = {
            id: newId,
            name: newName,
            email: newEmail,
            password: newPassword
        }

        await db("users").update(newUser).where({ id: idToEdit })

        res.status(200).send({
            message: "Usuário editado com sucesso!",
            user: newUser
        })

    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

// Edita produto
app.put('/products/:id', async (req: Request, res: Response) => {
    try {
        const idToEdit = req.params.id
        const { newId, newName, newPrice, newDescription, newImageUrl } = req.body

        // Validações do idToEdit
        if (idToEdit === ":id") {
            res.status(200)
            throw new Error("'id' do produto a ser editado precisa ter um valor definido!")
        }

        if (idToEdit[0] !== "p") {
            res.status(400)
            throw new Error("'id' do usuário a ser editado precisa iniciar com a letra 'p' minúscula!")
        }

        if (idToEdit.length > 4 || idToEdit.length < 4) {
            res.status(400)
            throw new Error("'id' deve possuir 4 caracteres!")
        }

        // Validações do newId
        if (newId === "") {
            res.status(400)
            throw new Error("'newId' tem que ser preenchido!")
        }

        if (newId[0] !== "p") {
            res.status(400)
            throw new Error("'newId' deve iniciar com a letra 'p' minúscula!")
        }

        if (typeof newId !== "string") {
            res.status(400)
            throw new Error("'newId' precisa ser string!")
        }

        // Validações do newName
        if (newName === "") {
            res.status(400)
            throw new Error("'newName' precisa ser preenchido!")
        }

        if (typeof newName !== "string") {
            res.status(400)
            throw new Error("'newName' precisa ser string!")
        }

        // Validações do newPrice
        if (typeof newPrice !== "number") {
            res.status(400)
            throw new Error("'newPrice' precisa ser number!")
        }

        // Validações do newDescription
        if (newDescription === "") {
            res.status(400)
            throw new Error("'newDescription' precisa ser preenchido!")
        }

        if (typeof newDescription !== "string") {
            res.status(400)
            throw new Error("'newDescription' precisa ser string!")
        }

        // Validações do newImageUrl
        if (newImageUrl === "") {
            res.status(400)
            throw new Error("'newImageUrl' precisa ser preenchido!")
        }

        if (typeof newImageUrl !== "string") {
            res.status(400)
            throw new Error("'newImageUrl' precisa ser string!")
        }

        // Verifica se o "id" do produto a ser editado existe no banco de dados
        const [product]: TProductDB[] | undefined[] = await db("products").where({ id: idToEdit })

        if (!product) {
            res.status(404)
            throw new Error(`Id:'${idToEdit}' não encontrado na base de dados!`)
        }

        if (product.id === newId) {
            res.status(400)
            throw new Error(`'id' ${newId} já está em uso para esse produto atualmente!`)
        }

        // Verifica se o "id" do usuário existe no banco de dados
        const [productIdAlreadyExists]: TUserDB[] | undefined[] = await db("products").where({ id: newId })

        if (productIdAlreadyExists) {
            res.status(400)
            throw new Error(`'id' ${newId} já está em uso por um outro produto!`)
        }

        const newProduct: TProductDB = {
            id: newId,
            name: newName,
            price: newPrice,
            description: newDescription,
            image_url: newImageUrl
        }

        await db("products").update(newProduct).where({ id: idToEdit })

        res.status(200).send({
            message: "Produto editado com sucesso!",
            user: newProduct
        })

    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

// Deletar produto pelo ID
app.delete('/products/:id', async (req: Request, res: Response) => {
    try {
        const idToDelete = req.params.id

        if (idToDelete[0] !== "p" || idToDelete.length < 4 || idToDelete.length > 4) {
            res.status(400)
            throw new Error("'id' do produto deve iniciar com a letra 'p' minúscula, seguido de 3 números e possuir 4 caracteres. Ex: p001")
        }

        const [productIdAlreadyExists]: TProductDB[] | undefined[] = await db("products").where({ id: idToDelete })

        if (!productIdAlreadyExists) {
            res.status(404)
            throw new Error("'id' do produto não encontrado!")
        }

        await db("products").del().where({ id: idToDelete })

        res.status(200).send({ message: "Produto deletado com sucesso!" })

    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }

})

app.get('/purchases', async (req: Request, res: Response) => {
    const result = await db.raw(`
            SELECT * FROM purchases;
        `)
    res.status(200).send(result)
})





