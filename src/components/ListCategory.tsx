import {
    StyleSheet,
    Text, Animated,
    ScrollView,
    TouchableOpacity,
    ToastAndroid,
    Platform,
    Image,
    View
} from 'react-native'
import { RootState, AppDispatch, setCategoryId } from '@redux'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { URL } from '@utils'
import { colors } from '@constants'

const ListCategory = () => {

    const categoryList = useSelector((state: RootState) => state.categoriesSlice.items)
    const loading = useSelector((state: RootState) => state.productsSlide.loading)
    const categorySellected = useSelector((state: RootState) => state.categoriesSlice.cartIdSellected)

    const disPatch = useDispatch<AppDispatch>()

    const onChangeCategory = (index: number) => {
        if (categoryList[index]._id == categorySellected) return
        if (loading) {
            if (Platform.OS == 'android') {
                ToastAndroid.show('Đang tải đồ ăn ...', ToastAndroid.SHORT)
            }
            return
        }

        disPatch(setCategoryId(categoryList[index]._id))
    }

    return (
        <Animated.View style={styles.container}>
            <Text style={styles.title}>Thể loại</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
            >
                {categoryList.map((item, index) => (
                    <TouchableOpacity
                        activeOpacity={0.7}
                        key={index}
                        onPress={() => onChangeCategory(index)}
                        style={[
                            styles.itemCategory,
                            { marginStart: index == 0 ? 15 : 0 },
                            {
                                backgroundColor: item._id == categorySellected ? colors.DEFAULT_ORANGE : 'white',
                            }]}>
                        <View style={{
                            padding: 4,
                            backgroundColor: item._id == categorySellected ? 'white' : 'transparent',
                            borderRadius: 20
                        }}>
                            <Image source={{ uri: `${URL}${item.image}` }} style={styles.image} />
                        </View>
                        <Text
                            style={{
                                fontSize: 15,
                                fontWeight: '700',
                                paddingStart: 5,
                                color: 'black'
                            }}>{item.name}</Text>
                        {item._id != categorySellected && <Text
                            style={styles.badge}>{item.numProduct}</Text>}
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </Animated.View>
    )
}

export default React.memo(ListCategory)

const styles = StyleSheet.create({
    container: {
        height: 105,
        width: '100%',
        paddingVertical: 5
    },
    title: {
        paddingHorizontal: 15,
        fontSize: 18,
        color: 'black',
        fontWeight: '700'
    },
    itemCategory: {
        height: 46,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        marginRight: 10,
        paddingEnd: 10,
        paddingStart: 7,
        borderRadius: 23,
        elevation: 3,
        flexDirection: 'row'
    },
    badge: {
        position: 'absolute',
        top: -7,
        left: -4,
        fontSize: 11,
        fontWeight: 'bold',
        textAlign: 'center',
        textAlignVertical: 'center',
        borderRadius: 10,
        width: 20,
        height: 20,
        elevation: 5,
        backgroundColor: colors.DEFAULT_ORANGE
    },
    image: {
        width: 20,
        height: 20,
        resizeMode: 'contain'
    }
})