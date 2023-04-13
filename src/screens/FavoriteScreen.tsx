import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../constants'

const FavoriteScreen = () => {
    return (
        <View style={styles.container}>
            <Text>FavoriteScreen</Text>
        </View>
    )
}

export default FavoriteScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.BACKGROUND_DEFAULT,
        flex: 1
    }
})