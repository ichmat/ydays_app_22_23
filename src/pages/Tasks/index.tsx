import React, { useEffect, useState } from 'react';
import { Button, StatusBar, StyleSheet, Text, View, Modal } from 'react-native';
import { Double } from 'react-native/Libraries/Types/CodegenTypes';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { DataTask, ProgressTask, SimpleTask, TypeTask} from '../../../types/types';
import { useTasks } from '../../hooks';
import { Task ,TaskProgress} from '../../components';
import { Pressable, TextInput } from '@react-native-material/core';
import { ThemeColor } from '../../../theme';
import { ActivityIndicator } from "@react-native-material/core";
import { SelectList } from 'react-native-dropdown-select-list'

const Tasks = (TaskProps : any) => {

  // navigation personnalisé pour mettre à jour la nav bar
  const navTabUpdate = TaskProps.route.params.navTabUpdate;
  const navigate = (to: string) => {
    navTabUpdate(to)
    TaskProps.navigation.navigate(to)
  }

  // stockages des tasks
  const {tasksLoaded, tasks, removeTask, updateTask, createSimpleTask, createProgressTask} = useTasks();
  // visibilité de la modal de création de tâche
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  // visibilité de la modal de modification/suppression de tâche
  const [taskModalVisible, setTaskModalVisible] = useState<boolean>(false);
  // référence la tâche séléctionné (pour la modal de modification/suppression)
  const [selectedTask, setSelectedTask] = useState<DataTask>();
  // titre pour la tâche créer/modifier
  const [titleInput,setTitleInput] = useState<string>("");
  // description pour la tâche créer/modifier
  const [descInput,setDescInput] = useState<string>("");
  // type de tâche en cours de création
  const [typeTaskToCreate, setTypeTaskToCreate] = useState<TypeTask>(TypeTask.Simple)

  // l'état d'une tâche change (utilisation dans `Task`)
  const changeState = (task: DataTask, isChecked : boolean) => {
    task.isFinished = isChecked
    updateTask(task)
  }

  // ouvre la modal de création de tâche
  const openModal = () => {
    setTitleInput("");
    setDescInput("");
    setModalVisible(true);
  }

  // créer une tâche selon le type et ferme la modal de création
  const createNewTask = () => {
    switch(typeTaskToCreate){
      case TypeTask.Simple:
        // tâche simple 
        createSimpleTask(titleInput,descInput)
        break;
      case TypeTask.Progress:
        // tâche de progression 
        createProgressTask(titleInput,descInput)
        break;
    }
    // ferme la modal
    setModalVisible(!modalVisible);
  }

  // ouvre la modal de modification/suppresion de tâche
  const openTaskDetail = (task: DataTask) => {
    setSelectedTask(task);
    setTitleInput(task.titre);
    setDescInput(task.description);
    setTaskModalVisible(!taskModalVisible);
  }

  // modifie les données d'une tâches
  const modifyTask = () => {
    var task : DataTask = selectedTask!
    task.titre = titleInput;
    task.description = descInput;
    setTitleInput("")
    setDescInput("")
    updateTask(task)
    setTaskModalVisible(!taskModalVisible);
  }

  const deleteTask = () => {
    removeTask(selectedTask!);
    setSelectedTask(undefined);
    setTaskModalVisible(!taskModalVisible);
  }

  if(!tasksLoaded){
    return (
      <View style={{flex:6, justifyContent:'center', alignItems:'center', backgroundColor: ThemeColor.PRIMARY_THIN}}>
        <ActivityIndicator size={50} color={ThemeColor.PRIMARY} />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.containterTask}>
        {tasks.map((task: DataTask, index: number) => {
          if(task.typeTask == TypeTask.Simple){
            return <Task key={index} theTask={task as SimpleTask} openTask={openTaskDetail} changeStateTask={changeState} />
          }else if(task.typeTask == TypeTask.Progress){
            return <TaskProgress key={index} theTask={task as ProgressTask} openTask={openTaskDetail} changeStateTask={changeState}/>
          }
        })}
      </View>
      <Pressable pressEffect='ripple' pressEffectColor='#00000000' onPress={() => (openModal())} style={styles.floatingInput}>
          <FontAwesome color={ThemeColor.PRIMARY_TEXT} size={25} name='plus'/>
      </Pressable>
      <Modal animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
        <View style={styles.containerModal}>
          <Text style={{fontSize:20, margin: 10, color:ThemeColor.PRIMARY_TEXT}}>Créer tâche</Text>
          <TextInput variant='standard' color={ThemeColor.PRIMARY_TEXT} inputStyle={{color:ThemeColor.PRIMARY_TEXT}} placeholder='titre' value={titleInput} onChangeText={setTitleInput} />
          <TextInput variant='standard' color={ThemeColor.PRIMARY_TEXT} inputStyle={{color:ThemeColor.PRIMARY_TEXT}} placeholder='description' value={descInput} onChangeText={setDescInput} />
          <View style={{flexDirection:'row',  alignItems: 'center', justifyContent: 'center', marginTop:5}}>
            <Pressable style={styles.button} pressEffect='ripple' onPress={() => {createNewTask()}}>
              <Text style={styles.buttonTxt}>Créer</Text>
            </Pressable>
            <Pressable style={styles.button} pressEffect='ripple' onPress={() => {setModalVisible(!modalVisible)}}>
              <Text style={styles.buttonTxt}>Annuler</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal animationType='slide'
      transparent={true}
      visible={taskModalVisible}
      onRequestClose={() => {
        setTaskModalVisible(!taskModalVisible);
      }}
      >
        <View style={styles.containerModal}>
          <Text style={{fontSize:20, margin: 10, color:ThemeColor.PRIMARY_TEXT}}>Modifier tâche</Text>
          <TextInput variant='standard' color={ThemeColor.PRIMARY_TEXT} inputStyle={{color:ThemeColor.PRIMARY_TEXT}} placeholder='titre' value={titleInput} onChangeText={setTitleInput}/>
          <TextInput variant='standard' color={ThemeColor.PRIMARY_TEXT} inputStyle={{color:ThemeColor.PRIMARY_TEXT}} placeholder='description' value={descInput} onChangeText={setDescInput} />
          <View style={{flexDirection:'row',  alignItems: 'center', justifyContent: 'center', marginTop:5}}>
            <Pressable style={styles.button} pressEffect='ripple' onPress={() => {modifyTask()}}>
              <Text style={styles.buttonTxt}>Modifier</Text>
            </Pressable>
            <Pressable style={styles.button} pressEffect='ripple' onPress={() => {setTaskModalVisible(!taskModalVisible)}}>
              <Text style={styles.buttonTxt}>Annuler</Text>
            </Pressable>
          </View>
          <Pressable style={styles.buttonDelete} pressEffect='ripple' onPress={() => {deleteTask()}}>
            <Text style={styles.buttonTxt}>Supprimer</Text>
          </Pressable>
        </View>
      </Modal>
    </View>)
}

const styles = StyleSheet.create({
    container: {
      flex: 6,
      backgroundColor: ThemeColor.PRIMARY_THIN,
      alignItems: 'stretch',
      justifyContent: 'center',
    },
    containterTask:  {
      alignItems: 'stretch',
      justifyContent: 'center',
      flex: 3,
      marginLeft: 10,
      marginRight: 10
    },
    containerModal:{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: ThemeColor.PRIMARY_SHADE,
      opacity:0.75
    },
    modalTextInput:{
      color: ThemeColor.PRIMARY_TEXT,
      padding: 5
    },
    button: {
      minWidth: 120,
      minHeight: 30,
      padding: 5,
      backgroundColor: ThemeColor.BLACK,
      borderRadius: 5,
      margin: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonDelete: {
      minWidth: 120,
      minHeight: 30,
      padding: 5,
      backgroundColor: ThemeColor.DANGER,
      borderRadius: 5,
      margin: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonTxt:{
      color:'#FFFFFF'
    },
    floatingInput: {
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      borderRadius: 50,
      backgroundColor: '#A0A0A0',
      width: 50,
      height: 50,

      bottom: 30,
      right: 30,

      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.30,
      shadowRadius: 4.65,

      elevation: 8,
    }
  });
  

export default Tasks