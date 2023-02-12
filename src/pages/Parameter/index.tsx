import React from 'react';
import { Button, TextInput, StatusBar, StyleSheet, Text, View, Pressable } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ThemeColor } from '../../../theme';
import { Pressable as PressMaterial } from '@react-native-material/core';

const array = [
    {titre: 'Notifications', component: 'Ionicons', size:30,  icon: 'notifications', pressed: () => {console.log("page1")}},
    {titre: 'Confidentialité', component: 'FontAwesome5', size:27, icon: 'lock', pressed: () => {console.log("page2")}},
    {titre: 'Surveillance', component: 'FontAwesome5', size:27, icon: 'binoculars', pressed: () => {console.log("page3")}},
    {titre: 'Compte', component: 'FontAwesome5', size:26, icon: 'user-alt', pressed: () => {console.log("page4")}},
    {titre: 'Aide', component: 'Entypo', size:30, icon: 'lifebuoy', pressed: () => {console.log("page5")}},
    //{titre: 'Info', component: 'FontAwesome', size:30, icon: 'info-circle', pressed: () => {console.log("page6")}},
]

const Parameter = (ParameterProp: any) => {
    const navTabUpdate = ParameterProp.route.params.navTabUpdate;

    return (
        <View style={styles.container}>
            {
                array.map((value,index) => {
                    let icon;
                    switch(value.component){
                        case 'FontAwesome5':
                            icon = <FontAwesome5 style={styles.icon} name={value.icon} size={value.size}/>
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