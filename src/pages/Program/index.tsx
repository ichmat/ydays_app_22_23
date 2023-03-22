import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { ThemeColor } from '../../../theme';

const Program = () => {

    return (<View style={styles.mainContainer}>

    </View>)
}

export default Program

const styles = StyleSheet.create({
    mainContainer:{
        flex:6,
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor: ThemeColor.BACKGROUND
    }
})