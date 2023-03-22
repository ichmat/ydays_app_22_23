import React, { useEffect, useState } from 'react';
import { Button, StatusBar, StyleSheet, Text, View, Modal, TextInput } from 'react-native';
import { Pressable } from '@react-native-material/core';
import { CustomFont, Radius, ThemeColor } from '../../../theme';
import { DataTask, ProgressTask, TypeTask } from '../../../types/types';
import MultiSlider, { MultiSliderProps } from '@ptomasroos/react-native-multi-slider';
import { stepButtonClasses } from '@mui/material';
import { border } from 'native-base/lib/typescript/theme/styled-system';

type PropsModalTaskEdition = {
    modalVisibility: boolean,
    editedTask: DataTask | undefined,
    requestHideModal: () => void,
    requestTaskEdit: (editedTask: DataTask) => void,
    requestDeleteTask: (deletedTasl: DataTask) => void
}

const ModalTaskEdition = (props : PropsModalTaskEdition) => {
    const [progress, setProgress] = useState<number>(50)
    const {modalVisibility, editedTask, requestHideModal, requestTaskEdit, requestDeleteTask} = props;
    // titre pour la tâche créer/modifier
    const [titleInput,setTitleInput] = useState<string>("");
    // description pour la tâche créer/modifier
    const [descInput,setDescInput] = useState<string>("");
    const [displaySlider, setDisplaySlider] = useState<boolean>(false) 
    const SliderSize : MultiSliderProps = {height: 100, width: 100, borderRadius: 100, slipDisplacement: 100} as MultiSliderProps

    // à chaque fois qu'une nouvelle tâche est édité, mettre les valeurs de celle-ci dans le modal
    useEffect(() => {
        if(editedTask != undefined){
            setTitleInput(editedTask.titre)
            setDescInput(editedTask.description)
            if(editedTask.typeTask == TypeTask.Progress){
              const progressEdit : ProgressTask = editedTask as ProgressTask
              setProgress(progressEdit.progress)
              setDisplaySlider(true)
            }else{
              setDisplaySlider(false)
            }
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
            if(editedTask.typeTask == TypeTask.Progress){
              const progressEdit : ProgressTask = editedTask as ProgressTask
              if (progress == 100) {
                progressEdit.isFinished = true
              } else if (progress <= 100) {
                progressEdit.isFinished = false
              }
                progressEdit.progress = progress
            }
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
          <TextInput style={styles.txtInput} placeholderTextColor={ThemeColor.PRIMARY} placeholder='titre' value={titleInput} onChangeText={setTitleInput} />
          <TextInput style={styles.txtInput} placeholderTextColor={ThemeColor.PRIMARY} placeholder='description' value={descInput} onChangeText={setDescInput} />
          {
            displaySlider && (
              <MultiSlider
              values={[progress]}
              min={0}
              max={100}
              trackStyle={{height: 12, borderRadius: 20}}
              markerOffsetY={5}
              onValuesChangeFinish={(value) => {}}
              onValuesChange={(values) => {setProgress(values[0])}}
              />
            )
          }
         
          <View style={{flexDirection:'row',  alignItems: 'center', justifyContent: 'center', marginTop:5}}>
            <Pressable style={styles.button} pressEffect='ripple' onPress={() => {modifyTask()}}>
              <Text style={styles.buttonTxt}>Modifier</Text>
            </Pressable>
            <Pressable style={[styles.button, {backgroundColor: ThemeColor.WHITE, borderWidth: 2, borderColor: ThemeColor.BLACK}]} pressEffect='ripple' onPress={() => {requestHideModal()}}>
              <Text style={[styles.buttonTxt, {color: ThemeColor.BLACK}]}>Annuler</Text>
            </Pressable>
          </View>
          <Pressable style={[styles.button, {backgroundColor: ThemeColor.DANGER}]} pressEffect='ripple' onPress={() => {deleteTask()}}>
            <Text style={styles.buttonTxt}>Supprimer</Text>
          </Pressable>
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
    buttonTxt:{
      color:'#FFFFFF',
      fontFamily: CustomFont.PARALUCENT
    },
  });

export default ModalTaskEdition