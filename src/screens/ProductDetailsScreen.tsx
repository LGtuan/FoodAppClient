import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    StyleSheet,
    Modal,
    Pressable,
    Animated,
    Easing,
} from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { BottomOrdersFavoriteModal, Icon, OrangeButton } from '@components'
import {
    ProductModel,
    addProduct,
    ProductOrderItem,
    setFastNotifi,
    RootState,
    favoriteProduct,
    unFavoriteProduct,
} from '@redux'
import { Icons } from '@components'
import { WINDOW_HEIGHT, URL } from '@utils'
import { colors } from '@constants'
import { useDispatch, useSelector } from 'react-redux'


const ProductDetailsScreen: React.FC<any> = ({ navigation, route }) => {
    const [popupMenuVisible, setPopupVisible] = useState(false)
    const [bottomModalVisible, setBottomVisible] = useState(false)

    const item: ProductModel = useRef(route.params.item).current

    const dispatch = useDispatch()
    const [numOder, setNumOder] = useState(1)
    const animated = useRef(new Animated.Value(0)).current

    const resizeBox = (toValue: number) => {
        if (toValue == 1) setPopupVisible(true)
        Animated.timing(animated, {
            toValue: toValue,
            duration: 200,
            useNativeDriver: true,
            easing: Easing.linear
        }).start(() => {
            if (toValue == 0) setPopupVisible(false)
        })
    }

    const scale = animated.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
    })

    const rotate = animated.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '270deg']
    })

    const listProductIds = useSelector((state: RootState) => state.userSlice?.user?.favoriteProductIds) ?? []
    const [isFavorite, setIsFavorite] = useState(listProductIds.includes(item._id))

    const onIncrement = () => {
        setNumOder(pre => pre + 1)
    }

    const onReduce = () => {
        if (numOder <= 1) return
        setNumOder(pre => pre - 1)
    }

    const onFavorite = () => {
        if (isFavorite) {
            dispatch(unFavoriteProduct(item._id))
            setIsFavorite(false)
        }
        else {
            dispatch(favoriteProduct(item._id))
            setIsFavorite(true)
        }
    }

    const addToShoppingCart = () => {
        let i: ProductOrderItem = {
            product: item,
            quantity: numOder
        }
        dispatch(addProduct(i))
        dispatch(setFastNotifi({
            show: true,
            content: 'Thêm vào giỏ hàng thành công',
            route: 'Order',
            btnText: 'Thanh toán'
        }))
    }

    const onBackPress = () => {
        if (navigation.canGoBack()) {
            navigation.goBack()
        }
    }

    const dismissModal = () => {
        if (popupMenuVisible) setPopupVisible(false)
    }

    return (
        <View style={styles.container}>
            <BottomOrdersFavoriteModal
                visible={bottomModalVisible}
                setVisible={setBottomVisible}
                productId={item._id} />
            {/* popup modal */}
            <Modal
                visible={popupMenuVisible}
                onRequestClose={() => {
                    dismissModal()
                }}
                transparent
                animationType='fade'
                statusBarTranslucent
            >
                <Pressable onPress={() => resizeBox(0)} style={{ flex: 1 }}>
                    <Animated.View style={{
                        backgroundColor: 'white',
                        borderRadius: 6,
                        position: 'absolute',
                        right: 25,
                        top: 60,
                        width: 230,
                        zIndex: 5,
                        transform: [{ scale }],
                    }}>
                        <TouchableOpacity style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            padding: 10,
                        }}
                        >
                            <Text style={{ fontSize: 16, color: 'black' }}>Chia sẻ</Text>
                            <Icon name='share' />
                        </TouchableOpacity>
                        <View style={{
                            height: 1,
                            width: '95%',
                            alignSelf: 'center',
                            backgroundColor: '#3e3e3e69'
                        }} />
                        <TouchableOpacity
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                padding: 10,
                            }}
                            onPress={() => {
                                setBottomVisible(true)
                                resizeBox(0)
                            }}
                        >
                            <Text style={{ fontSize: 16, color: 'black' }}>Thêm vào giỏ yêu thích</Text>
                            <Icon name='add-circle-outline' />
                        </TouchableOpacity>
                        <View style={{
                            height: 1,
                            width: '95%',
                            alignSelf: 'center',
                            backgroundColor: '#3e3e3e69'
                        }} />
                        <TouchableOpacity style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            padding: 10,
                        }}>
                            <Text style={{ fontSize: 16, color: 'black' }}>Bình luận</Text>
                            <Icon name='comment' />
                        </TouchableOpacity>
                    </Animated.View>
                </Pressable>
            </Modal>
            <View style={{ height: '15%' }}>
                <View style={{
                    height: '50%',
                    flexDirection: 'row',
                    paddingHorizontal: 15,
                    alignItems: 'center',
                }}>
                    <TouchableOpacity onPress={onBackPress}>
                        <Icon size={22} name='arrow-back-ios' />
                    </TouchableOpacity>
                    <Text style={{
                        fontSize: 22,
                        fontWeight: '500',
                        color: 'black',
                        flex: 1,
                        textAlign: 'center',
                        paddingStart: 26
                    }}>{item.name}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={onFavorite}>
                            <Icon name={isFavorite ? 'favorite' : 'favorite-outline'} color={isFavorite ? colors.PINK : 'black'} />
                        </TouchableOpacity>
                        <Animated.View style={{
                            transform: [{
                                rotate: rotate
                            }],
                        }}>
                            <TouchableOpacity onPress={() => resizeBox(1)}>
                                <Icon name='more-vert' />
                            </TouchableOpacity>
                        </Animated.View>
                    </View>
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
                            <Text style={{ fontSize: 15 }}>Đã bán</Text>
                            <Text style={styles.textBold} > {item.numOrder}</Text>
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
    )
}

export default ProductDetailsScreen

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: colors.BACKGROUND_DEFAULT,
        paddingTop: 12
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