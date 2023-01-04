import { useEffect, useState } from 'react';
import { Button, TextInput, StatusBar, StyleSheet, Text, View } from 'react-native';
import { Double } from 'react-native/Libraries/Types/CodegenTypes';
import { ThemeColor } from '../../../theme';
import { Stack, Pressable, IconButton, AppBar, FAB } from "@react-native-material/core";

const Home = ({ navigation }: any) => {

  return (
    <View style={styles.container}>
        <Pressable style={styles.input} onPress={() => { navigation.push('Tasks') }} >
            <Text style={styles.inputText}>Mes tâches</Text>
        </Pressable>
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
      fontSize: 15
    },
    
  });
  

export default Home