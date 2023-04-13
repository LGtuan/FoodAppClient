import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { FastNotification, Icon, OrangeButton } from '../components'
import { ProductModel, addProduct, ProductOrderItem } from '../redux'
import { Icons } from '../components/common/Icon'
import { WINDOW_HEIGHT } from '../utils/display'
import { URL } from '../utils/service'
import { colors } from '../constants'
import { useDispatch } from 'react-redux'


const ProductDetailsScreen: React.FC<any> = ({ navigation, route }) => {
    let item: ProductModel = route.params.item

    const [showFastNotify, setShowFastNotify] = useState(false)

    const dispatch = useDispatch()

    const [numOder, setNumOder] = useState(1)

    const onIncrement = () => {
        setNumOder(pre => pre + 1)
    }

    const onReduce = () => {
        if (numOder <= 1) return
        setNumOder(pre => pre - 1)
    }

    const addToShoppingCart = () => {
        let i: ProductOrderItem = {
            product: item,
            quantity: numOder
        }
        dispatch(addProduct(i))
        setShowFastNotify(true)
    }

    const onBackPress = () => {
        if (navigation.canGoBack()) {
            navigation.goBack()
        }
    }

    return (
        <View>
            <FastNotification show={showFastNotify} setShow={setShowFastNotify} />
            <View style={styles.container}>
                <View style={{ height: '15%' }}>
                    <View style={{ height: '50%', flexDirection: 'row', paddingHorizontal: 15, alignItems: 'center', justifyContent: 'space-between' }}>
                        <TouchableOpacity onPress={onBackPress}>
                            <Icon size={22} name='arrow-back-ios' />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 22, fontWeight: '500', color: 'black' }}>{item.name}</Text>
                        <TouchableOpacity>
                            <Icon name='more-vert' />
                        </TouchableOpacity>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Text>{item.content}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.textBold}>4.8</Text>
                            <Icon type={Icons.Octicons} name='star-fill' size={18} color='#ff4400' />
                            <Text> (893 rate) </Text>
                        </View>
                    </View>
                </View>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{ width: '100%' }}>
                    <View style={{ alignItems: 'center' }}>
                        <Image
                            source={{ uri: `${URL}${item.image}` }}
                            style={styles.image} />
                        <View style={styles.infoContainer}>
                            <View style={styles.infoItem}>
                                <Text style={{ fontSize: 15 }}>Calories</Text>
                                <Text style={styles.textBold}>120</Text>
                            </View>
                            <View style={styles.vertLine} />
                            <View style={styles.infoItem}>
                                <Text style={{ fontSize: 15 }}>Trọng lượng</Text>
                                <Text style={styles.textBold}>500g</Text>
                            </View>
                            <View style={styles.vertLine} />
                            <View style={styles.infoItem}>
                                <Text style={{ fontSize: 15 }}>Số lượng</Text>
                                <Text style={styles.textBold} > {item.quantity}</Text>
                            </View>
                        </View>
                        <View style={styles.footerInfoContainer}>
                            <View style={{ height: 50, justifyContent: 'space-between' }}>
                                <Text>Order</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <TouchableOpacity onPress={onIncrement}>
                                        <Icon name='add-circle-outline' size={24} />
                                    </TouchableOpacity>
                                    <Text style={[{ fontSize: 16, paddingHorizontal: 6 }, styles.textBold]}>
                                        {
                                            numOder >= 10 ? numOder : '0' + numOder
                                        }
                                    </Text>
                                    <TouchableOpacity onPress={onReduce}>
                                        <Icon name='remove-circle-outline' size={24} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ height: 50, justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text>Chuyển phát</Text>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#07d307' }}>Nhanh</Text>
                            </View>
                            <View style={{ height: 50, justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                <Text>Tổng tiền</Text>
                                <Text
                                    style={{
                                        fontSize: 16,
                                        fontWeight: 'bold',
                                        color: '#ff4400'
                                    }}>
                                    {(item.price / 1000) * numOder}k</Text>
                            </View>
                        </View>
                        <View style={{ paddingTop: 35, width: '100%', paddingHorizontal: 15 }}>
                            <OrangeButton
                                text='Thêm vào giỏ hàng'
                                onPress={addToShoppingCart}
                                rightIcon={<Icon name='add-circle-outline' size={24} color='white' />}
                            />
                        </View>
                    </View>
                </ScrollView>
            </View >
        </View >
    )
}

export default ProductDetailsScreen

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: colors.BACKGROUND_DEFAULT
    },
    infoItem: {
        alignItems: 'center',
        height: 48,
        justifyContent: 'space-between'
    },
    textBold: {
        fontWeight: 'bold',
        color: 'black',
        fontSize: 15
    },
    vertLine: {
        width: 1.5,
        height: 30,
        backgroundColor: 'black',
        marginHorizontal: 20
    },
    image: {
        resizeMode: 'contain',
        width: WINDOW_HEIGHT * 0.45,
        height: WINDOW_HEIGHT * 0.45
    },
    infoContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    footerInfoContainer: {
        paddingHorizontal: 15,
        width: '100%',
        justifyContent: 'space-between',
        marginTop: 40,
        flexDirection: 'row'
    },
    btnContainer: {
        alignItems: 'center',
        width: '100%',
        marginTop: 45,
        paddingHorizontal: 15
    }
})