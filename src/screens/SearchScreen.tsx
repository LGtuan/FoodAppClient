import { StyleSheet, Text, View, TouchableOpacity, FlatList, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import { colors } from '@constants'
import { useNavigation } from '@react-navigation/native'
import { GrayInput, Icon, ProductItem } from '@components'
import { useSelector } from 'react-redux'
import { RootState } from '@redux'
import { WINDOW_WIDTH } from '@utils'
const SearchScreen = () => {
    const txtSearch = useSelector((state: RootState) => state.productsSlide.txtSearch)
    const [search, setSearch] = useState(txtSearch);
    const navigation = useNavigation<any>();
    const regex = new RegExp(search, "i");
    const product = useSelector((state: RootState) => {
        return state.productsSlide.items.filter((item) => {
            return regex.test(item.name)
        })
    })
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
                <TextInput value={search} onChangeText={(text) => setSearch(text)} style={{ width: WINDOW_WIDTH - 20 }} />
            </TouchableOpacity>

            <FlatList
                contentContainerStyle={{
                    rowGap: 22,
                    paddingVertical: 15,
                }}
                numColumns={2}
                data={product}
                renderItem={({ item }) => (
                    <ProductItem item={item} />
                )}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}

export default SearchScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.BACKGROUND_DEFAULT
    },
    textBold: {
        fontSize: 16,
        color: 'black',
        fontWeight: '700'
    }
})