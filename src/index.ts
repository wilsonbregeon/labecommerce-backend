import { products, users, purchases } from "./database"
import express, { Request, Response } from 'express'
import cors from 'cors'
import { TProduct, TPurchase, TUser } from "./types"

const app = express()
app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

app.get('/users', (req: Request, res: Response) => {
    res.status(200).send(users)
})

app.get('/products', (req: Request, res: Response) => {
    res.status(200).send(products)
})

app.get('/product/search', (req: Request, res: Response) => {
    const query = req.query.q as string
    const searchProduct = products.filter((product) => {
        return product.name.toLowerCase().includes(query.toLowerCase())
    })
    res.status(200).send(searchProduct)
})

app.post('/users', (req: Request, res: Response) => {
    const { id, email, password } = req.body as TUser
    const newUser: TUser = {
        id: id,
        email: email,
        password: password
    }
    users.push(newUser)
    res.status(201).send("Estudante cadastrado com sucesso!")
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
    res.status(201).send("Compra realizada com sucesso!")
})



