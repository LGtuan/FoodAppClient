import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, clearNumsNotification } from '@redux'
import { getFavoriteProduct } from '@services'
import { Icon, Icons, OrangeButton, ProductItem } from '@components'
import { colors } from '@constants'
import Spinner from 'react-native-spinkit'

const FavoriteFoodScreen: React.FC<any> = ({ navigation }) => {

    const [favoriteList, setFavoriteList] = useState([])
    const { favoriteProductIds, _id, token } = useSelector((state: RootState) => state.userSlice.user)
    const [isLoading, setIsLoading] = useState(true)

    const dispatch = useDispatch()

    useEffect(() => {
        getFavoriteProduct(_id, favoriteProductIds, token as string)
            .then(data => {
                setFavoriteList(data)
                setIsLoading(false)
            })
        dispatch(clearNumsNotification({ favoriteFood: true }))
    }, [])

    const onGoBack = () => {
        if (navigation.canGoBack()) navigation.goBack()
    }

    const navigateToListProduct = () => {
        navigation.navigate('ListProduct')
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
            {isLoading && <View style={{
                position: 'absolute',
                bottom: '40%',
                alignSelf: 'center'
            }}>
                <Spinner color='#ff2f2f' size={60} type='Circle' />
            </View>}
            {(!isLoading && favoriteList.length <= 0) ?
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={[styles.textBold, { fontSize: 18 }]}>Bạn chưa yêu thích món ăn nào hiện tại</Text>
                    <View style={{ width: 140, paddingTop: 8 }}>
                        <OrangeButton
                            text='Đi ngay'
                            onPress={navigateToListProduct}
                            rightIcon={<Icon type={Icons.Ionicons} name='chevron-forward' color='white' />}
                            buttonStyle={{ height: 40 }}
                        />
                    </View>
                </View>
                : <FlatList
                    contentContainerStyle={{
                        rowGap: 22,
                        paddingVertical: 15,
                    }}
                    numColumns={2}
                    data={favoriteList}
                    renderItem={({ item }) => (
                        <ProductItem item={item} />
                    )}
                    showsVerticalScrollIndicator={false}
                />}
        </View>
    )
}

export default FavoriteFoodScreen

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