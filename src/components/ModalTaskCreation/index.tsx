import React, { useEffect, useState } from 'react';
import { Button, StatusBar, StyleSheet, Text, View, Modal } from 'react-native';
import { Pressable, TextInput } from '@react-native-material/core';
import { ThemeColor } from '../../../theme';
import { DataTask, Frequency, TypeTask } from '../../../types/types';
import FrequencySelector from '../FrequencySelector';


type PropsModalTaskCreation = {
    modalVisibility: boolean,
    requestHideModal: () => void,
    newTask: (title: string, desc: string, type: TypeTask) => void
}

const ModalTaskCreation = (props: PropsModalTaskCreation) => {
    const {modalVisibility, requestHideModal, newTask} = props
    // titre pour la tâche créer/modifier
    const [titleInput,setTitleInput] = useState<string>("");
    // description pour la tâche créer/modifier
    const [descInput,setDescInput] = useState<string>("");
    // type de tâche en cours de création
    const [typeTaskToCreate, setTypeTaskToCreate] = useState<TypeTask>(TypeTask.Simple)
    
    const [frequency, setFrequency] = useState<Frequency[]>([])

    const createNewTask = () => {
        // envoie la requête de création d etâcje
        newTask(titleInput, descInput, typeTaskToCreate)
        // ferme la modal
        requestHideModal();
    }

    return (
        <Modal animationType='slide'
            transparent={true}
            visible={modalVisibility}
            onRequestClose={() => {
                requestHideModal()
            }}>
        <View style={styles.containerModal}>
          <Text style={{fontSize:20, margin: 10, color:ThemeColor.PRIMARY_TEXT}}>Créer tâche</Text>
          <TextInput style={{minWidth:250}} variant='filled' color={ThemeColor.PRIMARY_TEXT} placeholderTextColor={ThemeColor.TERTIARY_TEXT} inputStyle={{color:ThemeColor.PRIMARY_TEXT}} placeholder='titre' value={titleInput} onChangeText={setTitleInput} />
          <TextInput style={{minWidth:250}} variant='filled' color={ThemeColor.PRIMARY_TEXT} placeholderTextColor={ThemeColor.TERTIARY_TEXT} inputStyle={{color:ThemeColor.PRIMARY_TEXT}} placeholder='description' value={descInput} onChangeText={setDescInput} />
          
          <View style={styles.containerButton}>
            <Pressable style={styles.button} pressEffect='ripple' onPress={() => {createNewTask()}}>
              <Text style={styles.buttonTxt}>Créer</Text>
            </Pressable>
            <Pressable style={styles.button} pressEffect='ripple' onPress={() => {requestHideModal()}}>
              <Text style={styles.buttonTxt}>Annuler</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    )
}

const styles = StyleSheet.create({
    containerModal:{
      flex: 6,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: ThemeColor.PRIMARY_SHADE,
      opacity:0.85,
      overflow:'visible'
    },
    containerButton: {
      flexDirection:'row', 
      alignItems: 'center', 
      justifyContent: 'center',
       marginTop:5
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
    }
  });

export default ModalTaskCreation