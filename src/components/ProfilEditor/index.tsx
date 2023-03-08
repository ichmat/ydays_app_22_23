import React, { useEffect } from "react";
import { useState } from "react";
import { View, StyleSheet, Text, ColorValue, Pressable, ViewStyle, TextStyle, ScrollView } from "react-native";
import { ThemeColor } from "../../../theme";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type PropsProfilEditor = {
    requestClosePage: () => void,
    displayStyle: ViewStyle,
}

enum CATEGORY{
    HAIR,
    FACE,
    EYES,
    MOUTH
}

const Categories = [
    {title: "Cheveux", catergory : CATEGORY.HAIR},
    {title: "Visage", catergory : CATEGORY.FACE},
    {title: "Yeux", catergory : CATEGORY.EYES},
    {title: "Bouche", catergory : CATEGORY.MOUTH}
]

const colorSelected = ThemeColor.PRIMARY;

const ProfilEditor = (props : PropsProfilEditor) => {

    const {requestClosePage, displayStyle} = props
    const [categorySelected,setCategorySelected] = useState<CATEGORY>(CATEGORY.HAIR)
    const [catStyles, setCatStyles] = useState<ViewStyle[]>([styles.catBox,styles.catBox,styles.catBox,styles.catBox])

    useEffect(() => {
        if(categorySelected != null){
            let newCatStyles : ViewStyle[] = [styles.catBox,styles.catBox,styles.catBox,styles.catBox]
            const newStyle : ViewStyle = {backgroundColor: colorSelected, height: 40, width: 100, borderRadius: 10, justifyContent:'center', alignItems:'center'};
            newCatStyles[categorySelected] = newStyle
            setCatStyles(newCatStyles)
        }
    }, [categorySelected])

    return (
        <View style={[styles.mainContainer,displayStyle]}>
            <Pressable style={styles.buttonBack} onPress={requestClosePage}>
                <MaterialCommunityIcons color={ThemeColor.BLACK} size={25} name='chevron-left' />
                <Text>Retour</Text>
            </Pressable>
            <ScrollView 
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            style={{marginTop:10, marginBottom:10, height: 40, overflow:'scroll'}}>
                <View style={styles.container}>
                    {
                        Categories.map((value,index) => {
                            return (
                                <Pressable key={index} style={catStyles[index]} onPress={() => setCategorySelected(value.catergory)} >
                                    <Text>{value.title}</Text>
                                </Pressable>
                            )
                        })
                    }
                </View>
            </ScrollView>
            {
               categorySelected == CATEGORY.HAIR && (
                <View>
                    <Text>test1</Text>
                </View>
               ) 
            }
            {
               categorySelected == CATEGORY.FACE && (
                <View>
                    <Text>test2</Text>
                </View>
               ) 
            }
            {
               categorySelected == CATEGORY.EYES && (
                <View>
                    <Text>test3</Text>
                </View>
               ) 
            }
            {
               categorySelected == CATEGORY.MOUTH && (
                <View>
                    <Text>test4</Text>
                </View>
               ) 
            }
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer:{
        backgroundColor: '#FF0000',
        flexDirection: 'column',
    },
    buttonBack: {
        flexDirection: 'row',
        justifyContent:'flex-start',
        alignItems:'center'
    },
    container: {
        flexDirection: 'row',
        flexWrap:'nowrap',
        height: 40,
    },
    catBox: {
        height: 40,
        width: 100,
        backgroundColor: ThemeColor.SECONDARY,
        borderRadius: 10,
        justifyContent:'center',
        alignItems:'center'
    }
  });

export default ProfilEditor