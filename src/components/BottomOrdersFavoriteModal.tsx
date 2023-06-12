import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Pressable,
    Modal,
    FlatList,
    Animated
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { WINDOW_HEIGHT } from '@utils'
import OrangeButton from './common/OrangeButton'
import { FavoriteOrderModel, RootState, setFastNotifi } from '@redux'
import { useDispatch, useSelector } from 'react-redux'
import { addProductToFavoriteOrder, getFavoriteOrder } from '@services'
import { colors } from '@constants'

interface Props {
    visible: boolean,
    setVisible: (value: boolean) => void,
    productId: string
}

const BottomOrdersFavoriteModal: React.FC<Props> = ({ visible, setVisible, productId }) => {

    const [data, setData] = useState<FavoriteOrderModel[]>([])
    const [arrayId, setArrayId] = useState<string[]>([])
    const { _id, token } = useSelector((state: RootState) => state.userSlice.user)

    const [arrayAnimated, setArrayAnimated] = useState<Animated.Value[]>([])
    const dispatch = useDispatch()

    useEffect(() => {
        getFavoriteOrder(_id, token as string)
            .then(data => {
                setData(data)
                let array: Animated.Value[] = []
                for (let i = 0; i < data.length; i++) {
                    array.push(new Animated.Value(0))
                }
                setArrayAnimated(array)
            })
    }, [])

    const bgAnimated = (index: number, to: number) => {
        Animated.timing(arrayAnimated[index], {
            toValue: to,
            duration: 200,
            useNativeDriver: true
        }).start()
    }

    const onAddProductToFavoriteList = () => {
        console.log(productId)
        console.log(arrayId)

        addProductToFavoriteOrder(_id, productId, arrayId, token as string)
            .then(res => {
                if (res.status == 200) {
                    console.log('res 200')
                    dispatch(setFastNotifi(
                        {
                            show: true,
                            btnText: 'Xem',
                            content: 'Món ăn đã được thêm vào giỏ hàng yêu thích',
                            route: 'FavoriteOrder'
                        }))
                    onAddSuccess()
                } else {
                    console.log('ress' + res.status)
                }
            })
    }

    const onAddSuccess = () => {
        setArrayId([])
        setVisible(false)
        for (let i = 0; i < arrayAnimated.length; i++) {
            arrayAnimated[i].setValue(0)
        }
    }

    const onchangeArrayId = (id: string, index: number) => {
        if (arrayId.includes(id)) {
            setArrayId(pre => pre.filter(i => i != id))
            bgAnimated(index, 0)
        } else {
            setArrayId(pre => [...pre, id])
            bgAnimated(index, 1)
        }
    }

    return (
        <Modal
            visible={visible}
            animationType='fade'
            statusBarTranslucent
            onRequestClose={() => {
                setVisible(false)
            }}
            transparent
        >
            <Pressable
                onPress={() => {
                    setVisible(false)
                }}
                style={{ flex: 1, backgroundColor: '#0000004e' }}>
                <View
                    style={styles.centeredView}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: 15
                    }}>
                        <Text style={styles.textBold}>Danh sách giỏ hàng yêu thích</Text>
                        <OrangeButton
                            extraProps={{
                                disabled: arrayId.length > 0 ? false : true
                            }}
                            text='Lưu'
                            onPress={onAddProductToFavoriteList}
                            buttonStyle={{
                                width: 60,
                                height: 32,
                                backgroundColor: arrayId.length > 0 ? colors.DEFAULT_ORANGE : 'gray'
                            }}
                            textStyle={{
                                fontSize: 15
                            }}
                        />
                    </View>
                    <View
                        style={{
                            backgroundColor: '#00000043',
                            height: 1,
                            width: '100%',
                            alignSelf: 'center'
                        }} />
                    <FlatList
                        data={data}
                        ListHeaderComponent={<View style={{ paddingVertical: 8, paddingHorizontal: 15 }}>
                            <Text>Vui lòng chọn các giỏ hàng muốn thêm sản phẩm này</Text>
                        </View>}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    onPress={() => {
                                        onchangeArrayId(item._id, index)
                                    }}
                                    style={{
                                        paddingVertical: 7,
                                        paddingHorizontal: 15
                                    }}
                                    key={index}>
                                    <Animated.View style={{
                                        position: 'absolute',
                                        backgroundColor: '#beffbbff',
                                        width: '120%',
                                        height: '113%',
                                        alignSelf: 'center',
                                        borderRadius: 20,
                                        transform: [{
                                            scaleX: arrayAnimated[index] ?
                                                arrayAnimated[index].interpolate({
                                                    inputRange: [0, 0.2, 1],
                                                    outputRange: [0, 0.8, 1]
                                                }) : 0
                                        }]
                                    }} />
                                    <View>
                                        <Text style={{
                                            fontSize: 16,
                                            fontWeight: '700',
                                            color: 'black'
                                        }}>{item.name}</Text>
                                        <Text>Số lượng sản phẩm : {item.products.length}</Text>

                                    </View>
                                    <View
                                        style={{
                                            backgroundColor: '#00000043',
                                            height: 1,
                                            width: '100%',
                                            marginTop: 10,
                                            alignSelf: 'center'
                                        }} />
                                </TouchableOpacity>
                            )
                        }}
                    />
                </View>
            </Pressable>
        </Modal>
    )
}

export default React.memo(BottomOrdersFavoriteModal)

const styles = StyleSheet.create({
    textBold: {
        fontWeight: 'bold',
        color: 'black',
        fontSize: 15
    },
    centeredView: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height: WINDOW_HEIGHT * 0.6,
        position: 'absolute',
        bottom: 0,
        width: '100%',
        zIndex: 5
    }
})