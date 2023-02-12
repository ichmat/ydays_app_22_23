import React, { useEffect, useState } from 'react';
import { Button, StatusBar, StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import { Double } from 'react-native/Libraries/Types/CodegenTypes';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { DataTask, ProgressTask, SimpleTask, TypeTask} from '../../../types/types';
import { useTasks } from '../../hooks';
import { FrequencySelector, Task ,TaskProgress} from '../../components';
import { Pressable as PressMaterial, TextInput } from '@react-native-material/core';
import { ThemeColor } from '../../../theme';
import { ActivityIndicator } from "@react-native-material/core";
import { SelectList } from 'react-native-dropdown-select-list'
import { ModalTaskCreation, ModalTaskEdition} from '../../components';

const Tasks = (TaskProps : any) => {

  // navigation personnalisé pour mettre à jour la nav bar
  const navigate = (to: string) => {
    //navTabUpdate(to)
    TaskProps.navigation.navigate(to)
  }

  // stockages des tasks
  const {tasksLoaded, tasks, removeTask, updateTask, createSimpleTask, createProgressTask} = useTasks();
  // visibilité de la modal de création de tâche
  const [modalCreateVisible, setModalCreateVisible] = useState<boolean>(false);
  // visibilité de la modal de modification/suppression de tâche
  const [modalEditVisible, setModalEditVisible] = useState<boolean>(false);
  // référence la tâche séléctionné (pour la modal de modification/suppression)
  const [selectedTask, setSelectedTask] = useState<DataTask>();
  
  // type de tâche en cours de création
  const [typeTaskToCreate, setTypeTaskToCreate] = useState<TypeTask>(TypeTask.Simple)

  // l'état d'une tâche change (utilisation dans `Task`)
  const changeState = (task: DataTask, isChecked : boolean) => {
    task.isFinished = isChecked
    updateTask(task)
  }

  // créer une tâche selon le type et ferme la modal de création
  const createNewTask = (title: string, desc: string, type: TypeTask) => {
    switch(type){
      case TypeTask.Simple:
        // tâche simple 
        createSimpleTask(title,desc)
        break;
      case TypeTask.Progress:
        // tâche de progression 
        createProgressTask(title,desc)
        break;
    }
    // ferme la modal
    setModalCreateVisible(!modalCreateVisible);
  }

  // ouvre la modal de modification/suppresion de tâche
  const openTaskDetail = (task: DataTask) => {
    setSelectedTask(task);
    setModalEditVisible(true);
  }

  // loading task
  if(!tasksLoaded){
    return (
      <View style={{flex:6, justifyContent:'center', alignItems:'center', backgroundColor: ThemeColor.PRIMARY_THIN}}>
        <ActivityIndicator size={50} color={ThemeColor.PRIMARY} />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.head}>Mes taches</Text>
      <ScrollView contentContainerStyle={{overflow:'visible', padding:15}}>
        <View style={styles.containterTask}>
          {tasks.map((task: DataTask, index: number) => {
            if(task.typeTask == TypeTask.Simple){
              return <Task key={index} theTask={task as SimpleTask} openTask={openTaskDetail} changeStateTask={changeState} />
            }else if(task.typeTask == TypeTask.Progress){
              return <TaskProgress key={index} theTask={task as ProgressTask} openTask={openTaskDetail} changeStateTask={changeState}/>
            }
          })}
        </View >
      </ScrollView>
      <Pressable onPress={() => (setModalCreateVisible(true))} style={styles.floatingInput}>
          <AntDesign color={ThemeColor.WHITE} size={25} name='plus'/>
      </Pressable>

      <ModalTaskCreation newTask={createNewTask} modalVisibility={modalCreateVisible} requestHideModal={() => setModalCreateVisible(false)} />

      <ModalTaskEdition requestDeleteTask={removeTask} requestHideModal={() => {setModalEditVisible(false)}} requestTaskEdit={updateTask} modalVisibility={modalEditVisible} editedTask={selectedTask}  />
    </View>)
}

const styles = StyleSheet.create({
    container: {
      flex:6,
      backgroundColor: ThemeColor.BACKGROUND,
      alignItems: 'stretch',
      justifyContent: 'flex-start',
      flexDirection:'column'
    },
    containterTask:  {
      flex:1,
      alignItems: 'stretch',
      justifyContent: 'flex-start',
      alignContent:'flex-start',
      flexDirection:'column',
    },
    
    floatingInput: {
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      borderRadius: 50,
      backgroundColor: ThemeColor.BLACK,
      width: 50,
      height: 50,

      bottom: 5,
      right: 30,

      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.30,
      shadowRadius: 4.65,

      elevation: 8,
    },
    head: {
      padding: 20,
      fontSize: 40,
      fontWeight: 'bold',
      fontFamily: 'AusterRoundedBlack',
    }
  });
  

export default Tasks