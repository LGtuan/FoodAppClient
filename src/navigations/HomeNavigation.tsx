import { View, TouchableOpacity, Animated, Text } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { BottomTabBarButtonProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {
    ListProductScreen,
    ProfileScreen,
    OrderScreen,
    FeatureScreen
} from '@screens'
import { Icons, Icon } from '@components'
import { colors } from '@constants'
import { useSelector } from 'react-redux'
import { RootState } from '@redux'

const BottomTab = createBottomTabNavigator()
const TABBAR_HEIEGHT = 60

interface ButtonTab {
    route: string,
    label: string,
    type: any,
    activeIcon: string,
    inActiveIcon: string,
    component: React.FC<any>,
    badge?: number
}

const tabArr: ButtonTab[] = [
    {
        route: 'ListProduct',
        label: 'Đồ ăn',
        type: Icons.Ionicons,
        activeIcon: 'fast-food',
        inActiveIcon: 'fast-food-outline',
        component: ListProductScreen,
        badge: 0
    },
    {
        route: 'Order',
        label: 'Giỏ hàng',
        type: Icons.Ionicons,
        activeIcon: 'basket',
        inActiveIcon: 'basket-outline',
        component: OrderScreen,
        badge: 0
    },
    {
        route: 'Feature',
        label: 'Tính năng',
        type: Icons.MaterialCommunityIcons,
        activeIcon: 'view-dashboard',
        inActiveIcon: 'view-dashboard-outline',
        component: FeatureScreen,
        badge: 0
    },
    {
        route: 'Profile',
        label: 'Profile',
        type: Icons.Ionicons,
        activeIcon: 'happy',
        inActiveIcon: 'happy-outline',
        component: ProfileScreen,
        badge: 0
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
                {(item.badge != 0 && !focused) && <View style={{
                    position: 'absolute',
                    borderRadius: 15,
                    backgroundColor: colors.DEFAULT_ORANGE,
                    zIndex: 10,
                    width: 18,
                    height: 18,
                    justifyContent: 'center',
                    alignItems: 'center',
                    top: 0,
                    right: 0
                }}>
                    <Text style={{ color: 'white' }}>{item.badge}</Text>
                </View>}
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

    const { numsNotification } = useSelector((state: RootState) => state.userSlice.user)
    const numOrderNotifi = useSelector((state: RootState) => {
        if (state.orderSlice.products.length > 0) return 1
        return 0
    })

    tabArr[1].badge = numOrderNotifi ?? 0
    tabArr[2].badge = (numsNotification?.favoriteFood ?? 0) + (numsNotification?.favoriteOrder ?? 0)
    tabArr[3].badge = numsNotification?.profile ?? 0

    console.log(numsNotification?.favoriteOrder ?? 0)

    return (
        <BottomTab.Navigator screenOptions={{
            headerShown: false,
            tabBarStyle: {
                height: TABBAR_HEIEGHT,
                borderTopRightRadius: 40,
                borderTopLeftRadius: 40,
                position: 'absolute',
                backgroundColor: 'white'
            }
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
                        tabBarShowLabel: false,
                    }}
                />
            ))}
        </BottomTab.Navigator>
    )
}

export default HomeNavigation