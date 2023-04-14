import { View, StyleSheet } from 'react-native'
import React, { useRef } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeNavigation from './HomeNavigation'
import {
    ProductDetailsScreen,
    SignInScreen,
    SignUpScreen,
    OrdersHistoryScreen,
    HistoryDetailsScreen
} from '../screens'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch, RootState, setWrong } from '../redux'
import { Text } from 'react-native-paper'
import { FastNotification, OrangeButton } from '../components'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Stack = createNativeStackNavigator()

const RootNavigation = () => {

    const wrongToken = useSelector((state: RootState) => state.appSlice.wrongToken)
    const dispatch = useDispatch<AppDispatch>()

    const navigationRef = useRef<any>()

    const onLogout = async () => {
        await AsyncStorage.removeItem('user')
        navigationRef.current?.navigate('SignIn')
        dispatch(setWrong(false))
    }

    return (
        <View style={{ flex: 1 }}>
            {wrongToken && <View style={{
                position: 'absolute',
                zIndex: 10,
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                backgroundColor: '#00000041',
                alignItems: 'center'
            }}>
                <View style={{
                    width: '90%',
                    height: 105,
                    borderRadius: 6,
                    backgroundColor: 'white',
                    padding: 15,
                    justifyContent: 'space-between',
                }}>
                    <Text style={styles.textBold}>Vui lòng đăng nhập lại!</Text>
                    <OrangeButton
                        onPress={onLogout}
                        text='Đăng nhập'
                        buttonStyle={{ height: 35, width: 100, alignSelf: 'flex-end' }}
                        textStyle={{ fontSize: 16 }}
                    />
                </View>
            </View>}
            <NavigationContainer ref={navigationRef}>
                <FastNotification />
                <Stack.Navigator >
                    <Stack.Screen
                        name='SignIn'
                        options={{ headerShown: false }}
                        component={SignInScreen}
                    />
                    <Stack.Screen
                        name='SignUp'
                        options={{ headerShown: false, animation: 'slide_from_right' }}
                        component={SignUpScreen}
                    />
                    <Stack.Screen
                        name='HomeScreen'
                        options={{ headerShown: false }}
                        component={HomeNavigation} />
                    <Stack.Screen
                        name='ProductDetails'
                        component={ProductDetailsScreen}
                        options={{
                            animation: 'slide_from_right',
                            headerShown: false
                        }} />
                    <Stack.Screen
                        name='OrderHistory'
                        component={OrdersHistoryScreen}
                        options={{
                            animation: 'slide_from_right',
                            headerShown: false
                        }} />
                    <Stack.Screen
                        name='HistoryDetails'
                        component={HistoryDetailsScreen}
                        options={{
                            animation: 'slide_from_right',
                            headerShown: false
                        }} />
                </Stack.Navigator>
            </NavigationContainer>
        </View>
    )
}

export default RootNavigation

const styles = StyleSheet.create({
    textBold: {
        fontSize: 18,
        fontWeight: '700',
        color: 'black'
    }
})