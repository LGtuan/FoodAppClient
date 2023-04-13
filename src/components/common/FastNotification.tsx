import { StyleSheet, Text, Animated, Easing } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import Icon, { Icons } from './Icon'
import OrangeButton from './OrangeButton'
import { colors } from '../../constants'
import { WINDOW_WIDTH } from '../../utils'

const FastNotification = ({ show, setShow }: any) => {
    const animated = useRef(new Animated.Value(0)).current
    const [isAnimating, setIsAnimating] = useState(false);
    const { navigate } = useNavigation<any>()

    const translateX = animated.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -WINDOW_WIDTH]
    })

    useEffect(() => {
        if (!show) return
        setShow(false)
        if (isAnimating) {
            animated.stopAnimation()
        }

        setIsAnimating(true)
        Animated.timing(animated, {
            duration: 1000,
            toValue: 1,
            useNativeDriver: true,
            easing: Easing.bounce
        }).start(() => {
            Animated.timing(animated, {
                duration: 1000,
                toValue: 0,
                useNativeDriver: true,
                delay: 2000
            }).start(() => {
                setIsAnimating(false)
            })
        })
    }, [show])

    const onNavigateToOrder = () => {
        navigate('Order')
    }

    return (
        <Animated.View style={[styles.container, { transform: [{ translateX }] }]}>
            <Text style={styles.content}>Thêm vào giỏ hàng thành công</Text>
            <OrangeButton
                text='Thanh toán'
                onPress={onNavigateToOrder}
                rightIcon={<Icon type={Icons.Ionicons} size={15} name='chevron-forward' color={colors.DEFAULT_ORANGE} />}
                buttonStyle={{ height: 30, width: 110, marginTop: 8, backgroundColor: 'white' }}
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
        backgroundColor: '#1ca21cff',
        right: -WINDOW_WIDTH,
        top: '20%',
        zIndex: 15,
        paddingStart: 15,
        paddingEnd: 5,
        paddingVertical: 7,
        alignItems: 'center'
    },
    content: {
        fontSize: 18,
        fontWeight: '600',
        color: 'white',
    }
})