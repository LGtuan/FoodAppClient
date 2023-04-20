import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native'
import React from 'react'
import { FavoriteOrderModel } from '../../redux'
import Icon from './Icon'
import { colors } from '../../constants'
import { useNavigation } from '@react-navigation/native'
import { URL } from '../../utils'

interface Props {
    item: FavoriteOrderModel,
    onDelete: () => void
}

const FavoriteOrderItem: React.FC<Props> = ({ item, onDelete }) => {

    const navigation = useNavigation<any>()

    const getNameListProducts = () => {
        let result = ''
        for (let i = 0; i < item.products.length; i++) {
            result += item.products[i].product.name
            if (i == item.products.length - 1) result += '.'
            else result += ', '
        }
        return result
    }
    let nameListProducts = getNameListProducts()

    const navigateToFavoriteOrderDetails = () => {
        navigation.navigate('FavoriteOrderDetails', { item })
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.cardContainer} onPress={navigateToFavoriteOrderDetails}>
                <TouchableOpacity onPress={onDelete} style={styles.removeBtn}>
                    <Icon name='clear' color='white' size={24} />
                </TouchableOpacity>
                <View style={styles.imgContainer}>
                    {item.products.length == 0
                        ? <View style={{ alignSelf: 'center', height: '100%', justifyContent: 'center' }}>
                            <Text style={{ textAlign: 'center' }}>Chưa có ảnh ở order này</Text>
                        </View>
                        : item.products.map((i, index) => {
                            if (index >= 4) return null
                            return <Image key={index} source={{ uri: `${URL}${i.product.image}` }} style={styles.image} />
                        })
                    }
                </View>
                <View style={{ paddingTop: 18, flex: 1 }}>
                    <Text style={styles.textBold}>{item.name}</Text>
                    <Text>Số món : {item.products.length}</Text>
                    <Text
                        numberOfLines={2}
                        ellipsizeMode='tail'
                        style={{ paddingEnd: 10, }}
                    >{nameListProducts ? nameListProducts : 'Chưa có món ăn trong giỏ hàng này'}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default React.memo(FavoriteOrderItem)

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        width: '100%'
    },
    cardContainer: {
        backgroundColor: 'white',
        elevation: 3,
        borderRadius: 16,
        flexDirection: 'row',
        flex: 1
    },
    image: {
        width: 60,
        height: 60,
        resizeMode: 'contain'
    },
    textBold: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black'
    },
    imgContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: 120 + 16,
        height: 120,
        paddingHorizontal: 8,
        justifyContent: 'center',
    },
    removeBtn: {
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: colors.DEFAULT_ORANGE,
        borderTopEndRadius: 16,
        padding: 2,
        borderRadius: 4,
        zIndex: 10
    }
})