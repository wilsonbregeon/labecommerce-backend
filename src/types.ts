export type TUser = {
    id: string,
    email: string,
    password: string
}

export type TUserDB = {
    id: string,
    name: string
    email: string,
    password: string
}

export type TProduct = {
    id: string,
    name: string,
    price: number,
    category: TCategory
}

export type TProductDB = {
    id: string,
    name: string,
    price: number,
    description: string,
    image_url: string
}

export type TPurchase = {
    userId: string,
    productId: string,
    quantity: number,
    totalPrice: number
}

export type TPurchaseDB = {
    id: string,
    buyer: string,
    total_price: number,
    created_at: string,
    paid: number
}

export enum TCategory {
    ELECTRONICS = "Eletrônicos",
    PERIPHERAL = "Periféricos",
    HARDWARE = "Hardware"
}
