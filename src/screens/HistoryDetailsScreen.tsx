import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '@constants'
import { Icon, Icons, Loading, OrangeButton, OrderItem } from '@components'
import { ProductOrderItem } from '@redux'

const ListFooter: React.FC<any> = ({ foodTotal }) => {
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
            </View>
        </View>
    )
}

const HistoryDetailsScreen: React.FC<any> = ({ navigation, route }) => {

    const [foodTotal, setFoodTotal] = useState(0)
    const { orderItems } = route.params

    const onGoBack = () => {
        if (navigation.canGoBack()) {
            navigation.goBack()
        }
    }

    useEffect(() => {

    }, [])

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={onGoBack}
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    alignSelf: 'baseline'
                }}>
                <Icon name='chevron-left' size={42} />
                <Text style={styles.textBold}>Chi tiết</Text>
            </TouchableOpacity>
            <FlatList
                data={orderItems}
                renderItem={({ item, index }) => (
                    <OrderItem key={index} item={item} index={index} history={true} />
                )}
                contentContainerStyle={{
                    rowGap: 15,
                    paddingTop: 15,
                    paddingBottom: 90
                }}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={<ListFooter foodTotal={foodTotal} />}
            />
        </View>
    )
}

export default HistoryDetailsScreen


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.BACKGROUND_DEFAULT,
        paddingTop: 24
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