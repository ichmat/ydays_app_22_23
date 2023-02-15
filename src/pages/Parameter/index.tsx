import React, { useRef } from 'react';
import { Button, TextInput, StatusBar, StyleSheet, Text, View, Pressable } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ThemeColor } from '../../../theme';
import { Pressable as PressMaterial } from '@react-native-material/core';

const array = [
    {titre: 'Profil', component: 'MaterialCommunityIcons', size:30,  icon: 'face-man-profile', pressed: () => {console.log("page1")}},
    {titre: 'Confidentialité', component: 'Feather', size:27, icon: 'lock', pressed: () => {console.log("page2")}},
    {titre: 'Notifications', component: 'MaterialCommunityIcons', size:27, icon: 'bell-badge-outline', pressed: () => {console.log("page3")}},
    {titre: 'Son', component: 'AntDesign', size:26, icon: 'sound', pressed: () => {console.log("page4")}},
    {titre: 'Langue', component: 'Ionicons', size:30, icon: 'globe-outline', pressed: () => {console.log("page5")}},
    {titre: 'Support', component: 'MaterialCommunityIcons', size:30, icon: 'face-agent', pressed: () => {console.log("page6")}},
    {titre: 'FAQ', component: 'FontAwesome', size:30, icon: 'question', pressed: () => {console.log("page7")}},
    {titre: 'Se déconnecter', component: 'Feather', size:30, icon: 'log-out', pressed: () => {console.log("page8")}},
    //{titre: 'Info', component: 'FontAwesome', size:30, icon: 'info-circle', pressed: () => {console.log("page6")}},
]

const Parameter = (ParameterProp: any) => {
    //ProfilProps.navigation.goBack()
    return (
        <View style={styles.container}>
            <Pressable onPress={() => ParameterProp.navigation.goBack()} style={{width:100, height:40, backgroundColor:"#FF0000", flexDirection:'row', alignItems:'center'}}>
            <MaterialCommunityIcons color={ThemeColor.BLACK} size={40} name='chevron-left' />
            <Text style={{fontSize:20}}>Retour</Text>
            </Pressable>
            {
                array.map((value,index) => {
                    let icon;
                    switch(value.component){
                        case 'FontAwesome5':
                            icon = <FontAwesome5 style={styles.icon} name={value.icon} size={value.size}/>
                            break;
                        case 'Feather':
                            icon = <Feather style={styles.icon} name={value.icon} size={value.size}/>
                            break;
                        case 'MaterialCommunityIcons':
                            icon = <MaterialCommunityIcons style={styles.icon} name={value.icon} size={value.size}/>
                            break;
                        case 'AntDesign':
                            icon = <AntDesign style={styles.icon} name={value.icon} size={value.size}/>
                            break;
                        case 'Entypo':
                            icon = <Entypo style={styles.icon} name={value.icon} size={value.size}/>
                            break;
                        case 'Ionicons':
                            icon = <Ionicons style={styles.icon} name={value.icon} size={value.size}/>
                            break;
                        default:
                            icon = <FontAwesome style={styles.icon} name={value.icon} size={value.size}/>
                            break;
                    }
                    
                    return (
                            <PressMaterial key={index} style={styles.parameterContainer} onPress={value.pressed}> 
                                <View style={styles.iconContainer}>
                                    {icon}
                                </View>
                                <View style={styles.textContainer}>
                                    <Text style={styles.text}>{value.titre}</Text>
                                </View>
                            </PressMaterial>
                    )
                })
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: ThemeColor.BACKGROUND,
        flex:1
    },
    parameterContainer: {
        flexDirection: 'row',
        alignItem: 'center',
        height:50,
        paddingStart:6
    },
    textContainer:{
        flex: 5,
        justifyContent:'center',
    },
    text: {
        fontSize: 16,
    },
    iconContainer:{
        flex: 1,
        alignItems:'center',
        justifyContent:'center',
    },
    icon: {
    }
})

export default Parameter