import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

interface Props {
    text?: string,
    leftIcon?: JSX.Element,
    rightIcon?: JSX.Element,
    buttonStyle?: any,
    textStyle?: any,
    onPress: () => void
}

const OrangeButton: React.FC<Props> = ({ buttonStyle = {}, textStyle = {}, ...props }) => {
    return (
        <TouchableOpacity
            onPress={props.onPress}
            style={[styles.btnContainer, buttonStyle]}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {props.leftIcon && props.leftIcon}
                <Text style={[styles.content, textStyle]}>{props.text}</Text>
                {props.rightIcon && props.rightIcon}
            </View>
        </TouchableOpacity>
    )
}

export default OrangeButton

const styles = StyleSheet.create({
    btnContainer: {
        width: '100%',
        height: 50,
        backgroundColor: '#ff4400',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        elevation: 3
    },
    content: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        paddingHorizontal: 4
    }
})