import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { ProductModel, addProduct, setFastNotifi } from '@redux'
import { WINDOW_WIDTH } from '@utils'
import { URL } from '@utils'
import { useNavigation } from '@react-navigation/native'
import OrangeButton from './common/OrangeButton'
import { useDispatch } from 'react-redux'
import { colors } from '@constants'

interface ProductProps {
    item: ProductModel
}

const HorizontalProductItem: React.FC<ProductProps> = ({ item }) => {

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
        <View style={{ paddingStart: 15, paddingVertical: 5 }}>
            <TouchableOpacity
                onPress={navigateToDetails}
                style={styles.cardWrap}
                activeOpacity={0.7}>
                <Image style={styles.image} source={{ uri: `${URL}${item.image}` }} />
                <View style={styles.viewWrap}>
                    <Text
                        numberOfLines={1}
                        ellipsizeMode='tail'
                        style={styles.name}>{item.name}</Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingEnd: 10
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

export default React.memo(HorizontalProductItem)

const styles = StyleSheet.create({
    image: {
        width: 100,
        height: 100,
        margin: 2,
        resizeMode: 'contain',
    },
    cardWrap: {
        width: WINDOW_WIDTH * 0.65,
        backgroundColor: 'white',
        alignItems: 'center',
        borderRadius: 12,
        flexDirection: 'row',

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.20,
        textShadowRadius: 12,
        elevation: 4,
    },
    name: {
        color: colors.TEXT,
        fontWeight: '500',
        fontSize: 14,
    },
    price: {
        color: colors.ORANGE_DARK,
        fontWeight: '600'
    },
    viewWrap: {
        flex: 1,
        height: 60,
        justifyContent: 'space-between'
    }
})