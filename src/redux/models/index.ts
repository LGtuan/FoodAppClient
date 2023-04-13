
export interface ProductModel {
    _id: string,
    name: string,
    cartId: string,
    image: string,
    quantity: number,
    price: number,
    content: string
}

export interface CategoryModel {
    _id: string,
    name: string,
    numProduct: number,
    image: string
}

export interface UserModel {
    _id?: string,
    name?: string,
    email: string,
    token?: string,
    password?: string
}

export interface ProductOrderItem {
    product: ProductModel,
    quantity: number
}

export interface OrderModel {
    userId?: string,
    products: ProductOrderItem[]
    createdAt?: number,
    status?: number
}