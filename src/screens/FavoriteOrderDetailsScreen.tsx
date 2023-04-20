import {
    StyleSheet,
    Text, View,
    TouchableOpacity,
    FlatList
} from 'react-native'
import React, { useState } from 'react'
import { colors } from '../constants'
import { Icon, Icons, OrangeButton, OrderItem } from '../components'
import { FavoriteOrderModel, ProductOrderItem, RootState, setProducts } from '../redux'
import { useDispatch, useSelector } from 'react-redux'
import { updateFavoriteOrder } from '../services'

const FavoriteOrderDetailsScreen = ({ navigation, route }: any) => {

    const [isChange, setIsChange] = useState(false)

    const [items, setItems] = useState<ProductOrderItem[]>(route.params.item.products)
    const { token, _id } = useSelector((state: RootState) => state.userSlice.user)

    const dispatch = useDispatch()

    const onGoBack = () => {
        if (navigation.canGoBack()) navigation.goBack()
    }

    const navigateToListProduct = () => {
        navigation.navigate('ListProduct')
    }

    const onDelete = (index: number) => {
        let newItems = [...items]
        newItems.splice(index, 1)
        setItems(newItems)
        if (!isChange) setIsChange(true)
    }

    const navigateToOrderScreen = () => {
        dispatch(setProducts(items))
        navigation.navigate('Order')
    }

    const updateProduct = () => {
        let order: FavoriteOrderModel = route.params.item
        order.products = items
        updateFavoriteOrder(_id, order, token as string)
    }

    return (
        <View style={styles.container}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingEnd: 10,
                height: 40
            }}>
                <TouchableOpacity
                    onPress={onGoBack}
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        alignSelf: 'baseline',
                    }}>
                    <Icon name='chevron-left' size={42} />
                    <Text style={styles.textBold}>Chi tiết</Text>
                </TouchableOpacity>
                <OrangeButton
                    text='Lưu'
                    rightIcon={<Icon name='save' color='white' size={20} />}
                    textStyle={{ fontSize: 15, fontWeight: '500' }}
                    buttonStyle={{
                        width: 62,
                        height: 30,
                        backgroundColor: !isChange ? 'gray' : colors.DEFAULT_ORANGE
                    }}
                    extraProps={{
                        disabled: !isChange,
                    }}
                    onPress={updateProduct} />
            </View>
            {items.length != 0 ? <FlatList
                data={items}
                renderItem={({ item, index }) => (
                    <View>
                        <TouchableOpacity onPress={() => {
                            onDelete(index)
                        }} style={styles.removeBtn}>
                            <Icon name='clear' color='white' size={24} />
                        </TouchableOpacity>
                        <OrderItem
                            key={index}
                            item={item}
                            index={index}
                            history={true} />
                    </View>
                )}
                contentContainerStyle={{
                    rowGap: 15,
                    paddingTop: 15,
                    paddingBottom: 90
                }}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={
                    <View style={{ paddingHorizontal: 15, marginTop: 20 }}>
                        <OrangeButton
                            text='Sử dụng giỏ hàng này'
                            onPress={navigateToOrderScreen}
                        />
                    </View>
                }
            /> :
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={[styles.textBold, { fontSize: 18 }]}>Bạn chưa thêm đồ ăn cho giỏ hàng này</Text>
                    <Text style={{ width: 290, textAlign: 'center' }} >(Để thêm bạn vui lòng vào chi tiết sản phẩm và nhấn nút 3 chấm góc trên phía bên phải)</Text>
                    <View style={{ width: 170, paddingTop: 8 }}>
                        <OrangeButton
                            text='Thêm ngay'
                            onPress={navigateToListProduct}
                            rightIcon={<Icon type={Icons.Ionicons} name='chevron-forward' color='white' />}
                            buttonStyle={{ height: 40 }}
                        />
                    </View>
                </View>
            }
        </View>
    )
}

export default FavoriteOrderDetailsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.BACKGROUND_DEFAULT
    },
    textBold: {
        fontSize: 17,
        color: 'black',
        fontWeight: '700',

    },
    removeBtn: {
        position: 'absolute',
        top: 0,
        right: 15,
        backgroundColor: colors.DEFAULT_ORANGE,
        borderTopEndRadius: 16,
        padding: 2,
        borderRadius: 4,
        zIndex: 10
    }
})