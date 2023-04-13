import { View, TouchableOpacity, Animated } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { BottomTabBarButtonProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { ListProductScreen, ProfileScreen, OrderScreen } from '../screens'
import { Icons } from '../components/common/Icon'
import { Icon } from '../components'

const BottomTab = createBottomTabNavigator()
const TABBAR_HEIEGHT = 60

interface ButtonTab {
    route: string,
    label: string,
    type: any,
    activeIcon: string,
    inActiveIcon: string,
    component: React.FC<any>
}

const tabArr: ButtonTab[] = [
    {
        route: 'ListProduct',
        label: 'Đồ ăn',
        type: Icons.Ionicons,
        activeIcon: 'fast-food',
        inActiveIcon: 'fast-food-outline',
        component: ListProductScreen
    },
    {
        route: 'Order',
        label: 'Giỏ hàng',
        type: Icons.Ionicons,
        activeIcon: 'basket',
        inActiveIcon: 'basket-outline',
        component: OrderScreen
    },
    {
        route: 'ListProduct2',
        label: 'Home2',
        type: Icons.Ionicons,
        activeIcon: 'home',
        inActiveIcon: 'home-outline',
        component: ProfileScreen
    },
    {
        route: 'Profile',
        label: 'Profile',
        type: Icons.Ionicons,
        activeIcon: 'happy',
        inActiveIcon: 'happy-outline',
        component: ProfileScreen
    },
]

interface TabBarButtonProps {
    buttonProps: BottomTabBarButtonProps,
    item: ButtonTab
}

const TabBarButton: React.FC<TabBarButtonProps> = (props) => {

    const { item } = props
    const { onPress, accessibilityState } = props.buttonProps
    const focused = accessibilityState?.selected

    const animated = useRef(new Animated.Value(0)).current

    const translateY = animated.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -16]
    })
    const scaleBg = animated.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1]
    })
    const scaleBtn = animated.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 1.2]
    })
    const opacity = animated.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1]
    })

    useEffect(() => {
        if (focused) {
            Animated.timing(animated, {
                duration: 300,
                toValue: 1,
                useNativeDriver: true,
            }).start()
        } else {
            Animated.timing(animated, {
                duration: 300,
                toValue: 0,
                useNativeDriver: true,
            }).start()
        }
    }, [focused])

    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Animated.View
                style={{
                    backgroundColor: focused ? '#ff2f2f' : 'transparent',
                    position: 'absolute',
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                    transform: [
                        { translateY },
                        { scale: scaleBg }
                    ],
                    opacity,
                }}
            />
            <Animated.View
                style={{
                    borderRadius: 40,
                    transform: [
                        { translateY },
                        { scale: scaleBtn }
                    ]
                }}>
                <TouchableOpacity activeOpacity={0} style={{ padding: 10 }} onPress={onPress}>
                    <Icon type={item.type}
                        name={focused ? item.activeIcon : item.inActiveIcon}
                        color={focused ? 'white' : '#ff2f2f'}
                        size={30}
                    />
                </TouchableOpacity>
            </Animated.View>
            <Animated.Text style={{
                color: '#ff2f2f',
                position: 'absolute',
                bottom: -15,
                fontWeight: '700',
                transform: [{
                    translateY
                }, { scale: scaleBg }],
                fontSize: 13
            }}>{item.label}</Animated.Text>
        </View>
    )
}

const HomeNavigation = () => {
    return (
        <BottomTab.Navigator screenOptions={{
            headerShown: false,
            tabBarStyle: {
                height: TABBAR_HEIEGHT,
                borderTopRightRadius: 40,
                borderTopLeftRadius: 40,
                position: 'absolute',
                backgroundColor: '#e9f1f9ff'
            },
        }}
        >
            {tabArr.map((item) => (
                <BottomTab.Screen
                    key={item.route}
                    name={item.route}
                    component={item.component}
                    options={{
                        tabBarButton: (props) => (
                            <TabBarButton buttonProps={props} item={item} />
                        ),
                        tabBarShowLabel: false
                    }}
                />
            ))}
        </BottomTab.Navigator>
    )
}

export default HomeNavigation