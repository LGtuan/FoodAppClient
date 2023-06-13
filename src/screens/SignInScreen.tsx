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
import {
    Svg,
    Path
} from 'react-native-svg'
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
                    <View style={{
                        position: 'absolute',
                        width: '100%',
                        backgroundColor: colors.DEFAULT_ORANGE,
                        height: 245,
                        zIndex: -1
                    }} />
                    <Svg viewBox="0 0 80 80" style={{
                        width: 200, height: 200,
                        position: 'absolute',
                        top: 200,
                        zIndex: -1
                    }} >
                        <Path fill={colors.DEFAULT_ORANGE} d="M38.4,-58.4C52.7,-58.2,69.3,-53.9,75,-43.5C80.8,-33.1,75.6,-16.5,75.2,-0.2C74.8,16.1,79.1,32.1,74.1,43.8C69.2,55.5,54.8,62.8,40.9,69.9C27,77,13.5,83.8,1.3,81.6C-11,79.4,-21.9,68.2,-33.2,59.6C-44.4,51,-55.8,44.9,-62.8,35.4C-69.9,25.9,-72.4,13,-73.1,-0.4C-73.8,-13.7,-72.5,-27.4,-63.6,-33.6C-54.6,-39.7,-37.9,-38.3,-26.1,-39.8C-14.2,-41.3,-7.1,-45.8,2.5,-50.1C12,-54.4,24.1,-58.5,38.4,-58.4Z" />
                    </Svg>
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