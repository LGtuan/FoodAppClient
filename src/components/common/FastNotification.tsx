import { StyleSheet, Text, Animated } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import Icon, { Icons } from './Icon'
import OrangeButton from './OrangeButton'
import { colors } from '../../constants'
import { WINDOW_WIDTH } from '../../utils'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, setFastNotifi } from '../../redux'

const FastNotification = () => {
    const animated = useRef(new Animated.Value(0)).current
    const { navigate } = useNavigation<any>()

    const dispatch = useDispatch()

    const { fastNotifi } = useSelector((state: RootState) => state.appSlice)


    const translateX = animated.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -WINDOW_WIDTH]
    })

    useEffect(() => {
        if (!fastNotifi.show) return
        animated.stopAnimation()
        Animated.timing(animated, {
            duration: 400,
            toValue: 1,
            useNativeDriver: true,
        }).start(() => {
            dispatch(setFastNotifi({ show: false }))
            Animated.timing(animated, {
                duration: 400,
                toValue: 0,
                useNativeDriver: true,
                delay: 2500
            }).start()
        })
    }, [fastNotifi.show])

    const onNavigateToOrder = () => {
        if (fastNotifi.route)
            navigate(fastNotifi.route)
    }

    return (
        <Animated.View style={[styles.container, { transform: [{ translateX }] }]}>
            <Text style={styles.content}>{fastNotifi.content}</Text>
            <OrangeButton
                text={fastNotifi.btnText}
                onPress={onNavigateToOrder}
                rightIcon={<Icon type={Icons.Ionicons} size={15} name='chevron-forward' color={colors.DEFAULT_ORANGE} />}
                buttonStyle={{ height: 35, width: 115, marginTop: 10, backgroundColor: 'white' }}
                textStyle={{ fontSize: 15, fontWeight: '700', color: colors.DEFAULT_ORANGE }}
            />
        </Animated.View>

    )
}

export default FastNotification

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 30,
        backgroundColor: '#1ca21cd5',
        right: -WINDOW_WIDTH,
        top: '15%',
        zIndex: 15,
        paddingStart: 15,
        paddingEnd: 5,
        paddingVertical: 10,
        alignItems: 'center',
    },
    content: {
        fontSize: 18,
        fontWeight: '600',
        color: 'white',
        maxWidth: WINDOW_WIDTH * 0.7,
        textAlign: 'center'
    }
})