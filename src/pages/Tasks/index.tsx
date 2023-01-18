import React, { useEffect, useState } from 'react';
import { Button, StatusBar, StyleSheet, Text, View, Modal } from 'react-native';
import { Double } from 'react-native/Libraries/Types/CodegenTypes';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { DataTask } from '../../../types/types';
import { useTasks } from '../../hooks';
import { Task ,TaskProgress } from '../../components';
import { Pressable, TextInput } from '@react-native-material/core';
import { ThemeColor } from '../../../theme';
import { ActivityIndicator } from "@react-native-material/core";

const Tasks = (TaskProps : any) => {
  const navTabUpdate = TaskProps.route.params.navTabUpdate;

  const navigate = (to: string) => {
    navTabUpdate(to)
    TaskProps.navigation.navigate(to)
  }

  const {tasksLoaded, tasks, removeTask, updateTask, createTask} = useTasks();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [taskModalVisible, setTaskModalVisible] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<DataTask>();
  const [titleInput,setTitleInput] = useState<string>("");
  const [descInput,setDescInput] = useState<string>("");

  const changeState = (task: DataTask, isChecked : boolean) => {
    task.isFinished = isChecked
    updateTask(task)
  }

  const openModal = () => {
    setTitleInput("");
    setDescInput("");
    setModalVisible(true);
  }

  const createNewTask = () => {
    createTask(titleInput,descInput);
    setModalVisible(!modalVisible);
  }

  const openTaskDetail = (task: DataTask) => {
    setSelectedTask(task);
    setTitleInput(task.titre);
    setDescInput(task.description);
    setTaskModalVisible(!taskModalVisible);
  }

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

    // regular view
    /*<View style={styles.container}>
      <View style={styles.containterTask}>
        {tasks.map((task: DataTask, index: number) => (
          <Task key={index} theTask={task} openTask={openTaskDetail} changeStateTask={changeState} />
        ))}
      </View>
      <Pressable pressEffect='ripple' pressEffectColor='#00000000' onPress={() => (openModal())} style={styles.floatingInput}>
          <FontAwesome color={'#505050'} size={25} name='plus'/>
      </Pressable>
      <Modal animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
        <View style={styles.containerModal}>
          <Text style={{fontSize:20, margin: 10, color:'#FFFFFF'}}>Créer tâche</Text>
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
          <Text style={{fontSize:20, margin: 10, color:'#FFFFFF'}}>Modifier tâche</Text>
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
    </View>*/


    // % view
    <View style={styles.container}>
      <View style={styles.containterTask}>
        <TaskProgress openTask={(task) => {}} theTask={{id:"45", titre:"titre", description:"desc", isFinished:false}} changeStateTask={(task, ischecked) => {}} />
        {tasks.map((task: DataTask, index: number) => (
          <Task key={index} theTask={task} openTask={openTaskDetail} changeStateTask={changeState} />
        ))}
      </View>
      <Pressable pressEffect='ripple' pressEffectColor='#00000000' onPress={() => (openModal())} style={styles.floatingInput}>
          <FontAwesome color={'#505050'} size={25} name='plus'/>
      </Pressable>
      <Modal animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
        <View style={styles.containerModal}>
          <Text style={{fontSize:20, margin: 10, color:'#FFFFFF'}}>Créer tâche</Text>
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
          <Text style={{fontSize:20, margin: 10, color:'#FFFFFF'}}>Modifier tâche</Text>
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
    </View>
  );
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
      flex: 3
    },
    containerModal:{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: ThemeColor.PRIMARY,
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
      backgroundColor: ThemeColor.PRIMARY_THIN,
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