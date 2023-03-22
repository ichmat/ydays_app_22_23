import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Text, Pressable, Animated, SafeAreaView } from "react-native";
import { Radius, ThemeColor } from "../../../theme";
import { SimpleTask, DataTask } from "../../../types/types";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable as PressMaterial } from '@react-native-material/core';

type PropsTask = {
    theTask : SimpleTask,
    changeStateTask: (task: DataTask, isChecked: boolean) => void,
    openTask: (task: DataTask) => void,
    deleteTask: (task : DataTask) => void,
}

const MAX_TITLE_CHAR : number = 27
const MAX_DESC_CHAR : number = 45

const Task = (props : PropsTask) => {

    const [activeAnimation, setActiveAnimation] = useState<boolean>(false)
    const [displayChecked, setDisplayChecked] = useState<boolean>(props.theTask.isFinished)
    const [widthBar,setWidthBar] = useState<string>("0%")
    
    const fillPress = useRef(new Animated.Value(0)).current

    useEffect(()=> {
        fillPress.addListener((state) => {
            setWidthBar(state.value+'%')
        })
    },[])

    useEffect(() => {
        fillPress.stopAnimation()
        if(activeAnimation){
            Animated.timing(fillPress, {
                toValue: 100,
                duration: 500,
                useNativeDriver: true,
              }).start();
        }else{
            Animated.timing(fillPress, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
              }).start();
        }
      }, [activeAnimation]);

    const changeState = () => {
        setDisplayChecked(!props.theTask.isFinished)
        props.changeStateTask(props.theTask, !props.theTask.isFinished)
    }

    return (
    <Pressable style={{backgroundColor: "#00000000"}} onPressIn={() => {setActiveAnimation(true)}} onPressOut={() => {setActiveAnimation(false)}} onLongPress={changeState}>
        <SafeAreaView style={styles.containerTask}>
            <Animated.View style={{ width: widthBar, position:"absolute", left:0, height:'100%', top:0, borderRadius: Radius.TASK}}>
                <LinearGradient
                        start={{x: 0, y:0.5}}
                        end={{x: 1, y:0.5}}
                        colors={['#00000000', ThemeColor.SECONDARY]}
                        style={{ flex:1, borderRadius: Radius.TASK}}
                    />
            </Animated.View>
            <View style={styles.containerTitle}>
                <Text style={styles.title}>{props.theTask.titre.length > MAX_TITLE_CHAR ? props.theTask.titre.substring(0,MAX_TITLE_CHAR-3) + '...' : props.theTask.titre}</Text>
                <Text style={styles.desc}>{props.theTask.description.length > MAX_DESC_CHAR ?  props.theTask.description.substring(0,MAX_DESC_CHAR-3) + '...' : props.theTask.description}</Text>
                <PressMaterial style={{alignSelf:'flex-start'}} onPress={() => {props.openTask(props.theTask)}}>
                    <Text style={styles.editText}>Modifier la tâche</Text>
                </PressMaterial>
            </View>
            <View style={[styles.containerChecked, {display: displayChecked ? 'flex' : 'none'}]}>
                <AntDesign name="check" size={30} color={ThemeColor.BLACK} />
            </View>
            <Pressable style={styles.binIcon} onPress={() => {props.deleteTask(props.theTask)}}>
                <Feather color={ThemeColor.PRIMARY} size={25} name='trash-2'/>
            </Pressable>
        </SafeAreaView>
    </Pressable>
    );
}

const styles = StyleSheet.create({
    // style 
    containerTask: {
        height: 75,
        backgroundColor:ThemeColor.WHITE,
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        marginBottom:15,
        borderRadius: Radius.TASK,
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.15,
        shadowRadius: 6.68,

        elevation: 11, 
    },
    containerTitle:{
        padding:10,
        paddingLeft:13,
        //justifyContent: 'center',
        flexDirection: 'column',
        flex:5,
    },
    title:{
        fontSize: 18,
        fontWeight: 'bold',
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
    editText:{
        fontFamily: 'Paralucent',
        fontSize: 14,
        color: ThemeColor.SECONDARY_TEXT,
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
  

export default Task