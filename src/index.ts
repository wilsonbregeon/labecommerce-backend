import { products, users, purchases } from "./database"
import express, { Request, Response } from 'express'
import cors from 'cors'
import { TCategory, TProduct, TPurchase, TUser } from "./types"

const app = express()
app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

app.get('/users', (req: Request, res: Response) => {
    res.status(200).send(users)
})

// Pesquisar usuário por id
app.get('/users/:id', (req: Request, res: Response) => {
    const id = req.params.id
    const filterUser = users.find((client) => client.id === id)

    if (filterUser) {
        res.status(200).send(filterUser)
    } else {
        res.status(200).send("Usuário não encontrado!")
    }
})

// Pesquisar compras pelo ID do usuário
app.get('users/:id/purchases', (req: Request, res: Response) => {
    const id = req.params.id
    const filterPurchaseUser = purchases.find((purchase) => purchase.userId === id)

    if(filterPurchaseUser) {
        res.status(200).send(filterPurchaseUser)
    } else {
        res.status(200).send("Compra não encontrada!")
    }
})

// Deletar usuário pelo ID
app.delete('users/:id', (req: Request, res: Response) => {
    const id = req.params.id
    const filterDeleteUser = users.findIndex((user) => user.id === id)

    if(filterDeleteUser >= 0) {
        users.splice(filterDeleteUser, 1)
    }
    res.status(200).send("Cliente excluído com sucesso!")
})

// Editar cliente pelo ID
app.put('users/:id', (req: Request, res: Response) => {
    const id = req.params.id
    const newId = req.body.id as string | undefined
    const newEmail = req.body.email as string | undefined
    const newPass = req.body.password as string | undefined
    const filterUser = users.find((user) => user.id === id)

    if(filterUser) {
        filterUser.id = newId || filterUser.id
        filterUser.email = newEmail || filterUser.id
        filterUser.password = newPass || filterUser.password
    }
    res.status(200).send("Atualização realizada com sucesso!")
})

app.get('/products', (req: Request, res: Response) => {
    res.status(200).send(products)
})

// Buscar produto por query
app.get('/products/search', (req: Request, res: Response) => {
    const query = req.query.q as string
    const searchProduct = products.filter((product) => {
        return product.name.toLowerCase().includes(query.toLowerCase())
    })
    res.status(200).send(searchProduct)
})

app.put('/products/:id', (req: Request, res: Response) => {
    const id = req.params.id
    const newId = req.body.id as string | undefined
    const newName = req.body.name as string | undefined
    const newPrice = req.body.price as number | undefined
    const newCategory = req.body.category as TCategory | undefined
    
    const filterProduct = products.find((product) => product.id === id)

    if(filterProduct) {
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

    if(filterProductUser >= 0) {
        products.splice(filterProductUser, 1)
    }
    res.status(200).send("Produto excluído com sucesso!")
})

app.get('/purchase', (req: Request, res: Response) => {
    res.status(200).send(purchases)
})

app.post('/users', (req: Request, res: Response) => {
    const { id, email, password } = req.body as TUser
    const newUser: TUser = {
        id: id,
        email: email,
        password: password
    }
    users.push(newUser)
    res.status(201).send("Usuário cadastrado com sucesso!")
})

app.post('/products', (req: Request, res: Response) => {
    const { id, name, price, category } = req.body as TProduct
    const newProduct: TProduct = {
        id: id,
        name: name,
        price: price,
        category: category
    }
    products.push(newProduct)
    res.status(201).send("Produto cadastrado com sucesso!")
})

app.post('/purchases', (req: Request, res: Response) => {
    const { userId, productId, quantity, totalPrice } = req.body as TPurchase
    const newPurchase: TPurchase = {
        userId: userId,
        productId: productId,
        quantity: quantity,
        totalPrice: totalPrice
    }
    purchases.push(newPurchase)
    res.status(201).send("Compra cadastrada com sucesso!")
})



