import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ScrollView
} from 'react-native'
import React, { useState } from 'react'
import { colors, images } from '@constants'
import { GrayInput, Icon, OrangeButton } from '@components'
import { useNavigation } from '@react-navigation/native'
import { RootState } from '@redux'
import { useSelector } from 'react-redux'
import { utilities } from '@utils'


const EditProfileScreen = () => {

    const { name,
        image,
        email
    } = useSelector((state: RootState) => state.userSlice.user)
    const { canGoBack, goBack } = useNavigation<any>()

    const [emailInput, setEmailInput] = useState(email)
    const [nameInput, setNameInput] = useState(name)
    const error = useSelector((state: RootState) => state.userSlice.error)

    const onGoBack = () => {
        if (canGoBack()) {
            goBack()
        }
    }

    const onCameraclick = () => {

        utilities.checkCamPermission()
            .then(onOk => {
                utilities.openCamera(true).then(avatar => {
                    console.log(avatar)
                })
            })

    }

    return (
        <View style={styles.container}>
            <ScrollView >
                <TouchableOpacity onPress={onGoBack} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon name='chevron-left' size={22} />
                    <Text style={{ fontWeight: 'bold', fontSize: 20, color: colors.TEXT }}>Profile</Text>
                </TouchableOpacity>
                <View style={styles.body}>
                    <View>
                        <Image source={image ? { uri: image } : images['defaultImg']}
                            style={styles.avatar} />
                        <TouchableOpacity style={styles.camBtn} onPress={onCameraclick}>
                            <Icon name='camera-alt' />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, paddingTop: 30 }}>
                        <GrayInput
                            leftIcon={<Icon name='account-circle' size={25} color='#7a7a7a' />}
                            extraProps={{
                                placeholder: 'Name',
                                value: nameInput,
                                onChangeText: setNameInput,
                            }}
                            inputWrapStyle={{ marginTop: 15 }}
                            inputStyle={{ paddingStart: 10 }}
                        />
                        <GrayInput
                            leftIcon={<Icon name='email' size={25} color='#7a7a7a' />}
                            extraProps={{
                                placeholder: 'Email',
                                value: emailInput,
                                onChangeText: setEmailInput,
                            }}
                            inputWrapStyle={{ marginTop: 15 }}
                            inputStyle={{ paddingStart: 10 }}
                        />

                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <OrangeButton text='Xác nhận thay đổi'
                                buttonStyle={{ marginTop: 35 }}

                                onPress={() => { }} />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default EditProfileScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.BACKGROUND_DEFAULT,
        paddingTop: 34,
    },
    avatar: {
        borderRadius: 80,
        width: 160, height: 160,
    },
    body: {
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 20
    },
    camBtn: {
        backgroundColor: colors.DEFAULT_ORANGE,
        width: 50,
        height: 50,
        borderRadius: 30,
        position: 'absolute',
        bottom: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3
    }
})