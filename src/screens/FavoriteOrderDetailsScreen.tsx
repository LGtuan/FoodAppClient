import {
    StyleSheet,
    Text, View,
    TouchableOpacity,
    FlatList
} from 'react-native'
import React from 'react'
import { colors } from '../constants'
import { Icon, Icons, OrangeButton, OrderItem } from '../components'
import { FavoriteOrderModel, setProducts } from '../redux'
import { useDispatch } from 'react-redux'

const FavoriteOrderDetailsScreen = ({ navigation, route }: any) => {

    const item: FavoriteOrderModel = route.params.item

    const dispatch = useDispatch()

    const onGoBack = () => {
        if (navigation.canGoBack()) navigation.goBack()
    }

    const navigateToListProduct = () => {
        navigation.navigate('ListProduct')
    }

    const navigateToOrderScreen = () => {
        dispatch(setProducts(item.products))
        navigation.navigate('Order')
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
                    }}
                    onPress={() => { }} />
            </View>
            {item.products.length != 0 ? <FlatList
                data={item.products}
                renderItem={({ item, index }) => (
                    <OrderItem key={index} item={item} index={index} />
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
})