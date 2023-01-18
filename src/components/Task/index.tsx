import { useEffect, useState } from 'react';
import { Button, TextInput, StatusBar, Pressable, StyleSheet, Text, View } from 'react-native';
import { DataTask } from '../../../types/types';
import BouncyCheckbox from "react-native-bouncy-checkbox";

type TaskProps = {
    dataTask : DataTask
}

const Task = (props : TaskProps) => {
    const {dataTask} = props;

    return (
        <View style={{backgroundColor:'#00FF00'}}>
            <Text>duText : {dataTask.titre}</Text>
            <BouncyCheckbox unfillColor="#00000000"
                fillColor="#A0A0A0"
                isChecked={dataTask.etat} />
        </View>
    );
}

export default Task