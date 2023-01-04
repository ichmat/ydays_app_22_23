import { Pressable } from "@react-native-material/core";
import React from "react";
import { View, StyleSheet, Text } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { DataTask } from "../../../types/types";

type PropsTask = {
    theTask : DataTask,
    changeStateTask: (task: DataTask, isChecked: boolean) => void,
    openTask: (task: DataTask) => void,
}

const Task = (props : PropsTask) => {
    const changeState = (isChecked: boolean) => {
        props.changeStateTask(props.theTask, isChecked);
    }

    return (
    <Pressable onPress={() => {props.openTask(props.theTask)}}>
        <View style={styles.containerTask}>
            <Text>🔵</Text>
            <View style={styles.containerTitle}>
                <Text style={styles.title}>{props.theTask.titre}</Text>
                <Text style={styles.desc}>{props.theTask.description}</Text>
            </View>
            <BouncyCheckbox unfillColor="#00000000"
                fillColor="#A0A0A0"
                isChecked={props.theTask.isFinished} onPress={changeState} />
        </View>
    </Pressable>
    );
}

const styles = StyleSheet.create({
    containerTask: {
        backgroundColor: '#F0F0F0',
        padding:5,
        height:50,
        minWidth:200,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        margin: 2
    },
    containerTitle:{
        justifyContent: 'flex-start',
        flexDirection: 'column',
        marginLeft: 10
    },
    title:{
        fontSize: 12,
        minWidth: 200,
        maxWidth: 300,
    },
    desc:{
        fontSize: 9,
        opacity: 0.7
    }
  });
  

export default Task