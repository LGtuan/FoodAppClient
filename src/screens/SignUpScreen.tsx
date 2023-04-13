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
import { images } from '../constants'
import { GrayInput, Icon, Loader, OrangeButton } from '../components'
import { Icons } from '../components/common/Icon'
import { WINDOW_HEIGHT } from '../utils/display'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch, RootState, setError, register } from '../redux'

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
        <ScrollView style={{ backgroundColor: 'white' }}>

            {loading && <Loader />}

            <TouchableOpacity onPress={onGoBack}
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    position: 'absolute',
                    padding: 3,
                    zIndex: 10
                }}>
                <Icon name='arrow-back-ios' />
                <Text style={{ fontSize: 18, fontWeight: '700', color: 'black' }}>Đăng nhập</Text>
            </TouchableOpacity>
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
                    }}>Đăng kí</Text>
                </View>
            </View>
            <View style={{
                paddingHorizontal: 15,
                height: WINDOW_HEIGHT * 0.55,
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

                    <OrangeButton onPress={onSignUp} text='Đăng kí' buttonStyle={{ marginTop: 25 }} />
                </View>
            </View>

            <StatusBar barStyle={'dark-content'} />
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
})