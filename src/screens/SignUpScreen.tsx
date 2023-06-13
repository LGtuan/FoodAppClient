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
import { Svg, Path } from 'react-native-svg'

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
                        paddingEnd: 16,
                        textAlign: 'right'
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
                    top: 200, right: 0,
                    zIndex: -1,
                    transform: [{ rotate: '90deg' }]
                }} >
                    <Path fill={colors.DEFAULT_ORANGE} d="M38.4,-58.4C52.7,-58.2,69.3,-53.9,75,-43.5C80.8,-33.1,75.6,-16.5,75.2,-0.2C74.8,16.1,79.1,32.1,74.1,43.8C69.2,55.5,54.8,62.8,40.9,69.9C27,77,13.5,83.8,1.3,81.6C-11,79.4,-21.9,68.2,-33.2,59.6C-44.4,51,-55.8,44.9,-62.8,35.4C-69.9,25.9,-72.4,13,-73.1,-0.4C-73.8,-13.7,-72.5,-27.4,-63.6,-33.6C-54.6,-39.7,-37.9,-38.3,-26.1,-39.8C-14.2,-41.3,-7.1,-45.8,2.5,-50.1C12,-54.4,24.1,-58.5,38.4,-58.4Z" />
                </Svg>
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