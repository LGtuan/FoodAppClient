import {
    Animated,
    StatusBar,
    StyleSheet,
    View
} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import {
    RootState,
    AppDispatch,
    fetchProducts,
    fetchCategories
} from '../redux'
import { FastNotification, ProductItem } from '../components'
import { ListCategory, HomeHeader } from '../components'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from 'react-native-spinkit'
import { WINDOW_HEIGHT } from '../utils/display'
import { colors } from '../constants'
import PopulateProductFlatlist from '../components/common/PopulateProductFlatlist'

const ListProductScreen = () => {
    const productList = useSelector((state: RootState) => {

        const categorySellected =
            useSelector((state: RootState) => state.categoriesSlice.cartIdSellected)

        return state.productsSlide.items.filter((item) => item.cartId == categorySellected)
    })
    const loading = useSelector((state: RootState) => state.productsSlide.loading)
    const dispatch = useDispatch<AppDispatch>()

    const [showFastNotify, setShowFastNotify] = useState(false)

    // const flatListRef: MutableRefObject<FlatList<ProductModel> | null> = useRef<FlatList<ProductModel>>(null);

    const scrollY = useRef(new Animated.Value(0)).current
    const translateHeader = scrollY.interpolate({
        inputRange: [0, 180],
        outputRange: [0, -180],
        extrapolate: 'clamp'
    })

    const changeShow = () => {
        setShowFastNotify(true)
    }

    useEffect(() => {
        dispatch(fetchProducts())
        dispatch(fetchCategories())
    }, [])

    return (
        <View style={styles.container}>
            <FastNotification show={showFastNotify} setShow={setShowFastNotify} />
            <Animated.View style={[
                styles.headerContainer, {
                    transform: [
                        { translateY: translateHeader },

                    ],
                }
            ]}>
                <HomeHeader />
                <PopulateProductFlatlist />
                <ListCategory />
            </Animated.View>
            {!loading ? <Animated.FlatList
                // ref={flatListRef}
                contentContainerStyle={{
                    rowGap: 22,
                    paddingBottom: 90,
                    minHeight: WINDOW_HEIGHT + 260,
                }}
                ListHeaderComponent={() => (
                    <View style={{
                        height: 400,
                        width: 1,
                    }} />
                )}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    {
                        useNativeDriver: true,
                    }
                )}
                scrollEventThrottle={1}
                numColumns={2}
                data={productList}
                renderItem={({ item }) => (
                    <ProductItem item={item} changeShow={changeShow} />
                )}
                showsVerticalScrollIndicator={false}
            /> : <View style={{
                position: 'absolute',
                bottom: '40%',
                alignSelf: 'center'
            }}>
                <Spinner color='#ff2f2f' size={60} type='Circle' />
            </View>}
            <StatusBar backgroundColor={colors.BACKGROUND_DEFAULT} barStyle='dark-content' />
        </View>
    )
}

export default ListProductScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.BACKGROUND_DEFAULT,
        flex: 1
    },
    headerContainer: {
        position: 'absolute',
        top: 0,
        zIndex: 10,
        width: '100%',
        height: 420,
        backgroundColor: colors.BACKGROUND_DEFAULT,
        justifyContent: 'space-between',
    }
})