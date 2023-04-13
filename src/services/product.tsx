import { POPULATE_PRODUCT_URL } from "../utils"

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