import {
    Animated,
    StatusBar,
    StyleSheet,
    View
} from 'react-native'
import React, { useEffect, useRef } from 'react'
import {
    RootState,
    AppDispatch,
    fetchProducts,
    fetchCategories
} from '@redux'
import { ProductItem } from '@components'
import { ListCategory, HomeHeader, PopulateProductFlatlist } from '@components'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from 'react-native-spinkit'
import { WINDOW_HEIGHT } from '@utils'
import { colors } from '@constants'
const ListProductScreen = () => {
    const productList = useSelector((state: RootState) => {

        const categorySellected =
            useSelector((state: RootState) => state.categoriesSlice.cartIdSellected)

        return state.productsSlide.items.filter((item) => item.cartId == categorySellected)
    })
    const loading = useSelector((state: RootState) => state.productsSlide.loading)
    const dispatch = useDispatch<AppDispatch>()

    // const flatListRef: MutableRefObject<FlatList<ProductModel> | null> = useRef<FlatList<ProductModel>>(null);

    const scrollY = useRef(new Animated.Value(0)).current
    const translateHeader = scrollY.interpolate({
        inputRange: [0, 344],
        outputRange: [0, -344],
        extrapolate: 'clamp'
    })

    useEffect(() => {
        dispatch(fetchProducts())
        dispatch(fetchCategories())
    }, [])

    return (
        <View style={styles.container}>
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
                    marginTop: 32,
                    minHeight: WINDOW_HEIGHT + 320,
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
                    <ProductItem item={item} />
                )}
                showsVerticalScrollIndicator={false}
            /> : <View style={{
                position: 'absolute',
                bottom: '40%',
                alignSelf: 'center'
            }}>
                <Spinner color='#ff2f2f' size={60} type='Circle' />
            </View>}
        </View>
    )
}

export default React.memo(ListProductScreen)

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.BACKGROUND_DEFAULT,
        flex: 1,
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