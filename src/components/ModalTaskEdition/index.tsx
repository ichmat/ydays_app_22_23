import React, { useEffect, useState } from 'react';
import { Button, StatusBar, StyleSheet, Text, View, Modal } from 'react-native';
import { Pressable, TextInput } from '@react-native-material/core';
import { ThemeColor } from '../../../theme';
import { DataTask, TypeTask } from '../../../types/types';

type PropsModalTaskEdition = {
    modalVisibility: boolean,
    editedTask: DataTask | undefined,
    requestHideModal: () => void,
    requestTaskEdit: (editedTask: DataTask) => void,
    requestDeleteTask: (deletedTasl: DataTask) => void
}

const ModalTaskEdition = (props : PropsModalTaskEdition) => {
    const {modalVisibility, editedTask, requestHideModal, requestTaskEdit, requestDeleteTask} = props;
    // titre pour la tâche créer/modifier
    const [titleInput,setTitleInput] = useState<string>("");
    // description pour la tâche créer/modifier
    const [descInput,setDescInput] = useState<string>("");

    // à chaque fois qu'une nouvelle tâche est édité, mettre les valeurs de celle-ci dans le modal
    useEffect(() => {
        if(editedTask != undefined){
            setTitleInput(editedTask.titre)
            setDescInput(editedTask.description)
        }else{
            setTitleInput("")
            setDescInput("")
        }
    },[editedTask])

    // modification de la tâche
    const modifyTask = () => {
        if(editedTask != undefined){
            editedTask.titre = titleInput
            editedTask.description = descInput
            requestTaskEdit(editedTask)
        }
        requestHideModal()
    }

    const deleteTask = () => {
        if(editedTask != undefined){
            requestDeleteTask(editedTask)
        }
        requestHideModal()
    }

    return (
        <Modal animationType='slide'
      transparent={true}
      visible={modalVisibility}
      onRequestClose={() => {
        requestHideModal();
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
            <Pressable style={styles.button} pressEffect='ripple' onPress={() => {requestHideModal()}}>
              <Text style={styles.buttonTxt}>Annuler</Text>
            </Pressable>
          </View>
          <Pressable style={styles.buttonDelete} pressEffect='ripple' onPress={() => {deleteTask()}}>
            <Text style={styles.buttonTxt}>Supprimer</Text>
          </Pressable>
        </View>
      </Modal>
    )
}


const styles = StyleSheet.create({
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
    }
  });

export default ModalTaskEdition