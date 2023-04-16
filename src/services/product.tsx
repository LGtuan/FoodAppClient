import { FAVORITE_PRODUCT_URL, POPULATE_PRODUCT_URL } from "../utils"

export const getPopulateProduct = async () => {
    let res = await fetch(POPULATE_PRODUCT_URL, {
        method: 'GET'
    })
    if (res.status == 200) {
        let json = await res.json()
        return json
    } else {
        return {}
    }
}

export const getFavoriteProduct = async (userId: string, productIds: string[], token: string) => {
    let res = await fetch(FAVORITE_PRODUCT_URL + '/' + userId, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        }
        , body: JSON.stringify({ productIds, token })
    })
    if (res.status == 200) {
        let json = await res.json()
        return json
    }
    return {}
}