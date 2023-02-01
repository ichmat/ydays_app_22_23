import React from 'react';
import { Button, TextInput, StatusBar, StyleSheet, Text, View } from 'react-native';
import { ThemeColor } from '../../../theme';


const Profile = (ProfilProps: any) => {
    const navTabUpdate = ProfilProps.route.params.navTabUpdate;

    const navigate = (to: string) => {
        navTabUpdate(to)
        ProfilProps.navigation.navigate(to)
      }

    return (
        <View style={styles.container}>
            <Text>Page Profile</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: ThemeColor.PRIMARY_THIN,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default Profile