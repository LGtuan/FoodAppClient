import { FavoriteOrderModel } from "../redux"
import { FAVORITE_ORDER_URL } from "../utils"

export const getFavoriteOrder = async (userId: string, token: string) => {
    let res = await fetch(FAVORITE_ORDER_URL + '/' + userId, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        }
        , body: JSON.stringify({ token })
    })
    if (res.status == 200) {
        let json = await res.json()
        return json
    }
    return {}
}

export const addFavoriteOrder = async (userId: string, orderName: string, token: string) => {
    let res = await fetch(FAVORITE_ORDER_URL + '/add/' + userId, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        }
        , body: JSON.stringify({ token, orderName })
    })
    if (res.status == 200) {
        let json = await res.json()
        return json
    }
    return {}
}

export const deleteFavoriteOrder = async (userId: string, orderId: string, token: string) => {
    await fetch(FAVORITE_ORDER_URL + '/delete/' + userId, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        }
        , body: JSON.stringify({ token, orderId })
    })
}

export const addProductToFavoriteOrder = async (userId: string, productId: string,
    arrayOrderId: string[], token: string) => {

    let res = await fetch(FAVORITE_ORDER_URL + '/addProduct/' + userId, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ token, productId, arrayOrderId })
    })

    return res
}

export const updateFavoriteOrder = async (userId: string, order: FavoriteOrderModel, token: string) => {

    let res = await fetch(FAVORITE_ORDER_URL + '/update/' + userId, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ token, order })
    })

    return res
}