import { useEffect, useState } from 'react';
import { Button, TextInput, StatusBar, StyleSheet, Text, View } from 'react-native';
import { Double } from 'react-native/Libraries/Types/CodegenTypes';
import { ThemeColor } from '../../../theme';
import { Stack, Pressable, IconButton, AppBar, FAB, ActivityIndicator } from "@react-native-material/core";
import React from 'react';
import {Bar} from 'react-native-progress';
import AppLoading from 'expo-app-loading';
import { FrequencySelector } from '../../components';
import { useFonts } from 'expo-font';
import { DataTask, Frequency, FrequencyEvery, RecurrentTask, TypeTask, WEEKDAY } from '../../../types/types';
import uuid from 'react-native-uuid';

const Home = (HomeProp: any) => {
  const navTabUpdate = HomeProp.route.params.navTabUpdate;

  

  const navigate = (to: string) => {
    navTabUpdate(to)
    HomeProp.navigation.navigate(to)
  }
  /*
  if(!loaded){
    return (
      <View style={{ flex: 1, justifyContent:'center', alignItems:'center' , backgroundColor: ThemeColor.PRIMARY, marginTop: StatusBar.currentHeight }}>
        <ActivityIndicator />
      </View>
    )
  }*/

  // DEBUG
  const showFrequence = (freq: Frequency) => {
    if(freq.every == FrequencyEvery.NULL)
    {
        console.log("freq is null")
        return;
    }else{
      console.log(freq)
    }
    const req = new RecurrentTask(uuid.v4() as string, "Ttest", "Dtest", TypeTask.Simple, freq)
    const array = []
    let task: DataTask | null = req.createTask(uuid.v4() as string)
    while(task != null){
      array.push({dateTask : task.startTask.toLocaleString() + ' ' + weekToString(task.startTask.getDay())})

      task = req.createTask(uuid.v4() as string)
    }
    console.log(array)
  }

  // DEBUG
  const weekToString = (week :WEEKDAY): string =>{
    switch(week){
      case WEEKDAY.MONDAY:
        return "Lundi"
      case WEEKDAY.THUESDAY:
        return "Mardi"
      case WEEKDAY.WEDNESDAY:
        return "Mercredi"
      case WEEKDAY.THURSDAY:
        return "Jeudi"
      case WEEKDAY.FRIDAY:
        return "Vendredi"
      case WEEKDAY.SATURDAY:
        return "Samedi"
      case WEEKDAY.SUNDAY:
        return "Dimanche"
    }
  }

  return (
    <View style={styles.container}>
        <Text style={styles.title}> Welcome ! </Text>
        <FrequencySelector NotReady={() => {SetIsReady(false)}} ReadyAndchangeFrequency={showFrequence} />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: ThemeColor.PRIMARY_THIN,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      color: ThemeColor.PRIMARY_TEXT,
      fontSize: 50, 
      fontFamily: 'AusterRoundedBlack',
      fontWeight: 'bold'
    },
    input: {
      backgroundColor: ThemeColor.PRIMARY,
      borderRadius: 5,
      padding: 5,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.30,
      shadowRadius: 4.65,
      elevation: 8,
    },
    inputText: {
      color: '#FFFFFF',
      fontSize: 16, 
      //fontFamily:"Berlin Sans FB Regular"
    },
    
  });
  

export default Home