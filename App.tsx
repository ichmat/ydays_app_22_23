import { useEffect, useState, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { Button, TextInput, StatusBar, Pressable, StyleSheet, Text, View, Animated, SafeAreaView, PermissionsAndroid, Permission } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ThemeColor } from './theme';
import { Home, Profile, Tasks, Parameter, Inventory } from './src/pages';
import {IconButton, AppBar, FAB, ActivityIndicator } from "@react-native-material/core";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import React from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { Shadow } from 'react-native-shadow-2';

const Stack = createNativeStackNavigator()

const SelectedColorIcon = ThemeColor.PRIMARY
const UnselectedColorIcon = ThemeColor.BLACK

const requestPermissionAndroid = async (permission: Permission, title: string, message: string): Promise<boolean> => {
  try {
    const granted = await PermissionsAndroid.request(
      permission,
      {
        title: title,
        message: message,
        buttonNegative: 'Annulé',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true
    } else {
      return false
    }
  } catch (err) {
    console.warn(err);
    return false
  }
};

const permissions = [
  {titre: "Lecture stockage interne", description: "", permission: PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE},
  {titre: "Ecriture stockage interne", description: "", permission: PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE},
]

export default function App() {
  const navigation = useRef<any>(undefined)
  const [navIsReady, setNavIsReady] = useState<boolean>(false)
  const [isWaitingChangingLocaltion, setIsWaitingChangingLocaltion] = useState<boolean>(false)
  const [waitingChangingLocaltion, setWaitingChangingLocaltion] = useState<string>("")
  const [actualNavigation, setActualNavigation] = useState<string>("Home")
  const [IsReady, SetIsReady] = useState<boolean>(false);
  const [haveAllPermission, setHaveAllPermission] = useState<boolean>(false)

  const [loaded] = useFonts({
    'AusterRoundedBlack': require('./src/assets/fonts/Auster/AusterRoundedBlack.ttf'),
    'Paralucent': require('./src/assets/fonts/Paralucent/Paralucent-Medium.ttf'),
    'Paralucent-DemiBold': require('./src/assets/fonts/Paralucent/Paralucent-DemiBold.ttf'),
  });

  /*useEffect(() => {
    for (let index = 0; index < permissions.length; index++) {
      const p = permissions[index]
      requestPermissionAndroid(p.permission, p.titre, p.description)
    }
  }, [])*/

  useEffect(() => {
    if(loaded){
      SetIsReady(true)
    }
  }, [loaded])

  useEffect(() => {
    if(IsReady && navigation != undefined && navigation.current.isReady()){
      setNavIsReady(true)
      setActualNavigation(navigation.current.getCurrentRoute().name)
      if(isWaitingChangingLocaltion){
        console.log('navigate')
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
        <ActivityIndicator />
      </View>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: ThemeColor.PRIMARY, marginTop: StatusBar.currentHeight, overflow:'hidden' }}>
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
            name="Home"
            component={Home}
          />
          <Stack.Screen
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
            name="Profile"
            component={Profile}
          />
          <Stack.Screen
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
            name="Inventory"
            component={Inventory}
            options={{
              headerShown: false,
              headerTitle: 'Inventaire',
              headerStyle:{
                backgroundColor: ThemeColor.PRIMARY_THIN,
              }
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <Shadow style={{width: '100%'}}>
        <View style={styles.containerBottomNavBar} >
          <Feather onPress={() => {navigate("Home")}} name='home' style={styles.icon} size={30} color={ navIsReady && actualNavigation == "Home" ? SelectedColorIcon : UnselectedColorIcon} />
          <Feather onPress={() => {navigate("Tasks")}} name='target' style={styles.icon} size={30} color={ actualNavigation == "Tasks" ? SelectedColorIcon : UnselectedColorIcon} />
          <Feather onPress={() => {navigate("Inventory")}} name='archive' style={styles.icon} size={30} color={ actualNavigation == "Inventory" ? SelectedColorIcon : UnselectedColorIcon} />
          <Feather onPress={() => {navigate("Profile")}} name='user' style={styles.icon} size={30} color={ actualNavigation == "Profile" || actualNavigation == "Parameter" ? SelectedColorIcon : UnselectedColorIcon} />
        </View>
      </Shadow>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ThemeColor.WHITE,
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
  },
  containerBottomNavBar:{
    backgroundColor:ThemeColor.WHITE,
    margin:0, 
    height:60, 
    flexDirection:'row', 
    justifyContent:'space-evenly', 
    alignItems:'center',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  }
});
