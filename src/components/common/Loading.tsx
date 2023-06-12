import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Spinner from 'react-native-spinkit'
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '@utils'

const Loading = () => {
    return (
        <View style={{
            width: WINDOW_WIDTH,
            height: WINDOW_HEIGHT,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#00000044',
            position: 'absolute',
            zIndex: 10
        }}>
            <View style={{
                width: 300,
                height: 250,
                alignItems: 'center',
                alignSelf: 'center',
                justifyContent: 'center',
                borderRadius: 20,
                backgroundColor: 'white'
            }}>
                <Spinner type='Circle' style={{ width: 70, height: 70 }} color='#ff2f2f' />
            </View>
        </View>
    )
}


export default Loading

const styles = StyleSheet.create({})