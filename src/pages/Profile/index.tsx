import { borderLeft } from '@mui/system';
import React, { useEffect, useRef, useState } from 'react';
import { Button, TextInput, StatusBar, StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { CustomFont, ThemeColor } from '../../../theme';
import { Flex } from '@react-native-material/core';

const Profile = (ProfilProps: any) => {
    //const navTabUpdate = ProfilProps.route.params.navTabUpdate;

    const [bottomScrollEnabled, setBottomScrollEnabled] = useState<boolean>(true)
    const scrollViewRef = useRef<ScrollView | null>(null);

    useEffect(() => {
      if(scrollViewRef != null){
        if(bottomScrollEnabled){
        }else{

        }
      }
    },[bottomScrollEnabled])

    const navigate = (to: string) => {
        //navTabUpdate(to)
        ProfilProps.navigation.navigate(to)
      }

    return (
      
      <View style={styles.container}>
        <View style={styles.Header}>
          <View style={styles.Top}>
            <Pressable style={styles.ParamsButton} onPress={() => {navigate("Parameter")}}>
              <Feather color={ThemeColor.BLACK} size={25} name='settings' />
            </Pressable>
          </View>
          <Text style={styles.Title} >Mon avatar</Text>

          <View style={styles.HeaderButton}>
            <Pressable style={styles.Apparence}>
                <Text style={[styles.SubTitle, {fontFamily:CustomFont.PARALUCENT}]}>Apparence</Text>
            </Pressable>
            <Pressable style={styles.Succes}>
                <Text style={[styles.SubTitle, {fontFamily:CustomFont.PARALUCENT}]}>Succès</Text>
            </Pressable>
          </View>
        </View>
        <ScrollView ref={scrollViewRef} scrollEnabled={true} style={styles.Bottom} showsHorizontalScrollIndicator={false}>
          <View style={styles.BottomContent}>
            <Pressable onPressIn={() => {console.log("onPressIn");setBottomScrollEnabled(true)}} onPressOut={() => {console.log("onPressOut");setBottomScrollEnabled(false)}} style={{width:110, height:6, borderRadius:10, backgroundColor: "#C0C0C0", alignSelf: 'center', marginTop:15, marginBottom:15}}></Pressable>
            
            <View style={styles.Categorie}>
                <Pressable style={styles.CategorieStyle}>
                  <View style={styles.CategorieStyleLeft}>
                    <MaterialCommunityIcons color={ThemeColor.BLACK} size={25} name='face-man-profile' />
                    <Text style={[{marginLeft:5}, {fontFamily:CustomFont.PARALUCENT}]}>Modifier mon avatar</Text>
                  </View>
                  <MaterialCommunityIcons color={ThemeColor.BLACK} size={25} name='chevron-right' />
                </Pressable>
                
                <Pressable style={styles.CategorieStyle}>
                  <View style={styles.CategorieStyleLeft}>
                    <MaterialCommunityIcons color={ThemeColor.BLACK} size={25} name='hanger' />
                    <Text style={[{marginLeft:5}, {fontFamily:CustomFont.PARALUCENT}]}>Modifier ma tenue</Text>
                  </View>
                  <MaterialCommunityIcons color={ThemeColor.BLACK} size={25} name='chevron-right' />
                </Pressable>

                <Pressable style={styles.CategorieStyle}>
                  <View style={styles.CategorieStyleLeft}>
                    <Feather color={ThemeColor.BLACK} size={25} name='share' />
                    <Text style={[{marginLeft:5}, {fontFamily:CustomFont.PARALUCENT}]}>Partager mon avatar  </Text>
                  </View>
                  <MaterialCommunityIcons color={ThemeColor.BLACK} size={25} name='chevron-right' />
                </Pressable>
                
            </View>

          </View>
        </ScrollView>
      </View>
      
        
    )
    
}
const styles = StyleSheet.create({
    container: {
      flex: 6,
      backgroundColor: ThemeColor.BACKGROUND,
    },
    Bottom: {
      backgroundColor: "#00000000",
      width: '100%',
      position: 'absolute',
      height: 260,
      paddingTop: 200,
      bottom: 0,
      left:0,
      overflow:'scroll'
    },
    BottomContent:{
      width:'100%',
      height: 260,
      backgroundColor: ThemeColor.WHITE,
      border: 0,
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
      flexDirection:'column',
    },
    Header: {
      width: 100+'%',
      display: 'flex',
      flexDirection: 'column',
    },
    Top: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    Title:{
      marginLeft: 10,
      fontSize: 40,
      fontFamily: CustomFont.AUSTER,
      
    },
    ParamsButton: {
      display: 'flex',
      padding: 10,
      top: 0,
      
    },
    HeaderButton: {
      marginTop: 20,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    Apparence: {
      border: 1,
      paddingTop: 12,
      paddingBottom: 12,
      paddingLeft: 40,
      paddingRight: 40,
      backgroundColor: ThemeColor.PRIMARY_SHADE,
      borderRadius: 15,
    },
    Succes: {
      border: 1,
      paddingTop: 12,
      paddingBottom: 12,
      paddingLeft: 58,
      paddingRight: 58,
      backgroundColor: ThemeColor.PRIMARY_SHADE,
      borderRadius: 15,
    },
    SubTitle: {
      fontSize: 15,
    },
    Categorie: {
      display: 'flex',
      flexDirection: 'column',
    },
    CategorieStyle: {
      marginTop: 20,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    CategorieStyleLeft: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
    },
  });

export default Profile