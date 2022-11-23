import { useEffect, useState } from 'react';
import { Button, TextInput, StatusBar, Pressable, StyleSheet, Text, View } from 'react-native';

type TaskProps = {
    duText? : string,
    unNombre?: number
}

const Task = (props : TaskProps) => {
    return (
        <View style={{backgroundColor:'#00FF00'}}>
            <Text>duText : {props.duText}</Text>
            <Text>unNombre : {props.unNombre}</Text>
        </View>
    );
}

export default Task