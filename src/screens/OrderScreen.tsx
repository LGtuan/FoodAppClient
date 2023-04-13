import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback } from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { Icon, Loader, OrangeButton, OrderItem } from '../components'
import { colors } from '../constants'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch, RootState } from '../redux'
import { Icons } from '../components/common/Icon'
import { checkout } from '../redux'

const ListFooter: React.FC<any> = ({ foodTotal, onCheckout }) => {
    return (
        <View style={styles.footer}>
            <View style={styles.infoContainer}>
                <View style={styles.lineInfo}>
                    <Text style={styles.textBold}>Đồ ăn:</Text>
                    <Text style={styles.textBold}>{foodTotal}k</Text>
                </View>
                <View style={styles.lineInfo}>
                    <Text style={styles.textBold}>Vận chuyển:</Text>
                    <Text style={styles.textBold}>40k</Text>
                </View>
                <View style={styles.lineInfo}>
                    <Text style={styles.textBold}>Dịch vụ:</Text>
                    <Text style={styles.textBold}>40k</Text>
                </View>
                <View style={{
                    backgroundColor: 'black',
                    height: 1,
                    marginVertical: 12,
                    marginHorizontal: 20
                }} />
                <View style={styles.lineInfo}>
                    <Text style={[styles.textBold, { fontSize: 20 }]}>Tổng:</Text>
                    <Text style={[styles.textBold, { fontSize: 20 }]}>{foodTotal}k</Text>
                </View>
                <View style={{ height: 30 }} />
                <OrangeButton
                    text='Thanh toán'
                    onPress={onCheckout}
                />
            </View>
        </View>
    )
}

const OrderScreen: React.FC<{ navigation: any }> = ({ navigation }) => {

    const orderItems = useSelector((state: RootState) => state.orderSlice.products)
    const loading = useSelector((state: RootState) => state.orderSlice.loading)

    const dispatch = useDispatch<AppDispatch>()

    const navigateToListProduct = () => {
        navigation.navigate('ListProduct')
    }

    const onCheckout = () => {
        dispatch(checkout())
    }

    const caculateSumPrice = useCallback(() => {
        let sum = 0
        orderItems.forEach(i => {
            sum += (i.product.price * i.quantity)
        });
        return sum / 1000
    }, [orderItems])
    const foodTotal = caculateSumPrice()

    return (
        <View style={styles.container}>
            {loading && <Loader />}
            <Text style={styles.title}>Giỏ hàng</Text>
            {orderItems.length != 0 ? <FlatList
                data={orderItems}
                renderItem={({ item, index }) => (
                    <OrderItem key={index} item={item} index={index} />
                )}
                contentContainerStyle={{
                    rowGap: 15,
                    paddingTop: 15,
                    paddingBottom: 90
                }}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={<ListFooter foodTotal={foodTotal} onCheckout={onCheckout} />}
            /> :
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={[styles.textBold, { fontSize: 18 }]}>Bạn chưa đặt món nào hiện tại</Text>
                    <View style={{ width: 170, paddingTop: 8 }}>
                        <OrangeButton
                            text='Đặt món ngay'
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

export default OrderScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.BACKGROUND_DEFAULT
    },
    title: {
        color: colors.DEFAULT_ORANGE,
        fontSize: 24,
        fontWeight: '700',
        paddingHorizontal: 15,
        paddingTop: 6
    },
    textBold: {
        fontSize: 16,
        color: 'black',
        fontWeight: '700'
    },
    footer: {
        paddingHorizontal: 15,
        paddingTop: 40,
    },
    infoContainer: {
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 3
    },
    lineInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 4
    }
})