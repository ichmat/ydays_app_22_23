import { Pressable as PressMaterial } from "@react-native-material/core";
import React from "react";
import { View, StyleSheet, Text, AppRegistry, ColorValue, FlexStyle, Pressable } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Radius, ThemeColor } from "../../../theme";
import { ProgressTask } from "../../../types/types";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useState } from "react";
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";

type PropsTaskProgress = {
    theTask : ProgressTask,
    changeStateTask: (task: ProgressTask, isChecked: boolean) => void,
    openTask: (task: ProgressTask) => void,
}

const MAX_TITLE_CHAR : number = 27
const MAX_DESC_CHAR : number = 45

const TaskProgress = (props : PropsTaskProgress) => {

    return (
        <Pressable onLongPress={() => {props.changeStateTask(props.theTask, props.theTask.isFinished)}}>
            <View style={[styles.containerTask]}>
                <View style={styles.containerTitle}>
                    <Text style={styles.title}>{props.theTask.titre.length > MAX_TITLE_CHAR ? props.theTask.titre.substring(0,MAX_TITLE_CHAR-3) + '...' : props.theTask.titre}</Text>
                    <Text style={styles.desc}>{props.theTask.description.length > MAX_DESC_CHAR ?  props.theTask.description.substring(0,MAX_DESC_CHAR-3) + '...' : props.theTask.description}</Text>
                    <Pressable onPress={() => {props.openTask(props.theTask)}}>
                        <Text style={styles.editText}>Modifier la tâche</Text>
                    </Pressable>
                    <View style={styles.containerBar}>
                        <View style={styles.bar} />
                    </View>
                </View>
            </View>
        </Pressable>
        );
    }
    
    const styles = StyleSheet.create({
        // style 
        containerTask: {
            backgroundColor:ThemeColor.WHITE,
            padding:10,
            paddingLeft:13,
            alignItems: 'stretch',
            justifyContent: 'flex-start',
            flexDirection: 'column',
            borderWidth: 0,
            marginBottom:10,
            borderRadius: Radius.TASK,
    
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 5,
            },
            shadowOpacity: 0.15,
            shadowRadius: 6.68,

            elevation: 11,
        },
        containerTitle:{
            //justifyContent: 'center',
            flexDirection: 'column',
            flex:5,
        },
        title:{
            fontSize: 18,
            fontWeight:"bold",
            minWidth: 200,
            maxWidth: 300,
            fontFamily: 'Paralucent',
            color: ThemeColor.PRIMARY_TEXT
        },
        desc:{
            fontSize: 14,
            opacity: 0.69,
            fontFamily: 'Paralucent',
            color: ThemeColor.PRIMARY_TEXT,
            marginBottom: 5
        },
        containerBar:{
            height:12,
            alignSelf:'stretch',
            backgroundColor:ThemeColor.SECONDARY,
            borderRadius: 15
        },
        bar:{
            flex:1,
            backgroundColor: ThemeColor.PRIMARY,
            width: '50%',
            borderRadius: 15

        },
        editText:{
            fontFamily: 'Paralucent',
            fontSize: 14,
            color: ThemeColor.SECONDARY_TEXT,
            marginBottom: 5

        }
      });
      

export default TaskProgress