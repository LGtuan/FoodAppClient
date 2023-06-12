import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { OrangeButton } from '@components'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useSelector } from 'react-redux'
import { RootState } from '@redux'
import { colors, images } from '@constants'

const ProfileScreen: React.FC<any> = ({ navigation }): JSX.Element => {

    const { user } = useSelector((state: RootState) => state.userSlice)

    const {
        image,
        name
    } = user

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={image ? { uri: image } : images['defaultImg']}
                    style={styles.avatar} />
                <View>
                    <Text style={styles.txtBold}>{name}</Text>
                </View>
            </View>
            <OrangeButton onPress={() => {
                navigation.navigate('OrderHistory')
            }} text='Lịch sử đặt hàng' />
            <OrangeButton onPress={async () => {
                await AsyncStorage.removeItem('user')
                navigation.navigate('SignIn')
            }} text='Đăng xuất khỏi trái đất' />
            <Text>ProfileScreen</Text>
        </View>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row'
    },
    avatar: {
        borderRadius: 40,
        width: 80, height: 80,
    },
    container: {
        flex: 1,
        backgroundColor: colors.BACKGROUND_DEFAULT
    },
    txtBold: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.TEXT
    }
})