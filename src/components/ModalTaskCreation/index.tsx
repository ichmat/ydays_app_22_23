import React, { useEffect, useState } from 'react';
import { Button, StatusBar, StyleSheet, Text, View, Modal, TextInput } from 'react-native';
import { Pressable } from '@react-native-material/core';
import { CustomFont, ThemeColor } from '../../../theme';
import { DataTask, Frequency, TypeTask } from '../../../types/types';
import FrequencySelector from '../FrequencySelector';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';


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

    const [notReady,setNotReady] = useState<boolean>(false);

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
          <TextInput style={styles.txtInput} placeholderTextColor={ThemeColor.PRIMARY} placeholder='titre' value={titleInput} onChangeText={setTitleInput} />
          <TextInput style={styles.txtInput} placeholderTextColor={ThemeColor.PRIMARY} placeholder='description' value={descInput} onChangeText={setDescInput} />
          
          <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Type de tâche</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="simple"
            name="radio-buttons-group"
            row
            value={typeTaskToCreate}
            onChange={(value) => setTypeTaskToCreate(parseInt(value.target.value))}
            >
            <FormControlLabel value={TypeTask.Simple} control={<Radio />} label="simple" />
            <FormControlLabel value={TypeTask.Progress} control={<Radio />} label="progression" />
          </RadioGroup>
          </FormControl>

          <View style={styles.containerButton}>
            <Pressable style={styles.button} pressEffect='ripple' onPress={() => {createNewTask()}}>
              <Text style={styles.buttonTxt}>Créer</Text>
            </Pressable>
            <Pressable style={[styles.button, {backgroundColor: ThemeColor.WHITE, borderWidth: 2, borderColor: ThemeColor.BLACK}]} pressEffect='ripple' onPress={() => {requestHideModal()}}>
              <Text style={[styles.buttonTxt, {color: ThemeColor.BLACK}]}>Annuler</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    )
}

const styles = StyleSheet.create({
    txtInput:{
      minWidth:250,
      paddingHorizontal: 6,
      paddingVertical: 8,
      backgroundColor: ThemeColor.WHITE,
      borderWidth: 0,
      color: ThemeColor.BLACK,
      borderRadius: 9,
      margin:5,

      shadowColor: ThemeColor.PRIMARY,
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.37,
      shadowRadius: 7.49,

      elevation: 12,
    },
    containerModal:{
      flex: 6,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: ThemeColor.PRIMARY_LIGHT,
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
      borderRadius: 10,
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
      color:'#FFFFFF',
      fontFamily: CustomFont.PARALUCENT
    }
  });

export default ModalTaskCreation