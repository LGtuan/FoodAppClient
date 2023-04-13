import {
    Animated,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native'
import React from 'react'
import Icon, { Icons } from './common/Icon'

const HomeHeader = () => {

    return (
        <Animated.View style={styles.container}>
            <View>
                <View>
                    <Text style={styles.title}>Good for you.</Text>
                    <Text style={styles.title}>Greate for life.</Text>
                </View>
            </View>
            <View>
                <TouchableOpacity style={styles.inputWrap} activeOpacity={0.7}>
                    <Text style={{
                        flex: 1,
                        fontWeight: '500',
                        fontSize: 16
                    }}>Bạn muốn ăn gì?</Text>
                    <TouchableOpacity>
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
        height: 160,
        justifyContent: 'space-between',
        paddingBottom: 5,
        paddingHorizontal: 15,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: 'black'
    },
    inputWrap: {
        backgroundColor: '#ecf1f7',
        borderRadius: 20,
        flexDirection: 'row',
        width: '100%',
        height: 48,
        alignItems: 'center',
        paddingHorizontal: 10,
        alignSelf: 'center',
        elevation: 3
    }
})