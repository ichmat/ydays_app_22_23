import React, { useEffect, useState } from 'react';
import { Button, TextInput, StatusBar, StyleSheet, Text, View, Modal } from 'react-native';
import { Double } from 'react-native/Libraries/Types/CodegenTypes';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { DataTask } from '../../../types/types';
import { useTasks } from '../../hooks';
import { Task } from '../../components';
import { Pressable } from '@react-native-material/core';
import { ThemeColor } from '../../../theme';

const Tasks = ({ navigation }: any) => {
    const {tasks, removeTask, updateTask, createTask} = useTasks();
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [taskModalVisible, setTaskModalVisible] = useState<boolean>(false);
    const [selectedTask, setSelectedTask] = useState<DataTask>();
    const [titleInput,setTitleInput] = useState<string>("");
    const [descInput,setDescInput] = useState<string>("");
    
    const changeState = (task: DataTask, isChecked : boolean) => {

    }

    const openModal = () => {
      setTitleInput("");
      setDescInput("");
      setModalVisible(true);
    }

    const createNewTask = () => {
      createTask({titre: titleInput, description: descInput, isFinished: false});
      setModalVisible(!modalVisible);
    }

    const openTaskDetail = (task: DataTask) => {
      setSelectedTask(task);
      setTitleInput(task.titre);
      setDescInput(task.description);
      setTaskModalVisible(!taskModalVisible);
    }

    const modifyTask = () => {

    }

    const deleteTask = () => {
      removeTask(selectedTask!);
      setSelectedTask(undefined);
      setTaskModalVisible(!taskModalVisible);
    }

    return (
      <View style={styles.container}>
        {tasks.map((task: DataTask, index: number) => (
          <Task key={index} theTask={task} openTask={openTaskDetail} changeStateTask={changeState} />
        ))}
        <Pressable onPress={() => (openModal())} style={styles.floatingInput}>
            <FontAwesome color={'#505050'} size={25} name='plus'/>
        </Pressable>
        <Modal animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
          <View style={styles.containerModal}>
            <Text style={{fontSize:20, margin: 10}}>Créer tâche</Text>
            <TextInput placeholder='titre' value={titleInput} onChangeText={setTitleInput} />
            <TextInput placeholder='description' value={descInput} onChangeText={setDescInput} />
            <View style={{flexDirection:'row',  alignItems: 'center', justifyContent: 'center', marginTop:5}}>
              <Pressable style={styles.button} pressEffect='ripple' onPress={() => {createNewTask()}}>
                <Text style={styles.buttonTxt}>Créer</Text>
              </Pressable>
              <Pressable style={styles.button} pressEffect='ripple' onPress={() => {setModalVisible(!modalVisible)}}>
                <Text style={styles.buttonTxt}>Annulé</Text>
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
            <Text style={{fontSize:20, margin: 10}}>Modifier tâche</Text>
            <TextInput placeholder='titre' value={titleInput} onChangeText={setTitleInput} />
            <TextInput placeholder='description' value={descInput} onChangeText={setDescInput} />
            <View style={{flexDirection:'row',  alignItems: 'center', justifyContent: 'center', marginTop:5}}>
              <Pressable style={styles.button} pressEffect='ripple' onPress={() => {modifyTask()}}>
                <Text style={styles.buttonTxt}>Modifier</Text>
              </Pressable>
              <Pressable style={styles.button} pressEffect='ripple' onPress={() => {setTaskModalVisible(!taskModalVisible)}}>
                <Text style={styles.buttonTxt}>Annulé</Text>
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
      marginTop: 50, 
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    containerModal:{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#F0F0F0',
    },
    button: {
      minWidth: 120,
      minHeight: 30,
      padding: 5,
      backgroundColor: ThemeColor.PRIMARY,
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

      bottom: 50,
      right: 50,

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