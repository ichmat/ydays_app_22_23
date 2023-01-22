import { useEffect, useState } from 'react';
import { Button, TextInput, StatusBar, StyleSheet, Text, View } from 'react-native';
import { Double } from 'react-native/Libraries/Types/CodegenTypes';
import { ThemeColor } from '../../../theme';
import { Stack, Pressable, IconButton, AppBar, FAB } from "@react-native-material/core";
import React from 'react';
import {Bar} from 'react-native-progress';
import AppLoading from 'expo-app-loading';
import { useFonts } from '../../hooks';
import { FrequencySelector } from '../../components';

const Home = (HomeProp: any) => {
  const navTabUpdate = HomeProp.route.params.navTabUpdate;

  const [IsReady, SetIsReady] = useState(false);

  const navigate = (to: string) => {
    navTabUpdate(to)
    HomeProp.navigation.navigate(to)
  }

  return (
    <View style={styles.container}>
        <Text style={styles.title}> Welcome ! </Text>
        <FrequencySelector changeFrequency={(freq) => {}} />
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
      fontSize: 23, 
      //fontFamily:"Berlin Sans FB Regular"
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