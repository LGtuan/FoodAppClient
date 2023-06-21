import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    ViewStyle,
    StyleProp
} from 'react-native'
import React from 'react'
import { Badge, Icon, Icons, OrangeButton } from '@components'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useSelector } from 'react-redux'
import { RootState } from '@redux'
import { colors, images } from '@constants'
import { useNavigation } from '@react-navigation/native'

const ProfileScreen: React.FC<any> = () => {

    const { user } = useSelector((state: RootState) => state.userSlice)
    const { numsNotification } = user
    const favoriteFoodBadge = numsNotification?.favoriteFood ?? 0
    const { navigate } = useNavigation()


    const {
        image,
        name,
        email
    } = user

    const onEditProfile = () => {
        navigate('EditProfileScreen' as never)
    }

    const handleLogout = async () => {
        await AsyncStorage.removeItem('user')
        navigate('SignIn' as never)
    }

    const onShowHistoryOrder = () => {
        navigate('OrderHistory' as never)
    }


    const onShowFavoriteFood = () => {
        navigate('FavoriteFood' as never)
    }

    const onShowFavoriteOrder = () => {
        navigate('FavoriteOrder' as never)
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
                <View style={styles.header}>
                    <Text style={{
                        fontSize: 24,
                        fontWeight: 'bold',
                        color: colors.TEXT,
                        paddingVertical: 12
                    }}>Profile</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={image ? { uri: `${URL}${image}` } : images['defaultImg']}
                            style={styles.avatar} />
                        <TouchableOpacity style={{
                            alignItems: 'center',
                            flexDirection: 'row',
                            paddingStart: 10,
                            justifyContent: 'space-between',
                            flex: 1,
                            paddingEnd: 20
                        }} onPress={onEditProfile}>
                            <View>
                                <Text style={styles.txtBold}>{name}</Text>
                                <Text >{email}</Text>
                            </View>
                            <Icon name='chevron-right' />
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <GroupInfo style={{ marginTop: 20 }}>
                        <>
                            <InfoComponent onPress={() => { }}
                                badge={0}
                                iconName='payment'
                                label='Phương thức thanh toán' />
                            <InfoComponent onPress={() => { }}
                                badge={0}
                                iconName='place'
                                label='Địa chỉ nhận hàng' />
                            <InfoComponent onPress={onShowFavoriteFood}
                                badge={favoriteFoodBadge}
                                iconName='favorite'
                                label='Món ăn yêu thích' />
                            <InfoComponent onPress={onShowFavoriteOrder}
                                badge={0}
                                iconName='shopping-cart'
                                label='Giỏ hàng tiện ích' />
                            <InfoComponent onPress={() => { }}
                                badge={0}
                                iconType={Icons.MaterialCommunityIcons}
                                iconName='sale'
                                label='Voucher' />
                            <InfoComponent onPress={onShowHistoryOrder}
                                badge={0}
                                iconName='history'
                                label='Lịch sử đặt hàng' />
                        </>
                    </GroupInfo>
                    <GroupInfo style={{ marginTop: 20 }}>
                        <>
                            <InfoComponent onPress={() => { }}
                                badge={0}
                                iconName='settings'
                                label='Cài Đặt' />
                            <InfoComponent onPress={() => { }}
                                badge={0}
                                iconName='support-agent'
                                label='Hỗ trợ' />
                            <InfoComponent
                                badge={0}
                                label='Đăng xuất'
                                iconName='logout'
                                onPress={handleLogout}
                            />
                        </>
                    </GroupInfo>
                </View>
            </ScrollView>
        </View>
    )
}

interface InfoComponentProps {
    label: string,
    onPress: () => void,
    badge: number,
    iconName: string,
    iconType?: any
}
const InfoComponent: React.FC<InfoComponentProps> = ({
    label,
    onPress,
    badge,
    iconName,
    iconType = Icons.MaterialIcons
}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 12
            }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name={iconName} type={iconType} />
                <Text style={{
                    paddingStart: 12,
                    color: colors.TEXT,
                    fontWeight: '600',
                    fontSize: 15
                }}>{label}</Text>
                <Badge style={{ right: -30, top: 7 }} badge={badge} />
            </View>
            <Icon name='chevron-right' size={20} />
        </TouchableOpacity>
    )
}

interface GroupInfoProps {
    // arrayInfoComponent: JSX.Element[],
    children?: JSX.Element,
    style?: StyleProp<ViewStyle>
}
const GroupInfo: React.FC<GroupInfoProps> = ({
    // arrayInfoComponent,
    children,
    style = {}
}) => {

    return (
        <View style={[{
            marginHorizontal: 16,
            backgroundColor: 'white',
            borderRadius: 6,

            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 3,
        },
            style]}>
            {children}
        </View>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    header: {
        padding: 16,
        backgroundColor: colors.DEFAULT_ORANGE,
        paddingTop: 24
    },
    avatar: {
        borderRadius: 40,
        width: 80, height: 80,
    },
    container: {
        flex: 1,
        backgroundColor: colors.BACKGROUND_DEFAULT,
    },
    txtBold: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.TEXT
    }
})