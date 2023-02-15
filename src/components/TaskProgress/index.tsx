import { Pressable as PressMaterial } from "@react-native-material/core";
import React, { useEffect } from "react";
import { View, StyleSheet, Text, AppRegistry, ColorValue, FlexStyle, Pressable, ViewStyle } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Radius, ThemeColor } from "../../../theme";
import { ProgressTask } from "../../../types/types";
import Feather from 'react-native-vector-icons/Feather';
import { useState } from "react";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import AntDesign from "react-native-vector-icons/AntDesign";

type PropsTaskProgress = {
    theTask : ProgressTask,
    changeStateTask: (task: ProgressTask, isChecked: boolean) => void,
    openTask: (task: ProgressTask) => void,
    deleteTask: (task : ProgressTask) => void,
}

const MAX_TITLE_CHAR : number = 27
const MAX_DESC_CHAR : number = 45

const TaskProgress = (props : PropsTaskProgress) => {
    const [displayChecked, setDisplayChecked] = useState<ViewStyle>({display:'none'})
    
    useEffect(() => {
        if (props.theTask.isFinished == true) {
            setDisplayChecked({display:'flex'})
        } else {
            setDisplayChecked({display:'none'})
        }
    },[props.theTask.isFinished])

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
                        <View style={[styles.bar,{width: props.theTask.progress+'%',}]} />
                    </View>
                </View>
                <Pressable style={[styles.containerChecked, displayChecked]} onPress={() => {props.openTask(props.theTask)}}>
                    <AntDesign name="check" size={30} color={ThemeColor.BLACK} />
                </Pressable>
                <Pressable style={styles.binIcon} onPress={() => {props.deleteTask(props.theTask)}}>
                    <Feather color={ThemeColor.PRIMARY} size={25} name='trash-2'/>
                </Pressable>
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
            borderRadius: 15

        },
        editText:{
            fontFamily: 'Paralucent',
            fontSize: 14,
            color: ThemeColor.SECONDARY_TEXT,
            marginBottom: 5

        },
        containerChecked:{
            borderRadius: Radius.TASK,
            position:'absolute',
            top:0,
            left:0,
            width:'100%',
            height:'100%',
            backgroundColor: '#e4e5fa50',
            alignItems:'center',
            justifyContent:'center'
          },
          binIcon:{
            position: 'absolute',
            top: 8,
            right: 13,
            
        }
      });
      

export default TaskProgress