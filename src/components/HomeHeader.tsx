import {
    Animated,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native'
import React, { useState } from 'react'
import Icon, { Icons } from './common/Icon'
import GrayInput from './common/GrayInput'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { AppDispatch, setTxTSearch } from '@redux'
import { colors } from '@constants'

const HomeHeader = () => {
    const [search, setSearch] = useState("");
    const navigation = useNavigation<any>();
    const ditpatch = useDispatch<AppDispatch>();

    const handlerSubmitEdit = () => {
        ditpatch(setTxTSearch(search));
        navigation.navigate("SearchScreen")
    }

    return (
        <Animated.View style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View>
                    <Text style={styles.title}>Good for you.</Text>
                    <Text style={styles.title}>Greate for life.</Text>
                </View>
                <TouchableOpacity style={styles.bellContainer}>
                    <Icon type={Icons.Fontisto} name='bell-alt' color='black' size={22} />
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity style={styles.inputWrap} activeOpacity={0.7}>
                    <GrayInput extraProps={{
                        placeholder: "Bạn muốn ăn gì?",
                        onSubmitEditing: handlerSubmitEdit,
                        onChangeText: setSearch
                    }} />
                    <TouchableOpacity onPress={handlerSubmitEdit} style={{ position: 'absolute', end: 10 }}>
                        <Icon type={Icons.Ionicons} name='ios-search-outline' size={30} color='black' />
                    </TouchableOpacity>
                </TouchableOpacity>
            </View>
        </Animated.View>
    )
}

export default React.memo(HomeHeader)

const styles = StyleSheet.create({
    container: {
        height: 184,
        justifyContent: 'space-between',
        paddingBottom: 5,
        paddingHorizontal: 15,
        paddingTop: 24
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: 'black'
    },
    inputWrap: {
        borderRadius: 20,
        flexDirection: 'row',
        width: '100%',
        height: 48,
        alignItems: 'center',
        alignSelf: 'center',
    },
    bellContainer: {
        width: 40,
        height: 40,
        backgroundColor: colors.DEFAULT_ORANGE,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    }
})