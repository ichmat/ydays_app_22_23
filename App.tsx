import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { Button, TextInput, StatusBar, Pressable, StyleSheet, Text, View } from 'react-native';
import { Double } from 'react-native/Libraries/Types/CodegenTypes';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ThemeColor } from './theme';
import { Home, Tasks } from './src/pages';

const Stack = createNativeStackNavigator()

export default function App() {
  
  return (
    <View style={{ flex: 1, backgroundColor: ThemeColor.PRIMARY, marginTop: StatusBar.currentHeight }}>
      <NavigationContainer theme={{
        dark: true,
        colors: {
          primary: ThemeColor.PRIMARY,
          background: ThemeColor.PRIMARY,
          card: ThemeColor.PRIMARY,
          text: ThemeColor.PRIMARY_TEXT,
          border: ThemeColor.PRIMARY,
          notification: ThemeColor.PRIMARY,
        }
      }
      }>

          <Stack.Navigator
            screenOptions={{}}>
            <Stack.Screen
              options={{
                headerShown: false
              }}
              name="Home"
              component={Home}
            />
            <Stack.Screen
              name="Tasks"
              component={Tasks}
              options={{
                title: "Mes tâches",
                headerStyle: {
                  backgroundColor: ThemeColor.PRIMARY_SHADE,
                },
                headerShadowVisible: false,
                headerTintColor: ThemeColor.PRIMARY_TEXT,
              }}
            />
          </Stack.Navigator>
      </NavigationContainer>
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
    /** style ici */
  }
});
