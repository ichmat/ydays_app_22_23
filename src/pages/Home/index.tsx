import { useEffect, useState } from 'react';
import { Button, TextInput, StatusBar, Pressable, StyleSheet, Text, View, Task, Modal } from 'react-native';
import { Double } from 'react-native/Libraries/Types/CodegenTypes';
import { useTest } from '../../hooks';
import { TaskBox } from '../../components'
import { DataTask } from '../../../types/types'
import useTask from '../../hooks/useTask/useTask';
import Tasks from '../Tasks';


const Home = ({ navigation }: any) => {
  const [text, setText] = useState("titre tâche");
  const {tasks, createTask, supprTask, modifTask, changeState} = useTask();

  const [modalVisible,setModalVisible] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<DataTask>();

  const [newTitleData, modifiableTitle] = useState("");

  const buttonPressed = () => {
    createTask(text, true)
  }

  const openTask = (task: DataTask) => {
    setSelectedTask(task)
    modifiableTitle(task.titre)
    setModalVisible(true)
    
  }

  useEffect(() => {
    console.log(tasks)
  }, [tasks])

  const modifTitle = () => {
    modifTask(newTitleData, selectedTask!)
    setModalVisible(false)
  }

  const buttonSuppTask = () => {
    supprTask(selectedTask!)
    setModalVisible(false)
  }

  const changeStateTask  = (task: DataTask, newState : boolean) => {
    changeState(task, newState)
  } 

  // dans useTask, créer une fonction de 
  // ✅ dans TaskBox, créer une fonction qui permet de sigmodification et de suppression de tâchenaler si la tâche devient 'checked' ou non 
  // dans Home, il faut faire le liens + créer un bouton Modifier dans le Modal

  return (
    <View style={styles.container}>
        <TextInput
            onChangeText={setText}
            value={text}
        />
        <Pressable style={styles.input} onPress={buttonPressed}><Text>Créer Tache(s)</Text></Pressable> 
        {
          tasks.map((value, index) => (
            <TaskBox key={index} dataTask={value} openTask={openTask} taskChangeState={changeStateTask} />
          ))
        }

        <Modal animationType='slide'
        transparent={true}
        visible={modalVisible}
        >
          <View style={styles.container}>
            <Text style={{fontSize:20, margin: 10}}>Modifier tâche : 
            <TextInput
              onChangeText={modifiableTitle}
              value={newTitleData}
            /></Text>

            <Pressable style={styles.buttonDelete} onPress={buttonSuppTask}>
              <Text style={styles.buttonTxt}>Supprimer</Text> 
            </Pressable>
            <Pressable style={styles.button} onPress={modifTitle}>
              <Text style={styles.buttonTxt}>Modifier</Text>

            </Pressable>
            <Pressable style={styles.button} onPress={() => {setModalVisible(!modalVisible)}}>
                <Text style={styles.buttonTxt}>Annuler</Text>
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
    input: {
      padding: 20,
      margin: 10,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: '#f0f0f0',
      backgroundColor: '#f9f9f9'
    },
    button: {
      minWidth: 120,
      minHeight: 30,
      padding: 5,
      backgroundColor: '#36393F',
      borderRadius: 5,
      margin: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonDelete: {
      minWidth: 120,
      minHeight: 30,
      padding: 5,
      backgroundColor: '#F04343',
      borderRadius: 5,
      margin: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonTxt:{
      color:'#FFFFFF'
    },
  });
  

export default Home