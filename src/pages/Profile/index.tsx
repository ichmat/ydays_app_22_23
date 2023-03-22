import { borderLeft } from '@mui/system';
import React, { useEffect, useRef, useState } from 'react';
import { Button, TextInput, StatusBar, StyleSheet, Text, View, Pressable, ScrollView, ViewStyle,Image } from 'react-native';
import { Pressable as MaterialPress } from '@react-native-material/core'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { CustomFont, ThemeColor } from '../../../theme';
import { Flex } from '@react-native-material/core';
import { OutfitEditor, ProfilEditor } from '../../components';

enum NavProfile{
  MAIN,
  EDITPROFIL,
  EDITOUTFIL
}

const Profile = (ProfilProps: any) => {
    //const navTabUpdate = ProfilProps.route.params.navTabUpdate;

    const [bottomScrollEnabled, setBottomScrollEnabled] = useState<boolean>(false)
    const scrollViewRef = useRef<ScrollView | null>(null)

    const [navProfilPage, setNavProfilPage] = useState<NavProfile>(NavProfile.MAIN)

    const [displayCategorie, setDisplayCategorie] = useState<ViewStyle>({display: 'none'})
    const [displayEditorProfil, setDisplayEditorProfil] = useState<ViewStyle>({display: 'none'})
    const [displayEditorOutfit, setDisplayEditorOutfit] = useState<ViewStyle>({display: 'none'})

    const [displayApperance,setDisplayApperance] = useState<boolean>(false)

    useEffect(() => {
      switch(navProfilPage){
        case NavProfile.MAIN:
          setBottomScrollEnabled(true)
          setDisplayCategorie({display: 'flex'})
          setDisplayEditorProfil({display: 'none'})
          setDisplayEditorOutfit({display: 'none'})
          break;
        case NavProfile.EDITPROFIL:
          scrollViewRef.current?.scrollToEnd()
          setBottomScrollEnabled(false)
          setDisplayCategorie({display: 'none'})
          setDisplayEditorProfil({display: 'flex'})
          setDisplayEditorOutfit({display: 'none'})
          break;
        case NavProfile.EDITOUTFIL:
          scrollViewRef.current?.scrollToEnd()
          setBottomScrollEnabled(false)
          setDisplayCategorie({display: 'none'})
          setDisplayEditorProfil({display: 'none'})
          setDisplayEditorOutfit({display: 'flex'})
          break;
      }
    },[navProfilPage])

    const navigate = (to: string) => {
        //navTabUpdate(to)
        ProfilProps.navigation.navigate(to)
      }

    const changeDisplayApperance = () => {
      const newValue = !displayApperance

      if(newValue){
        setNavProfilPage(NavProfile.MAIN)
      }

      setDisplayApperance(newValue)
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
            {
              !displayApperance && (
                <MaterialPress style={[styles.Apparence, {backgroundColor: ThemeColor.WHITE}]} onPress={() => {changeDisplayApperance()}}>
                  <Text style={[styles.SubTitle, {color:ThemeColor.BLACK}]}>Apparence</Text>
              </MaterialPress>
              )
            }
            {
              displayApperance && (
                <MaterialPress style={[styles.Apparence]} onPress={() => {changeDisplayApperance()}}>
                  <Text style={[styles.SubTitle, {color:ThemeColor.WHITE}]}>Apparence</Text>
              </MaterialPress>
              )
            }
            
            <MaterialPress style={[styles.Succes, {backgroundColor: ThemeColor.WHITE}]}>
                <Text style={[styles.SubTitle, {color:ThemeColor.BLACK}]}>Succès</Text>
            </MaterialPress>
          </View>
        </View>

        <View style={styles.containerImageProfil}>
          <Image style={styles.ImageProfil} source={require('../../assets/man.png')}/>
        </View>

        {
          displayApperance && (
            <ScrollView ref={scrollViewRef} scrollEnabled={bottomScrollEnabled} style={styles.Bottom} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
              <View style={styles.BottomContent}>
                <Pressable style={{width:110, height:6, borderRadius:10, backgroundColor: "#C0C0C0", alignSelf: 'center', marginTop:15, marginBottom:15}}></Pressable>
                
                <View style={[styles.Categorie, displayCategorie]}>
                    <MaterialPress onPress={() => {setNavProfilPage(NavProfile.EDITPROFIL)}} style={styles.CategorieStyle}>
                      <View style={styles.CategorieStyleLeft}>
                        <MaterialCommunityIcons color={ThemeColor.BLACK} size={25} name='face-man-profile' />
                        <Text style={[{marginLeft:5}, {fontFamily:CustomFont.PARALUCENT}]}>Modifier mon avatar</Text>
                      </View>
                      <MaterialCommunityIcons color={ThemeColor.BLACK} size={25} name='chevron-right' />
                    </MaterialPress>
                    
                    <MaterialPress onPress={() => {setNavProfilPage(NavProfile.EDITOUTFIL)}} style={styles.CategorieStyle}>
                      <View style={styles.CategorieStyleLeft}>
                        <MaterialCommunityIcons color={ThemeColor.BLACK} size={25} name='hanger' />
                        <Text style={[{marginLeft:5}, {fontFamily:CustomFont.PARALUCENT}]}>Modifier ma tenue</Text>
                      </View>
                      <MaterialCommunityIcons color={ThemeColor.BLACK} size={25} name='chevron-right' />
                    </MaterialPress>

                    <MaterialPress style={styles.CategorieStyle}>
                      <View style={styles.CategorieStyleLeft}>
                        <Feather color={ThemeColor.BLACK} size={25} name='share' />
                        <Text style={[{marginLeft:5}, {fontFamily:CustomFont.PARALUCENT}]}>Partager mon avatar</Text>
                      </View>
                      <MaterialCommunityIcons color={ThemeColor.BLACK} size={25} name='chevron-right' />
                    </MaterialPress>
                </View>

                <ProfilEditor requestClosePage={() => {setNavProfilPage(NavProfile.MAIN)}} displayStyle={displayEditorProfil} />

                <OutfitEditor requestClosePage={() => {setNavProfilPage(NavProfile.MAIN)}} displayStyle={displayEditorOutfit} />

              </View>
            </ScrollView>
          )
        }
        
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
      backgroundColor: ThemeColor.PRIMARY,
      borderRadius: 15,

      justifyContent:'center',
      alignItems:'center',

      shadowColor: ThemeColor.PRIMARY,
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.37,
      shadowRadius: 7.49,

      elevation: 12,
    },
    Succes: {
      border: 1,
      paddingTop: 12,
      paddingBottom: 12,
      paddingLeft: 58,
      paddingRight: 58,
      backgroundColor: ThemeColor.PRIMARY,
      borderRadius: 15,

      justifyContent:'center',
      alignItems:'center',

      shadowColor: ThemeColor.PRIMARY,
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.37,
      shadowRadius: 7.49,

      elevation: 12,
    },
   
    SubTitle: {
      fontFamily:CustomFont.PARALUCENT,
      color: ThemeColor.WHITE,
      fontSize: 15,
    },
    Categorie: {
      display: 'flex',
      flexDirection: 'column',
    },
    CategorieStyle: {
      paddingBottom: 10,
      paddingTop: 10,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    CategorieStyleLeft: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
    },

    containerImageProfil:{
      position:'absolute',
      width:'100%',
      height: '100%',
      justifyContent:'center',
      alignItems:'center',
      marginTop:'5%',
      zIndex: -100
    },
    ImageProfil:{
      width: '50%',
      height: '50%',
      resizeMode:'contain',
      zIndex: -100
    }
  });

export default Profile