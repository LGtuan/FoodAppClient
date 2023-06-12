import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TouchableOpacityProps,
    StyleProp,
    ViewStyle,
    TextStyle
} from 'react-native'
import React from 'react'
import { colors } from '@constants'

interface Props {
    text?: string,
    leftIcon?: JSX.Element,
    rightIcon?: JSX.Element,
    buttonStyle?: StyleProp<ViewStyle>,
    textStyle?: StyleProp<TextStyle>,
    onPress: () => void,
    extraProps?: TouchableOpacityProps
}

const OrangeButton: React.FC<Props> = ({ extraProps, buttonStyle = {}, textStyle = {}, ...props }) => {
    return (
        <TouchableOpacity
            {...extraProps}
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
        backgroundColor: colors.DEFAULT_ORANGE,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        elevation: 3
    },
    content: {
        color: colors.TEXT,
        fontSize: 18,
        fontWeight: 'bold',
        paddingHorizontal: 4
    }
})