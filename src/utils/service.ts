const host = '3000'
const ip4 = '192.168.0.103'
export const URL = `http://${ip4}:${host}`

export const PRODUCT_URL = `${URL}/api/products`
export const USER_URL = `${URL}/api/users`
export const CATEGORY_URL = `${URL}/api/categories`

export const ORDER_URL = `${URL}/api/orders`
export const FAVORITE_ORDER_URL = `${URL}/api/orders/favorite`

export const POPULATE_PRODUCT_URL = `${URL}/api/products/populate`
export const FAVORITE_PRODUCT_URL = `${URL}/api/products/favorite`