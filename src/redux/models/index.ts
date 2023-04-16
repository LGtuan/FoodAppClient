
export interface ProductModel {
    _id: string,
    name: string,
    cartId: string,
    image: string,
    numOrder: number,
    price: number,
    content: string,
}

export interface CategoryModel {
    _id: string,
    name: string,
    numProduct: number,
    image: string
}

export interface UserModel {
    _id: string,
    name?: string,
    email: string,
    token?: string,
    password?: string,
    numsNotification: {
        profile: number,
        favoriteFood: number,
        favoriteOrder: number
    },
    favoriteProductIds: string[]
}

export interface ProductOrderItem {
    product: ProductModel,
    quantity: number
}

export interface OrderModel {
    userId?: string,
    products: ProductOrderItem[]
    createdAt?: number,
    status?: number,
}

export interface FavoriteOrderModel {
    _id: string,
    userId?: string,
    products: ProductOrderItem[]
    createdAt?: number,
    updatedAt?: number,
    name?: string
}

export interface FastNotifiModel {
    content?: string,
    btnText?: string,
    show: boolean,
    route?: string
}