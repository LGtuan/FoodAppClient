import {
    StatusBar,
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { colors, images, regexs } from '@constants'
import {
    GrayInput,
    Icon,
    Loading,
    OrangeButton,

    Icons
} from '@components'
import { WINDOW_HEIGHT } from '@utils'
import {
    AppDispatch,
    RootState,
    login,
    setError,
    setUser
} from '@redux'
import { useSelector, useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Spinner from 'react-native-spinkit'
import { USER_URL } from '@utils'

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
                let accout = JSON.parse(value)
                if (accout) {
                    if (accout.token) {
                        fetch(USER_URL + '/' + accout._id, {
                            method: 'GET'
                        }).then(res => res.json())
                            .then(json => {
                                if (json.user) {
                                    dispatch(setUser(json.user))
                                    navigateToHome()
                                }
                            })
                            .catch(e => console.log(e))
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
            .match(regexs.EMAIL);
    };

    const onLogin = () => {
        if (email == '' || password == '') {
            dispatch(setError('Vui lòng không bỏ trống dữ liệu!'))
        } else if (!validateEmail(email)) {
            dispatch(setError('Email không đúng định dạng!'))
        } else {
            let accout = { email, password }
            dispatch(login({ accout, navigateToHome }))
        }
    }

    const reset = () => {
        setEmail('')
        setPassword('')
        dispatch(setError(''))
    }

    return (
        <ScrollView style={{ backgroundColor: colors.BACKGROUND_DEFAULT }}>
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
                        color={colors.DEFAULT_ORANGE} />
                </View>
                : <>
                    {loading && <Loading />}
                    <View style={{ marginTop: 250 }}>
                        <Text style={{
                            fontSize: 32,
                            fontWeight: 'bold',
                            color: colors.TEXT,
                            paddingStart: 16,
                        }}>Đăng nhập</Text>
                    </View>
                    <View style={{
                        paddingHorizontal: 15,
                        height: WINDOW_HEIGHT * 0.6,
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
                            <OrangeButton onPress={onLogin} text='Đăng nhập' buttonStyle={{ marginTop: 35 }} />
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 15 }}>Chưa có tài khoản?</Text>
                            <OrangeButton
                                onPress={navigateToSignUp}
                                text='Đăng kí'
                                buttonStyle={{ width: 85, height: 34, marginHorizontal: 10, paddingTop: 3 }}
                                textStyle={{ fontSize: 14, paddingBottom: 3 }}
                                rightIcon={<Icon type={Icons.Feather} name='arrow-right' size={15} />}
                            />
                        </View>
                    </View>
                    <Image source={images['banner1']} style={styles.banner} />
                </>
            }
            <StatusBar backgroundColor='transparent' translucent barStyle={'dark-content'} />
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
    },
    banner: {
        position: 'absolute',
        width: 300, height: 300,
        top: -80,
        right: -60,
        resizeMode: 'contain'
    }
})