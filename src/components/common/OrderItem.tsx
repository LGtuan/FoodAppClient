import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from './Icon'
import { ProductOrderItem, changeQuantity, removeProduct } from '../../redux'
import { colors } from '../../constants'
import { URL } from '../../utils/service'
import { useDispatch } from 'react-redux'

interface Props {
  item: ProductOrderItem,
  index: number,
  history: boolean
}

const OrderItem: React.FC<Props> = ({ item, index, history = false }) => {

  const product = item.product
  const quantity = item.quantity

  const dispatch = useDispatch()

  const onIncrement = () => {
    dispatch(changeQuantity({ number: 1, index }))
  }

  const onReduce = () => {
    if (quantity <= 1) return
    dispatch(changeQuantity({ number: -1, index }))
  }

  const onDeleteItem = () => {
    dispatch(removeProduct(index))
  }

  return (
    <View style={styles.container}>
      {!history && <TouchableOpacity onPress={onDeleteItem} style={styles.removeBtn}>
        <Icon name='clear' color='white' size={24} />
      </TouchableOpacity>}
      <View style={{ flexDirection: 'row' }}>
        <Image source={{ uri: `${URL}${product.image}` }} style={styles.image} />
        <View style={styles.infoWrapper}>
          <View />
          <Text ellipsizeMode='tail'
            numberOfLines={1}
            style={styles.textBold}
          >{product.name}</Text>
          <View style={styles.infoInsideWrapper}>
            {history ?
              <View>
                <Text style={{ fontWeight: '600' }}>Số lượng: {item.quantity}</Text>
              </View> :
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
                <TouchableOpacity onPress={onIncrement}>
                  <Icon name='add-circle-outline' size={24} />
                </TouchableOpacity>
                <Text style={[styles.textBold, { fontSize: 16, paddingHorizontal: 6 }]}>
                  {
                    quantity >= 10 ? quantity : '0' + quantity
                  }
                </Text>
                <TouchableOpacity onPress={onReduce}>
                  <Icon name='remove-circle-outline' size={24} />
                </TouchableOpacity>
              </View>}
            <View style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
              <Text>{product.price / 1000}k</Text>
              <Text
                style={{
                  fontSize: 16,
                  color: 'black',
                  paddingTop: 3
                }}>
                {(product.price / 1000) * quantity}k</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

export default React.memo(OrderItem)

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    elevation: 3,
    marginHorizontal: 15,
    borderRadius: 20,
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: 'center',
    margin: 2
  },
  textBold: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black'
  },
  infoWrapper: {
    flex: 1,
    justifyContent: 'space-around',
    paddingStart: 6,
    paddingTop: 10
  },
  infoInsideWrapper: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingEnd: 10,
    paddingBottom: 8
  },
  removeBtn: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: colors.DEFAULT_ORANGE,
    borderTopEndRadius: 20,
    padding: 2,
    borderRadius: 4,
    zIndex: 10
  }
})