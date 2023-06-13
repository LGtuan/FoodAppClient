import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native'
import { colors } from '@constants'
import { Icon } from '@components'
import { useNavigation } from '@react-navigation/native'

const EditProfileScreen = () => {

    const { canGoBack, goBack } = useNavigation<any>()

    const onGoBack = () => {
        if (canGoBack()) {
            goBack()
        }
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <TouchableOpacity onPress={onGoBack} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon name='chevron-left' size={22} />
                    <Text style={{ fontWeight: 'bold', fontSize: 20, color: colors.TEXT }}>Profile</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

export default EditProfileScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.BACKGROUND_DEFAULT,
        paddingTop: 24
    }
})