import { borderLeft } from '@mui/system';
import React from 'react';
import { Button, TextInput, StatusBar, StyleSheet, Text, View, Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { ThemeColor } from '../../../theme';

const Profile = (ProfilProps: any) => {
    //const navTabUpdate = ProfilProps.route.params.navTabUpdate;

    const navigate = (to: string) => {
        //navTabUpdate(to)
        ProfilProps.navigation.navigate(to)
      }

    return (
      
      <View style={styles.container}>
          <Pressable style={styles.InvButton} onPress={() => {navigate("Inventory")}}>
            <MaterialIcons color={ThemeColor.PRIMARY_THIN} size={35} name='backpack' />
          </Pressable>  
        
          <Pressable style={styles.ParamsButton} onPress={() => {navigate("Parameter")}}>
            <Ionicons color={ThemeColor.PRIMARY_THIN} size={35} name='settings-sharp' />
          </Pressable>

          <Text>Page Profile</Text>
      </View>
      
        
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: ThemeColor.BACKGROUND,
      alignItems: 'center',
      justifyContent: 'center',
    },
    ParamsButton: {
      top:5,
      right:5,
      position: 'absolute',
      backgroundColor: ThemeColor.PRIMARY_SHADE,
      borderRadius: 50,
      borderWidth: 0,
      padding: 5,
      
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.32,
      shadowRadius: 5.46,

      elevation: 9,
    },
    InvButton: {
      top:5,
      left:5,
      position: 'absolute',
      backgroundColor: ThemeColor.PRIMARY_SHADE,
      borderRadius: 50,
      borderWidth: 0,
      padding: 5,
      
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.32,
      shadowRadius: 5.46,

      elevation: 9,
    },
  });

export default Profile