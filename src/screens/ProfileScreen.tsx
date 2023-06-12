import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { OrangeButton } from '@components'
import AsyncStorage from '@react-native-async-storage/async-storage'

const ProfileScreen: React.FC<any> = ({ navigation }): JSX.Element => {

    return (
        <View>
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

const styles = StyleSheet.create({})