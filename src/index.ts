import { products, users, purchases, queryProductsByName, createUser, createProduct, createPurchase } from "./database"
import express, { Request, Response } from 'express'
import cors from 'cors'
import { TCategory, TProduct, TPurchase, TUser } from "./types"

const app = express()
app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

app.get("/ping", (req: Request, res: Response) => {
    res.send("Pong!")
})

app.get('/users', (req: Request, res: Response) => {
    try {
        res.status(200).send(users)
    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

// Pesquisar usuário por id
app.get('/users/:id', (req: Request, res: Response) => {
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

// Pesquisar compras pelo ID do usuário
app.get('users/:id/purchases', (req: Request, res: Response) => {
    const id = req.params.id
    const filterPurchaseUser = purchases.find((purchase) => purchase.userId === id)

    if (filterPurchaseUser) {
        res.status(200).send(filterPurchaseUser)
    } else {
        res.status(200).send("Compra não encontrada!")
    }
})

// Deletar usuário pelo ID
app.delete('users/:id', (req: Request, res: Response) => {
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
app.put('users/:id', (req: Request, res: Response) => {
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

app.get('/products', (req: Request, res: Response) => {
    try {
        res.status(200).send(products)
    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

// Buscar produto por query
app.get('/products/search', (req: Request, res: Response) => {
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
        const result = queryProductsByName(query)
        res.status(200).send(result)

    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

// Criar produto
app.put('/products/:id', (req: Request, res: Response) => {
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
app.delete('/products/:id', (req: Request, res: Response) => {
    const id = req.params.id
    const filterProductUser = products.findIndex((product) => product.id === id)

    if (filterProductUser >= 0) {
        products.splice(filterProductUser, 1)
    }
    res.status(200).send("Produto excluído com sucesso!")
})

app.get('/purchase', (req: Request, res: Response) => {
    res.status(200).send(purchases)
})

// Criar usuários
app.post('/users', (req: Request, res: Response) => {
    try {
        const id = req.body.id
        const email = req.body.email
        const password = req.body.password
        const newClient: TUser = {
            id: id,
            email: email,
            password: password
        }

        if (id !== undefined) {
            if (typeof id !== "string") {
                res.status(400)
                throw new Error("'id' precisa ser uma string!")
            }
            for (let i = 0; i < users.length; i++) {
                if (users[i].id === id) {
                    res.status(400)
                    throw new Error("'id' existente!")
                }
            }
        } else {
            res.status(400)
            throw new Error("Usuário precisa de uma 'id'")
        }

        if (email !== undefined) {
            if (typeof email !== "string") {
                res.status(400)
                throw new Error("email precisa ser uma string!")
            }

            for (let i = 0; i < users.length; i++) {
                if (users[i].email === email) {
                    res.status(400)
                    throw new Error("email já existente!")
                }
            }
        } else {
            res.status(400)
            throw new Error("email precisa ser cadastrado!")
        }

        if (password !== undefined) {
            if (typeof password !== "string") {
                res.status(400)
                throw new Error("Password precisa ser uma string!")
            }
        } else {
            res.status(400)
            throw new Error("Password precisa ser cadastrado!")
        }

        createUser(id, email, password)
        res.status(201).send("Usuário cadastrado com sucesso!")

    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

// Criar produtos
app.post('/product', (req: Request, res: Response) => {
    try {
        const id = req.body.id
        const name = req.body.name
        const price = req.body.price
        const category = req.body.category

        const newProduct: TProduct = {
            id: id,
            name: name,
            price: price,
            category: category
        }

        for (let i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                res.status(400)
                throw new Error("Produto existente!")
            }
        }
        createProduct(id, name, price, category)
        res.status(201).send("Produto cadastrado com sucesso!")

    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

app.post('/purchases', (req: Request, res: Response) => {
    try {
        const userId = req.body.userId
        const productId = req.body.productId
        const quantity = req.body.quantity
        const totalPrice = req.body.totalPrice

        if (userId !== undefined) {
            if (typeof userId !== "string") {
                res.status(400)
                throw new Error("'id' do usuário precisa ser uma string!")
            }

            // Verifica se o cliente existe na base de dados
            const userExists = users.find((users) => users.id === userId)
            if (!userExists) {
                res.status(404)
                throw new Error("Não existe nenhum usuário cadastrado com essa 'id'!")
            }
        } else {
            res.status(400)
            throw new Error("'id' de usuário precisa ser inserido!")
        }

        if (productId !== undefined) {
            if (typeof productId !== "string") {
                res.status(400)
                throw new Error("'id' do produto precisa ser uma string!")
            }

            const productExists = products.find(product => product.id === productId)
            if (!productExists) {
                res.status(404)
                throw new Error("Não existe nenhum produto cadastrado com essa 'id'")
            }
        } else {
            res.status(400)
            throw new Error("Inserir 'id' do produto!")
        }

        if (quantity !== undefined) {
            if (typeof quantity !== "number") {
                res.status(400)
                throw new Error("Inserir números válidos para quantidade de itens comprados!")
            }
        } else {
            res.status(400)
            throw new Error("Inserir uma quantidade de produtos a serem comprados!")
        }

        if (totalPrice !== undefined) {
            if (typeof totalPrice !== "number") {
                res.status(400)
                throw new Error("Valor do preço total inválido. Necessário informar um número!")
            }

            const product = products.find(product => product.id === productId)
            const { price }: any = product
            if ((price * quantity) !== totalPrice) {
                res.status(400)
                throw new Error("Preço total da compra diverge da quantidade comprada!")
            }
        } else {
            res.status(400)
            throw new Error("Valor final da compra não informado!")
        }

        createPurchase(userId, productId, quantity, totalPrice)
        res.status(201).send("Compra realizada com sucesso!")

    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

