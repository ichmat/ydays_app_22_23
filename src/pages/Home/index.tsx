import { useEffect, useState } from 'react';
import { Button, TextInput, StatusBar, StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { CustomFont, ThemeColor } from '../../../theme';
import { Stack, Pressable, IconButton, AppBar, FAB, ActivityIndicator } from "@react-native-material/core";
import React from 'react';
import { DataTask, Frequency, FrequencyEvery, ProgressTask, RecurrentTask, SimpleTask, TypeTask, WEEKDAY } from '../../../types/types';
import { useTasks } from '../../hooks';
import { Task, TaskProgress } from '../../components';
import { textAlign, width } from '@mui/system';

const Home = (HomeProp: any) => {
  //const navTabUpdate = HomeProp.route.params.navTabUpdate;

  const MAX_TITLE_CHAR : number = 17
  const MAX_DESC_CHAR : number = 25

  const {tasks} = useTasks();

  const [displayedTasks, setDisplayedTasks] = useState<DataTask[]>([])

  useEffect(() => {
    console.log("changing task")
    if(tasks != undefined && tasks.length > 0){
      setDisplayedTasks(tasks.filter(t => {
        return (t.isFinished == false)
      }))
    }else{
      setDisplayedTasks([])
    }
  },[tasks])

  const navigate = (to: string) => {
    //navTabUpdate(to)
    HomeProp.navigation.navigate(to)
  }
  
  return (
    <View style={styles.container}>
        <View style={styles.containerImageProfil}>
          <Image style={styles.ImageProfil} source={require('../../assets/man.png')}/>
        </View>
        <Text style={styles.title}> Welcome ! </Text>
        <View style={styles.containerTasks}>
          <Text style={styles.titleTask}>Tâche en cours...</Text>
          <ScrollView showsHorizontalScrollIndicator={false} style={{flex:5,overflow:'scroll'}} >
            <View style={styles.containerListTask}>
              {
                displayedTasks.map((task, index) => {
                  return (
                    <View key={index} style={styles.TaskBox}>
                      <View style={styles.taskTitle}>{task.titre.length > MAX_TITLE_CHAR ? task.titre.substring(0,MAX_TITLE_CHAR-3) + '...' : task.titre}</View>
                      <View style={styles.taskDesc}>{task.description.length > MAX_DESC_CHAR ?  task.description.substring(0,MAX_DESC_CHAR-3) + '...' : task.description}</View>
                      {
                        task.typeTask == TypeTask.Progress && (
                            <View style={styles.containerBar}>
                              <View style={[styles.bar,{width: (task as ProgressTask).progress+'%',}]} />
                          </View>
                        )
                      }
                    </View>
                  )
                })
              }
            </View>
          </ScrollView>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    
    container: {
      flex: 1,
      backgroundColor: ThemeColor.BACKGROUND,
      alignItems:'flex-start',
      justifyContent: 'flex-start',
    },
    title: {
      color: ThemeColor.PRIMARY_TEXT,
      fontSize: 40, 
      fontFamily: 'AusterRoundedBlack',
      marginTop:30,
      marginBottom:15,
      marginLeft:15,
      zIndex:1
    },
    containerTasks:{
      position:'absolute',
      width:'100%',
      height: '25%',
      bottom: '2%',
      flexDirection:'column'
    },
    titleTask:{
      fontFamily: CustomFont.PARALUCENT_DEMIBOLD,
      fontSize: 20,
      marginLeft:20,
      marginBottom: 20,
      flex:1
    },
    containerListTask:{
      flexDirection:'row',
      
    },
    containerBar:{
      height:12,
      alignSelf:'stretch',
      backgroundColor:ThemeColor.SECONDARY,
      borderRadius: 15,
      width:'80%',
      marginLeft: '10%',
    },
    bar:{
      flex:1,
      backgroundColor: ThemeColor.PRIMARY,
      borderRadius: 15,
    },
    containerImageProfil:{
      position:'absolute',
      width:'100%',
      height: '80%',
      justifyContent:'center',
      alignItems:'center',
    },
    ImageProfil:{
      width: '60%',
      height: '60%',
      resizeMode:'contain',
      zIndex: -1
    },
    TaskBox: {
      flexDirection: 'column',
      width: 150,
      height: 60,
      borderWidth: 0,
      backgroundColor: ThemeColor.WHITE,
      borderRadius: 10,
      marginLeft:15,
      justifyContent: 'center',
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.30,
      shadowRadius: 4.65,

      elevation: 8,
    },
    taskTitle: {
      marginLeft:15,
      fontFamily: CustomFont.PARALUCENT_DEMIBOLD,
      fontSize: 15
    },
    taskDesc: {
      marginLeft:15,
      fontFamily: CustomFont.PARALUCENT,
      fontSize: 11
    },
  });
  

export default Home