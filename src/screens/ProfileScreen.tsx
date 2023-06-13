import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native'
import React from 'react'
import { Icon, OrangeButton } from '@components'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useSelector } from 'react-redux'
import { RootState } from '@redux'
import { colors, images } from '@constants'
import { useNavigation } from '@react-navigation/native'

const ProfileScreen: React.FC<any> = ({ navigation }): JSX.Element => {

    const { user } = useSelector((state: RootState) => state.userSlice)
    const { navigate } = useNavigation<any>()

    const {
        image,
        name,
        email
    } = user

    const onEditProfile = () => {
        navigate('EditProfileScreen')
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={image ? { uri: image } : images['defaultImg']}
                    style={styles.avatar} />
                <TouchableOpacity style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    paddingStart: 10,
                    justifyContent: 'space-between',
                    flex: 1,
                    paddingEnd: 20
                }} onPress={onEditProfile}>
                    <View>
                        <Text style={styles.txtBold}>{name}</Text>
                        <Text >{email}</Text>
                    </View>
                    <Icon name='chevron-right' />
                </TouchableOpacity>
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
        flexDirection: 'row',
        padding: 16
    },
    avatar: {
        borderRadius: 40,
        width: 80, height: 80,
    },
    container: {
        flex: 1,
        backgroundColor: colors.BACKGROUND_DEFAULT,
        paddingTop: 24
    },
    txtBold: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.TEXT
    }
})