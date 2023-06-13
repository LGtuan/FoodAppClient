import {
    StatusBar,
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
} from 'react-native'
import React, { useState } from 'react'
import { colors, images } from '@constants'
import { GrayInput, Icon, Loading, OrangeButton, Icons } from '@components'
import { WINDOW_HEIGHT } from '@utils'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch, RootState, setError, register } from '@redux'

const SignUpScreen: React.FC<any> = ({ navigation }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const loading = useSelector((state: RootState) => state.userSlice.loading)
    const error = useSelector((state: RootState) => state.userSlice.error)

    const dispatch = useDispatch<AppDispatch>()

    const validateEmail = (email: string) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const onGoBack = () => {
        if (navigation.canGoBack()) {
            navigation.goBack()
            dispatch(setError(''))
        }
    }

    const onSignUp = () => {
        if (email == '' || password == '' || password2 == '') {
            dispatch(setError('Vui lòng không bỏ trống dữ liệu!'))
        } else if (password.length < 6) {
            dispatch(setError('Mật khẩu lớn hơn 6 kí tự!'))
        } else if (password != password2) {
            dispatch(setError('Xác thực mật khẩu chưa khớp!'))
        } else if (!validateEmail(email)) {
            dispatch(setError('Email không đúng định dạng!'))
        } else {
            let data = { email, password, name: 'Người dùng' }
            dispatch(register({ user: data }))
            reset()
        }
    }

    const reset = () => {
        setEmail('')
        setPassword('')
        setPassword2('')
        dispatch(setError(''))
    }

    return (
        <ScrollView style={{ backgroundColor: colors.BACKGROUND_DEFAULT }}>
            {loading && <Loading />}
            <>
                <TouchableOpacity onPress={onGoBack}
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        position: 'absolute',
                        paddingStart: 3,
                        zIndex: 10,
                        paddingTop: 24
                    }}>
                    <Icon size={20} name='arrow-back-ios' />
                    <Text style={{ fontSize: 18, fontWeight: '700', color: colors.TEXT }}>Đăng nhập</Text>
                </TouchableOpacity>
                <View style={{ marginTop: 250 }}>
                    <Text style={{
                        fontSize: 32,
                        fontWeight: 'bold',
                        color: colors.TEXT,
                        paddingStart: 16,
                    }}>Đăng kí</Text>
                </View>
                <View style={{
                    paddingHorizontal: 15,
                    height: WINDOW_HEIGHT * 0.6,
                    paddingTop: 35
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
                        <GrayInput
                            leftIcon={<Icon type={Icons.Ionicons} name='ios-lock-closed' size={26} color='#7a7a7a' />}
                            extraProps={{
                                placeholder: 'Xác thự mật khẩu',
                                value: password2,
                                onChangeText: setPassword2,
                                secureTextEntry: true,
                                onFocus: () => dispatch(setError(''))
                            }}
                            inputWrapStyle={{ marginTop: 15 }}
                        />

                        <OrangeButton onPress={onSignUp} text='Đăng kí' buttonStyle={{ marginTop: 35 }} />
                    </View>
                </View>
                <Image source={images['banner1']} style={styles.banner} />
            </>
            <StatusBar backgroundColor='transparent' translucent barStyle={'dark-content'} />
        </ScrollView>
    )
}

export default SignUpScreen

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
    banner: {
        position: 'absolute',
        width: 300, height: 300,
        top: -80,
        right: -60,
        resizeMode: 'contain'
    }
})