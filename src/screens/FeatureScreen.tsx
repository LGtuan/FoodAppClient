import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native'
import React from 'react'
import { colors, images } from '../constants'
import { WINDOW_WIDTH } from '../utils'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { RootState } from '../redux'

const FeatureScreen = () => {

    const { favoriteFood } = useSelector((state: RootState) => state.userSlice.user.numsNotification)
    const { navigate } = useNavigation<any>()

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tính năng</Text>
            <ScrollView>
                <View style={{
                    paddingHorizontal: 15,
                    paddingBottom: 15,
                    columnGap: 15,
                    flexWrap: 'wrap',
                    flexDirection: 'row'
                }}>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={() => navigate('FavoriteFood')}>
                        {favoriteFood > 0 &&
                            <View style={styles.badge}>
                                <Text style={{ color: 'white', fontSize: 17, fontWeight: '700' }}>{favoriteFood}</Text>
                            </View>}
                        <Image source={images['favoriteFood']} style={styles.image} />
                        <Text style={styles.textBold} >Đồ ăn yêu thích</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={() => navigate('FavoriteOrder')}>
                        <Image source={images['favoriteOrder']} style={styles.image} />
                        <Text style={styles.textBold} >Giỏ hàng yêu thích</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={() => navigate('Voucher')}>
                        <Image source={images['voucher']} style={styles.image} />
                        <Text style={styles.textBold} >Voucher của tôi</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={() => navigate('Voucher')}>
                        <Image source={images['hamburger']} style={styles.image} />
                        <Text style={styles.textBold} >Đề xuất món ăn</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}

export default FeatureScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.BACKGROUND_DEFAULT,
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
        fontWeight: '700',
        color: 'black',
        textAlign: 'center',
        width: 70,
    },
    btn: {
        elevation: 3,
        backgroundColor: 'white',
        borderRadius: 5,
        height: 170,
        alignItems: 'center',
        justifyContent: 'center',
        width: (WINDOW_WIDTH - 45) / 2,
        marginTop: 15
    },
    badge: {
        width: 30,
        height: 30,
        borderRadius: 20,
        backgroundColor: colors.DEFAULT_ORANGE,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 6,
        right: 6
    },
    image: {
        width: 90,
        height: 90,
        resizeMode: 'contain'
    }
})