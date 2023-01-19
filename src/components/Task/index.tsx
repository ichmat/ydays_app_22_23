import { Pressable } from "@react-native-material/core";
import React from "react";
import { View, StyleSheet, Text, ColorValue } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { ThemeColor } from "../../../theme";
import { SimpleTask, DataTask } from "../../../types/types";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useState } from "react";

type PropsTask = {
    theTask : SimpleTask,
    changeStateTask: (task: DataTask, isChecked: boolean) => void,
    openTask: (task: DataTask) => void,
}

const MAX_TITLE_CHAR : number = 27
const MAX_DESC_CHAR : number = 45

const Task = (props : PropsTask) => {
    // couleur du `BouncyCheckbox`
    const [colorChecked, setColorChecked] = useState<ColorValue>(props.theTask.isFinished ? ThemeColor.PRIMARY : "#00000000")
    // couleur de l'arrière plan de la tâche
    const [colorBG,setColorBG] = useState<ColorValue>(props.theTask.isFinished ? ThemeColor.PRIMARY_SHADE : ThemeColor.PRIMARY) 

    // quand la tâche change d'état
    const changeState = (isChecked: boolean) => {
        // appel la fonction définit dans les props pour changer l'état de la tâche
        props.changeStateTask(props.theTask, isChecked);
        // change la couleur du `BouncyCheckbox`
        setColorChecked(isChecked ? ThemeColor.PRIMARY_SHADE : "#00000000")
        setColorBG(isChecked ? ThemeColor.PRIMARY_SHADE : ThemeColor.PRIMARY) 
    }
    return (
    <Pressable pressEffect="none" pressEffectColor="#00000000" onPress={() => {props.openTask(props.theTask)}}>
        <View style={[styles.containerTask,{backgroundColor : colorBG}]}>
            <View style={styles.containerTitle}>
                <Text style={styles.title}>{props.theTask.titre.length > MAX_TITLE_CHAR ? props.theTask.titre.substring(0,MAX_TITLE_CHAR-3) + '...' : props.theTask.titre}</Text>
                <Text style={styles.desc}>{props.theTask.description.length > MAX_DESC_CHAR ?  props.theTask.description.substring(0,MAX_DESC_CHAR-3) + '...' : props.theTask.description}</Text>
            </View>
            <View style={{flex:1}}>
                <BouncyCheckbox
                    size={30}
                    innerIconStyle={{borderWidth:2}}
                    unfillColor="#00000000"
                    iconComponent={<FontAwesome size={18} name="check" color={colorChecked} />}
                    fillColor={ThemeColor.PRIMARY}
                    isChecked={props.theTask.isFinished} onPress={changeState} />
            </View>
        </View>
    </Pressable>
    );
}

const styles = StyleSheet.create({
    // style 
    containerTask: {
        backgroundColor:ThemeColor.PRIMARY,
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
    }
  });
  

export default Task