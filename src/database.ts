import { TProduct, TPurchase, TUser, TCategory } from "./types";

export const users: TUser[] = [
    {
        id: "1",
        email: "fulano@labenu.com",
        password: "teste1"
    },
    {
        id: "2",
        email: "ciclano@labenu.com",
        password: "teste2"
    }
]

export const products: TProduct[] = [
    {
        id: "10",
        name: "mouse",
        price: 20,
        category: TCategory.PERIPHERAL
    },
    {
        id: "11",
        name: "SSD",
        price: 100,
        category: TCategory.HARDWARE
    },
    {
        id: "12",
        name: "Smart TV LG",
        price: 2000,
        category: TCategory.ELECTRONICS
    }
]

export const purchases: TPurchase[] = [
    {
        userId: "1",
        productId: "10",
        quantity: 3,
        totalPrice: 60
    },
    {
        userId: "2",
        productId: "12",
        quantity: 1,
        totalPrice: 2000
    },
    {
        userId: "1",
        productId: "11",
        quantity: 2,
        totalPrice: 200
    }
]

export function createUser(id: string, email: string, password: string): string {
    users.push({
        id,
        email,
        password
    })
    return ("Cadastro realizado com sucesso!")
}

export function getAllUsers(): TUser[] {
    return users
}

export function createProduct(id: string, name: string, price: number, category: TCategory): string {
    products.push({
        id,
        name,
        price,
        category
    })
    return ("Produto criado com sucesso!")
}

export function getAllProducts(): TProduct[] {
    return products
}

export function getProductById(id: string): (undefined | TProduct) {
    return products.find(product => product.id === id)
}

export function queryProductsByName(q: string): TProduct[] {
    return products.filter(product => product.name.toLowerCase().includes(q.toLowerCase()))
}

export function createPurchase(userId: string, productId: string, quantity: number, totalPrice: number): string {
    purchases.push({
        userId,
        productId,
        quantity,
        totalPrice
    })
    return ("Compra realizada com sucesso!")
}

export function getAllPurchasesFromClientId(clientIdToSearch: string): TPurchase[] {
    return purchases.filter(purchase => purchase.userId === clientIdToSearch)
}