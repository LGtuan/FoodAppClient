import { StyleSheet, Text, View, TextInput, TextInputProps } from 'react-native'
import Icon from './Icon'
import React from 'react'

interface Props {
    inputWrapStyle?: any,
    inputStyle?: any,
    extraProps: TextInputProps,
    leftIcon?: JSX.Element,
    rightIcons?: JSX.Element
}

const GrayInput: React.FC<Props> = ({ inputWrapStyle = {}, inputStyle = {}, extraProps, ...props }) => {
    return (
        <View style={[styles.inputWrap, inputWrapStyle]}>
            {props.leftIcon && props.leftIcon}
            <TextInput
                style={[styles.input, inputStyle]}
                {...extraProps}
            />
            {props.rightIcons && props.rightIcons}
        </View>
    )
}

export default GrayInput

const styles = StyleSheet.create({
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
    input: {
        flex: 1,
        fontWeight: '500',
        fontSize: 17
    }
})