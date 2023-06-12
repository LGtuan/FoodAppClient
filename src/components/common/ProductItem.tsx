import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { ProductModel, addProduct, setFastNotifi } from '@redux'
import { WINDOW_WIDTH, URL } from '@utils'
import { useNavigation } from '@react-navigation/native'
import OrangeButton from './OrangeButton'
import { useDispatch } from 'react-redux'

interface ProductProps {
    item: ProductModel,
}

const ProductItem: React.FC<ProductProps> = ({ item }) => {

    const { navigate } = (useNavigation() as any)
    const dispatch = useDispatch()

    const navigateToDetails = () => {
        navigate('ProductDetails', { item: item })
    }

    const onAddProduct = () => {
        dispatch(addProduct({ product: item, quantity: 1 }))
        dispatch(setFastNotifi({
            show: true,
            content: 'Thêm vào giỏ hàng thành công',
            route: 'Order',
            btnText: 'Thanh toán'
        }))
    }

    return (
        <View style={styles.cardContainer}>
            <TouchableOpacity
                onPress={navigateToDetails}
                style={styles.cardWrap}
                activeOpacity={0.7}>
                <Image style={styles.image} source={{ uri: `${URL}${item.image}` }} />
                <View style={styles.footer}>
                    <Text
                        numberOfLines={1}
                        ellipsizeMode='tail'
                        style={styles.name}>{item.name}</Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingTop: 4
                        }}>
                        <Text style={styles.price}>{item.price / 1000}k</Text>
                        <OrangeButton
                            text='Thêm'
                            onPress={onAddProduct}
                            buttonStyle={{ width: 58, height: 26 }}
                            textStyle={{ fontSize: 15 }} />
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default React.memo(ProductItem)

const styles = StyleSheet.create({
    cardContainer: {
        width: WINDOW_WIDTH / 2 - 7.5,
        alignItems: 'center',
        paddingStart: 15,
    },
    image: {
        width: WINDOW_WIDTH / 2 - 60,
        height: WINDOW_WIDTH / 2 - 60,
        marginHorizontal: 8,
        marginVertical: 12,
        resizeMode: 'contain'
    },
    cardWrap: {
        backgroundColor: 'white',
        width: '100%',
        alignItems: 'center',
        borderRadius: 12,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.20,
        textShadowRadius: 12,
        elevation: 4,
    },
    footer: {
        width: '100%',
        opacity: 0.9,
        padding: 6,
        backgroundColor: '#f8faff',
        borderBottomEndRadius: 12,
        borderBottomStartRadius: 12
    },
    name: {
        color: 'black',
        fontWeight: '500',
        fontSize: 14,
    },
    price: {
        color: '#ff2f2f',
        fontWeight: '600'
    }
})