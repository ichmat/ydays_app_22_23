import { Pressable as PressMaterial } from "@react-native-material/core";
import React from "react";
import { View, StyleSheet, Text, AppRegistry, ColorValue, FlexStyle, Pressable } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { ThemeColor } from "../../../theme";
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
    const [elementVisibility, setElementVisibility] = useState<FlexStyle>({display:'flex'})
    const [sliderVisibility, setSliderVisibility] = useState<FlexStyle>({display:'none'})
    
    const [progress, setProgress] = useState<number>(50)

    const openSlider = () => {
        setElementVisibility({display:'none'})
        setSliderVisibility({display:'flex'})
    }

    const closeSlider = () => {
        setElementVisibility({display:'flex'})
        setSliderVisibility({display:'none'})
    }

    const changeValueProgress = (value : number) => {
        setProgress(value)
        closeSlider()
        if(value == 100){
            props.changeStateTask(props.theTask, true)
        }
    }

    return (
        <Pressable onPress={openSlider} onLongPress={() => {props.openTask(props.theTask)}}>
            <View style={styles.containerTask}>
                <View style={{
                    position: 'absolute',
                    top:0,
                    left:0,
                    alignSelf:'stretch',
                    width: progress + '%',
                    height: '100%',
                    borderRadius: 10,
                    backgroundColor:ThemeColor.PRIMARY_SHADE,
                }} />
                <View style={[styles.containerTitle,elementVisibility]}>
                    <Text style={styles.title}>{props.theTask.titre.length > MAX_TITLE_CHAR ? props.theTask.titre.substring(0,MAX_TITLE_CHAR-3) + '...' : props.theTask.titre}</Text>
                    <Text style={styles.desc}>{props.theTask.description.length > MAX_DESC_CHAR ?  props.theTask.description.substring(0,MAX_DESC_CHAR-3) + '...' : props.theTask.description}</Text>
                </View>
                <View style={[{
                    position: 'absolute',
                    top:0,
                    left:0,
                    height: '100%',
                    width: '100%',
                    padding: 5,
                    alignItems:'center',
                    justifyContent:'center',
                    flexDirection:'column',
                    display:'flex'
                },sliderVisibility]}>
                    <MultiSlider
                            
                            values={[progress]}
                            min={0}
                            max={100}
                            onValuesChangeFinish={(values) => {changeValueProgress(values[0])}}
                            onValuesChange={(values) => {setProgress(values[0])}}
                        />
                </View>
                <Pressable onPress={openSlider} style={[{flex:1},elementVisibility]}>
                    <Text style={styles.progressText}>{progress}%</Text>
                </Pressable>
            </View>
        </Pressable>
        )
}

const styles = StyleSheet.create({
    // style 
    containerTask: {
        backgroundColor: ThemeColor.PRIMARY,
        padding:5,
        height:60,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderWidth: 0,
        marginBottom:2,
        borderRadius: 10
    },
    containerTitle:{
        justifyContent: 'center',
        flexDirection: 'column',
        marginLeft: 30,
        flex:5
    },
    title:{
        fontSize: 20,
        minWidth: 200,
        maxWidth: 300,
        //fontFamily:"Berlin Sans FB Regular",
        color: ThemeColor.PRIMARY_TEXT
    },
    desc:{
        fontSize: 12,
        opacity: 0.69,
        //fontFamily:"Berlin Sans FB Regular",
        color: ThemeColor.PRIMARY_TEXT
    },
    progressText:{
        alignSelf:'center',
        fontSize: 20,
        //fontFamily:"Berlin Sans FB Regular",
        color: ThemeColor.PRIMARY_TEXT,
        padding:5
    },
  });

export default TaskProgress