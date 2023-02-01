import { useEffect, useState, useRef, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { Button, TextInput, StatusBar, Pressable, StyleSheet, Text, View, Animated } from 'react-native';
import { Double } from 'react-native/Libraries/Types/CodegenTypes';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ThemeColor } from './theme';
import { Home, Profile, Tasks, Parameter, Inventory } from './src/pages';
import {IconButton, AppBar, FAB, ActivityIndicator } from "@react-native-material/core";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';
import * as SplashScreen from 'expo-splash-screen';
import AppLoading from 'expo-app-loading';
import { useFonts } from './src/hooks';

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator()

export default function App() {
  const navigation = useRef<any>(undefined)
  const [navIsReady, setNavIsReady] = useState<boolean>(false)
  const [isWaitingChangingLocaltion, setIsWaitingChangingLocaltion] = useState<boolean>(true)
  const [waitingChangingLocaltion, setWaitingChangingLocaltion] = useState<string>("Profile")
  const [actualNavigation, setActualNavigation] = useState<string>("Home")
  const [IsReady, SetIsReady] = useState(false);

  const LoadFonts = async () => {
    await useFonts();
  };

  useEffect(() => {
    //console.log('loaded : ' + fontsLoaded)
    if(IsReady && navigation != undefined && navigation.current.isReady()){
      setNavIsReady(true)
      setActualNavigation(navigation.current.getCurrentRoute().name)
      if(isWaitingChangingLocaltion){
        setIsWaitingChangingLocaltion(false)
        const location = waitingChangingLocaltion;
        setWaitingChangingLocaltion("")
        navigation.current.navigate(location)
        navTabUpdate(location)
      }
    }
  }, [IsReady, navigation])

  const navigate = (to : string) => {
    if(navIsReady){
      navigation.current.navigate(to)
      navTabUpdate(to)
    }else{
      setIsWaitingChangingLocaltion(true)
      setWaitingChangingLocaltion(to)
    }
  }

  const navTabUpdate = (page : string) => {
    setActualNavigation(page)
  }

  if (!IsReady) {
    return (
      <View style={{ flex: 1, justifyContent:'center', alignItems:'center' , backgroundColor: ThemeColor.PRIMARY, marginTop: StatusBar.currentHeight }}>
        <AppLoading
          startAsync={LoadFonts}
          onFinish={() => SetIsReady(true)}
          onError={() => {}}
        />
      </View>
    )
  }

  return (
    <View style={{ flex: 1, backgroundColor: ThemeColor.PRIMARY, marginTop: StatusBar.currentHeight }}>
      <NavigationContainer ref={navigation} 
      theme={{
        dark: true,
        colors: {
          primary: ThemeColor.PRIMARY,
          background: ThemeColor.PRIMARY,
          card: ThemeColor.PRIMARY,
          text: ThemeColor.PRIMARY_TEXT,
          border: "#00000000",
          notification: ThemeColor.PRIMARY,
        }
      }
      }>
        <Stack.Navigator
        initialRouteName='Home'
          screenOptions={{
            headerShown: false
          }}>
          <Stack.Screen
            initialParams={{navTabUpdate: navTabUpdate}}
            name="Home"
            component={Home}
          />
          <Stack.Screen
            initialParams={{navTabUpdate: navTabUpdate}}
            name="Tasks"
            component={Tasks}
            options={{
              headerShown: false,
              title: "Mes tâches",
              headerStyle: {
                backgroundColor: ThemeColor.PRIMARY_SHADE,
              },
              headerShadowVisible: false,
              headerTintColor: ThemeColor.PRIMARY_TEXT,
            }}
          />
          <Stack.Screen
            initialParams={{navTabUpdate: navTabUpdate}}
            name="Profile"
            component={Profile}
          />
          <Stack.Screen
            initialParams={{navTabUpdate: navTabUpdate}}
            name="Parameter"
            component={Parameter}
            options={{
              headerShown: true,
              headerTitle: 'Paramètres',
              headerStyle:{
                backgroundColor: ThemeColor.PRIMARY_THIN
              }
            }}
          />
          <Stack.Screen
            initialParams={{navTabUpdate: navTabUpdate}}
            name="Inventory"
            component={Inventory}
            options={{
              headerShown: true,
              headerTitle: 'Inventaire',
              headerStyle:{
                backgroundColor: ThemeColor.PRIMARY_THIN,
              }
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <View style={{backgroundColor:ThemeColor.PRIMARY ,margin:0, height:70, flexDirection:'row', justifyContent:'space-evenly', alignItems:'center'}} >
        <Ionicons onPress={() => {navigate("Home")}} name='md-home-sharp' style={styles.icon} size={40} color={ navIsReady && actualNavigation == "Home" ? ThemeColor.PRIMARY_SHADE : ThemeColor.PRIMARY_THIN} />
        <FontAwesome onPress={() => {navigate("Tasks")}} name='check-square-o' style={[styles.icon,{marginTop:5}]} size={45} color={ actualNavigation == "Tasks" ? ThemeColor.PRIMARY_SHADE : ThemeColor.PRIMARY_THIN} />
        <FontAwesome5 onPress={() => {navigate("Profile")}} name='user-alt' style={styles.icon} size={38} color={ actualNavigation == "Profile" || actualNavigation == "Inventory" || actualNavigation == "Parameter" ? ThemeColor.PRIMARY_SHADE : ThemeColor.PRIMARY_THIN} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    textShadowColor: "#00000029",
    textShadowOffset : {
      width: 0,
      height: 3,
    },
    textShadowRadius: 10,
  }
});
