import {
    StatusBar,
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { images } from '../constants'
import { GrayInput, Icon, Loader, OrangeButton } from '../components'
import { Icons } from '../components/common/Icon'
import { WINDOW_HEIGHT } from '../utils/display'
import {
    AppDispatch,
    RootState,
    UserModel,
    login,
    setError,
    setUser
} from '../redux'
import { useSelector, useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Spinner from 'react-native-spinkit'

const SignInScreen: React.FC<any> = ({ navigation }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [checking, setChecking] = useState(true)

    const loading = useSelector((state: RootState) => state.userSlice.loading)
    const error = useSelector((state: RootState) => state.userSlice.error)

    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        AsyncStorage.getItem('user')
            .then((value: any) => {
                let user = JSON.parse(value)
                if (user) {
                    if (user.token) {
                        dispatch(setUser(user))
                        navigateToHome()
                    }
                }
                let myTimeout = setTimeout(() => {
                    setChecking(false)

                    return () => clearTimeout(myTimeout)
                }, 1000)
            })
    }, [])

    const navigateToSignUp = () => {
        navigation.navigate('SignUp')
        dispatch(setError(''))
    }

    const navigateToHome = () => {
        navigation.navigate('HomeScreen')
        reset()
    }

    const validateEmail = (email: string) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const onLogin = () => {
        if (email == '' || password == '') {
            dispatch(setError('Vui lòng không bỏ trống dữ liệu!'))
        } else if (!validateEmail(email)) {
            dispatch(setError('Email không đúng định dạng!'))
        } else {
            let data: UserModel = { email, password }
            dispatch(login({ user: data, navigateToHome }))
        }
    }

    const reset = () => {
        setEmail('')
        setPassword('')
        dispatch(setError(''))
    }

    return (
        <ScrollView style={{ backgroundColor: 'white' }}>
            {checking ?

                <View style={{
                    flex: 1,
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: WINDOW_HEIGHT - 24
                }}>
                    <Spinner
                        style={{ width: 60, height: 60 }}
                        type='Circle' size={50}
                        color='#ff2f2f' />
                </View>
                : <>
                    {loading && <Loader />}
                    <View style={{ height: WINDOW_HEIGHT * 0.45 - 24, justifyContent: 'space-around' }}>
                        <Image source={images['logo']} style={styles.image} />
                        <View style={{
                            backgroundColor: '#ff2f2f',
                            alignSelf: 'baseline',
                            borderTopEndRadius: 40,
                            borderBottomEndRadius: 40,
                            paddingHorizontal: 20,
                            paddingVertical: 15
                        }}>
                            <Text style={{
                                fontSize: 32,
                                fontWeight: 'bold',
                                color: 'white',
                            }}>Đăng nhập</Text>
                        </View>
                    </View>
                    <View style={{
                        paddingHorizontal: 15,
                        height: WINDOW_HEIGHT * 0.55,
                        justifyContent: 'space-around'
                    }}>
                        <View>
                            <Text style={{ color: 'red', fontWeight: 'bold' }}>{error}</Text>

                            <GrayInput
                                leftIcon={<Icon name='email' size={25} color='#7a7a7a' />}
                                extraProps={{
                                    placeholder: 'Email',
                                    value: email,
                                    onChangeText: setEmail,
                                    onFocus: () => dispatch(setError(''))
                                }}
                                inputWrapStyle={{ marginTop: 15 }}
                            />
                            <GrayInput
                                leftIcon={<Icon type={Icons.Ionicons} name='ios-lock-closed' size={26} color='#7a7a7a' />}
                                extraProps={{
                                    placeholder: 'Mật khẩu',
                                    value: password,
                                    onChangeText: setPassword,
                                    secureTextEntry: true,
                                    onFocus: () => dispatch(setError(''))
                                }}
                                inputWrapStyle={{ marginTop: 15 }}
                            />
                            <OrangeButton onPress={onLogin} text='Đăng nhập' buttonStyle={{ marginTop: 25 }} />
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 15 }}>Chưa có tài khoản?</Text>
                            <OrangeButton
                                onPress={navigateToSignUp}
                                text='Đăng kí'
                                buttonStyle={{ width: 80, height: 34, marginHorizontal: 6 }}
                                textStyle={{ fontSize: 14, paddingBottom: 3 }}
                                rightIcon={<Icon type={Icons.Feather} name='arrow-right' color='white' size={15} />}
                            />
                        </View>
                    </View></>
            }
            <StatusBar backgroundColor='white' barStyle={'dark-content'} />
        </ScrollView>
    )
}

export default SignInScreen

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: WINDOW_HEIGHT - 24
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'cover',
        alignSelf: 'center'
    },
    inputWrap: {
        backgroundColor: '#ecf1f7',
        borderRadius: 26,
        flexDirection: 'row',
        width: '100%',
        height: 52,
        alignItems: 'center',
        paddingHorizontal: 10,
        alignSelf: 'center',
        elevation: 3,
    }
})