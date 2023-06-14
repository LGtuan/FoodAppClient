import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ORDER_URL } from '@utils'
import { useDispatch, useSelector } from 'react-redux'
import { OrderModel, RootState, setWrong } from '@redux'
import { HistoryItem, Icon } from '@components'
import { colors } from '@constants'

const OrdersHistoryScreen: React.FC<any> = ({ navigation }) => {

    const user = useSelector((state: RootState) => state.userSlice.user)
    const [data, setData] = useState<OrderModel[]>([])

    const dispatch = useDispatch()

    const onGoBack = () => {
        if (navigation.canGoBack()) {
            navigation.goBack()
        }
    }

    useEffect(() => {
        fetch(`${ORDER_URL}/get/${user._id}`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({ token: user.token })
        })
            .then(res => {
                if (res.status == 200) {
                    return res.json()
                } else if (res.status == 401) {
                    dispatch(setWrong(true))
                    return []
                }
            })
            .then(json => {
                setData(json.data)
            })
            .catch(e => console.log(e))
    }, [])

    const navigateHistoryDetails = (index: number) => {

        navigation.navigate('HistoryDetails', { orderItems: data[index].products })
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={onGoBack}
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    alignSelf: 'baseline'
                }}>
                <Icon name='chevron-left' size={24} />
                <Text style={styles.textBold}>Lịch sử đặt hàng</Text>
            </TouchableOpacity>
            <FlatList
                data={data}
                contentContainerStyle={{
                    paddingTop: 16
                }}
                renderItem={({ item, index }) => (
                    <HistoryItem orderItem={item} onPress={() => navigateHistoryDetails(index)} />
                )}
            />
        </View>
    )
}

export default OrdersHistoryScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.BACKGROUND_DEFAULT,
        paddingTop: 34
    },
    textBold: {
        fontSize: 20,
        fontWeight: '700',
        color: 'black',
        paddingBottom: 2
    }
})