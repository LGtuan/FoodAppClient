import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '@constants'
import { OrderModel } from '@redux'
import { URL } from '@utils'

interface Props {
    orderItem: OrderModel,
    onPress: () => void
}

const timeOneMinute = 60 * 1000;
const timeOneHours = timeOneMinute * 60;
const timeOneDay = timeOneHours * 24;

const HistoryItem: React.FC<Props> = ({ orderItem, onPress }) => {

    const { products, createdAt, status } = orderItem
    const [sumQuantity, setSumQuantity] = useState(0)
    const [sumPrice, setSumPrice] = useState(0)
    const [date, setDate] = useState('')

    useEffect(() => {
        let sQ = 0, sP = 0
        products.forEach(i => {
            sQ += i.quantity
            sP += (i.quantity * i.product.price)
        })
        setSumPrice(sP)
        setSumQuantity(sQ)

        if (createdAt) {
            let result = ''
            let createdDate = new Date(createdAt)
            let nowDate = new Date()
            let timeDistance = nowDate.getTime() - createdDate.getTime()
            if (timeDistance <= timeOneMinute) {
                result = 'now'
            } else if (timeDistance <= timeOneHours) {
                result = Math.round(timeDistance / timeOneMinute) + ' minutes ago'
            } else if (timeDistance <= timeOneDay) {
                result = Math.round(timeDistance / timeOneHours) + ' hour ago'
            } else if (timeDistance <= 3 * timeOneDay) {
                result = Math.round(timeDistance / timeOneDay) + ' day ago'
            } else {
                result = `${createdDate.getTime()}/${createdDate.getMonth()}/${createdDate.getFullYear()}`
            }
            setDate(result)
        }
    }, [])

    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={styles.container}>
            <Text style={styles.date}>{date}</Text>
            <View style={{ flexDirection: 'row' }}>
                <Image style={styles.image} source={{ uri: `${URL}/${products[0].product.image}` }} />
                <View style={{
                    height: 90,
                    alignSelf: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    flex: 1,
                    paddingStart: 10
                }}>
                    <View style={{ justifyContent: 'space-around', paddingBottom: 20 }}>
                        <Text style={styles.textBold}>Sản phẩm: {products.length}</Text>
                        <Text style={{ color: '#9f961b', fontWeight: '500' }}>Số lượng: {sumQuantity}</Text>
                    </View>
                    <View style={{ alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                        <Text style={{ color: status == 0 ? '#0d6bb8' : 'green', fontWeight: '500' }}>{status == 0 ? 'Đang giao' : 'Đã giao'}</Text>
                        <Text style={[styles.textBold, { color: colors.DEFAULT_ORANGE }]}>-{sumPrice / 1000}k</Text>
                    </View>
                </View>
            </View>
            <View style={{
                height: 0.5,
                backgroundColor: 'black',
            }} />
        </TouchableOpacity>
    )
}

export default React.memo(HistoryItem)

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
    },
    image: {
        width: 120,
        height: 120,
        resizeMode: 'contain',
    },
    date: {
        position: 'absolute',
        top: 12,
        right: 5,
        fontSize: 12,
        color: '#3b3b3b',
        fontWeight: '500'
    },
    textBold: {
        fontSize: 17,
        fontWeight: '700',
        color: 'black'
    }
})