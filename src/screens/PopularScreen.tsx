import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getPopulateProduct } from '@services'
import { FlatList } from 'react-native-gesture-handler'
import { ProductModel } from '@redux'
import { colors } from '@constants'
import { HorizontalProductItem, Icon, ProductItem } from '@components'
import { useNavigation } from '@react-navigation/native'

const PopularScreen = () => {
    const navigation = useNavigation<any>();
    const [populateList, setPopulateList] = useState<ProductModel[]>([])

    useEffect(() => {
        getPopulateProduct().then(json => setPopulateList(json.data))
    }, [])
    const onGoBack = () => {
        if (navigation.canGoBack()) navigation.goBack()
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
                <Icon name='chevron-left' size={42} />
                <Text style={styles.textBold}>Món ăn yêu thích</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Món ăn được order nhiều nhất</Text>
            <View style={styles.box1}>
                <FlatList
                    data={populateList}
                    contentContainerStyle={{
                        paddingEnd: 15
                    }}
                    renderItem={({ item }) => (
                        <ProductItem item={item} />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        </View>
    )
}

export default React.memo(PopularScreen)

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        paddingBottom: 5
    },
    title: {
        paddingHorizontal: 15,
        fontSize: 18,
        color: colors.TEXT,
        fontWeight: '700',
        marginTop: 20,
    },
    box1: {
        marginTop: 20,
    },
    textBold: {
        fontSize: 16,
        color: 'black',
        fontWeight: '700'
    }
})