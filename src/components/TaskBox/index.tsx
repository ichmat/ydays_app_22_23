import React from "react";
import { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet } from "react-native";
import { DataTask } from "../../../types/types";
import BouncyCheckbox from "react-native-bouncy-checkbox";

type TaskBoxProps = {
  dataTask: DataTask,
  openTask: (task: DataTask) => void,
  taskChangeState: (task: DataTask, newState: boolean) => void
}

const TaskBox = (props : TaskBoxProps) => {
  const {dataTask, openTask, taskChangeState} = props;

  const tacheToucher = () => {
    openTask(dataTask)
  }

  const changeState = (checked: boolean) => {
    taskChangeState(dataTask, checked)
  }

    return (
      <Pressable onPress={tacheToucher}>
          <View style={styles.taskView}>
              <Text style={{color: '#FFF'}}>{dataTask.titre}</Text>
              <BouncyCheckbox style={{marginLeft: 10, marginBottom:0, justifyContent:'center'}} unfillColor="#00000000"
                  fillColor="#A0A0A0"
                  isChecked={dataTask.etat}
                  onPress={changeState} />
                  
          </View>
      </Pressable>
    );
};

const styles  = StyleSheet.create({
  taskView : {
    backgroundColor: '#3A3A3A', 
    minWidth: 500,

    flexDirection:'row', 
    justifyContent: 'flex-start',
    alignItems: 'center',

    padding: 5,
    borderRadius: 10
  }
})

export default TaskBox