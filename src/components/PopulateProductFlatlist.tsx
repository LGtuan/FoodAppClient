import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getPopulateProduct } from '@services'
import { FlatList } from 'react-native-gesture-handler'
import { ProductModel } from '@redux'
import HorizontalProductItem from './HorizontalProductItem'
import { colors } from '@constants'

const PopulateProductFlatlist = () => {

    const [populateList, setPopulateList] = useState<ProductModel[]>([])

    useEffect(() => {
        getPopulateProduct().then(json => setPopulateList(json.data))
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Phổ biến</Text>
            <FlatList
                data={populateList}
                contentContainerStyle={{
                    paddingEnd: 15
                }}
                renderItem={({ item }) => (
                    <HorizontalProductItem item={item} />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}

export default React.memo(PopulateProductFlatlist)

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        paddingBottom: 5
    },
    title: {
        paddingHorizontal: 15,
        fontSize: 18,
        color: colors.TEXT,
        fontWeight: '700'
    },
})