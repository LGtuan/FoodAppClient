import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    Modal,
    Pressable
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FavoriteOrderModel, RootState } from '../redux'
import { addFavoriteOrder, deleteFavoriteOrder, getFavoriteOrder } from '../services'
import {
    FavoriteOrderItem,
    GrayInput,
    Icon,
    Icons,
    OrangeButton,
} from '../components'
import { colors } from '../constants'
import Spinner from 'react-native-spinkit'

const FavoriteOrderScreen: React.FC<any> = ({ navigation }) => {

    const [isShowModal, setIsShowModal] = useState(false)
    const [valueInput, setValueInput] = useState('')
    const [error, setError] = useState('')

    const [favoriteList, setFavoriteList] = useState<FavoriteOrderModel[]>([])
    const { _id, token } = useSelector((state: RootState) => state.userSlice.user)
    const [isLoading, setIsLoading] = useState(true)

    const getFavoriteList = () => {
        getFavoriteOrder(_id, token as string)
            .then(data => {
                setFavoriteList(data)
                setIsLoading(false)
            })
    }

    useEffect(() => {
        getFavoriteList()
    }, [])

    const onGoBack = () => {
        if (navigation.canGoBack()) navigation.goBack()
    }

    const showModal = () => {
        if (!isShowModal) setIsShowModal(true)
    }

    const dismissModal = () => {
        if (isShowModal) setIsShowModal(false)
    }

    const onAddFavoriteOrder = () => {
        if (!valueInput) {
            setError('Vui lòng không bỏ trống dữ liệu')
        } else {
            setValueInput('')
            addFavoriteOrder(_id, valueInput, token as string)
                .then(json => {
                    if (json) setFavoriteList(pre => [json, ...pre])
                    dismissModal()
                })
        }
    }

    const navigateToListProduct = () => {
        navigation.navigate('ListProduct')
    }

    return (
        <View style={styles.container}>
            <Modal animationType='fade'
                visible={isShowModal}
                onRequestClose={dismissModal}
                transparent
                statusBarTranslucent>
                <Pressable
                    onPress={dismissModal}
                    style={{
                        backgroundColor: '#00000046',
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <View style={styles.centeredModal}>
                        <Text style={[styles.textBold, { paddingBottom: 20 }]}>Tạo giỏ hàng</Text>
                        <View style={{ width: '94%' }}>
                            <Text style={{ color: 'red', fontWeight: '700', paddingBottom: 5 }}>{error}</Text>
                        </View>
                        <GrayInput
                            extraProps={{
                                value: valueInput,
                                onChangeText: setValueInput,
                                placeholder: 'Tên giỏ hàng',
                                onBlur: () => setError('')
                            }}
                        />
                        <OrangeButton
                            text='Thêm mới'
                            onPress={() => onAddFavoriteOrder()}
                            buttonStyle={{ marginTop: 25 }}
                        />
                    </View>
                </Pressable>
            </Modal>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingEnd: 10,
                height: 40
            }}>
                <TouchableOpacity
                    onPress={onGoBack}
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        alignSelf: 'baseline',
                    }}>
                    <Icon name='chevron-left' size={42} />
                    <Text style={styles.textBold}>Giỏ hàng yêu thích</Text>
                </TouchableOpacity>
                <OrangeButton
                    text='Tạo'
                    rightIcon={<Icon name='add-circle-outline' color='white' size={20} />}
                    textStyle={{ fontSize: 15, fontWeight: '500' }}
                    buttonStyle={{
                        width: 62,
                        height: 30,
                    }}
                    onPress={showModal} />
            </View>
            {isLoading && <View style={{
                position: 'absolute',
                bottom: '40%',
                alignSelf: 'center'
            }}>
                <Spinner color='#ff2f2f' size={60} type='Circle' />
            </View>}
            {(!isLoading && favoriteList.length <= 0) ?
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={[styles.textBold, { fontSize: 18 }]}>Bạn chưa có giỏ hàng</Text>
                    <View style={{ width: 140, paddingTop: 8 }}>
                        <OrangeButton
                            text='Tạo ngay'
                            onPress={navigateToListProduct}
                            rightIcon={<Icon type={Icons.Ionicons} name='chevron-forward' color='white' />}
                            buttonStyle={{ height: 40 }}
                        />
                    </View>
                </View>
                : <FlatList
                    contentContainerStyle={{
                        rowGap: 22,
                        paddingVertical: 15,
                    }}
                    keyExtractor={(item) => item._id}
                    data={favoriteList}
                    renderItem={({ item, index }) => (
                        <FavoriteOrderItem
                            item={item}
                            onDelete={() => {
                                deleteFavoriteOrder(_id, item._id, token as string)
                                    .then(() => {
                                        getFavoriteList()
                                    })
                            }} />
                    )}
                    showsVerticalScrollIndicator={false}
                />}
        </View>
    )
}

export default FavoriteOrderScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.BACKGROUND_DEFAULT,
    },
    textBold: {
        fontSize: 17,
        color: 'black',
        fontWeight: '700'
    },
    centeredModal: {
        backgroundColor: 'white',
        borderRadius: 12,
        width: '85%',
        alignItems: 'center',
        padding: 10,
        zIndex: 1
    }
})