import { useEffect, useState } from 'react';
import { Button, TextInput, StatusBar, Pressable, StyleSheet, Text, View } from 'react-native';

type ProfileIconProps = {
    duText? : string,
    unNombre?: number
}

const Task = (props : ProfileIconProps) => {
    return (
        <View style={{backgroundColor:'#00FF00'}}>
            <Text>duText : {props.duText}</Text>
            <Text>duText : {props.unNombre}</Text>
        </View>
    );
}

export default Task