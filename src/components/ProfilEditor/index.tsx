import React, { useEffect } from "react";
import { useState} from "react";
import { View, StyleSheet, Text, ColorValue, Pressable, ViewStyle, TextStyle, ScrollView, Image } from "react-native";
import { ThemeColor } from "../../../theme";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { FormControl, Radio,FormControlLabel, FormLabel, RadioGroup } from "@mui/material";
import { CATEGORY_HEAD, ItemHead } from "../../../types/types";
import { useAvatar } from "../../hooks";

type PropsProfilEditor = {
    requestClosePage: () => void,
    displayStyle: ViewStyle,
}



const Categories = [
    {title: "Cheveux", catergory : CATEGORY_HEAD.HAIR},
    {title: "Visage", catergory : CATEGORY_HEAD.FACE},
    {title: "Yeux", catergory : CATEGORY_HEAD.EYES},
    {title: "Bouche", catergory : CATEGORY_HEAD.MOUTH}
]

const colorButtonSelected = ThemeColor.PRIMARY;

const ProfilEditor = (props : PropsProfilEditor) => {

    const {getColorsByCat, getItemHeadByCatAndColor} = useAvatar()

    const {requestClosePage, displayStyle} = props
    const [categorySelected,setCategorySelected] = useState<CATEGORY_HEAD | undefined>(undefined)
    const [catStyles, setCatStyles] = useState<ViewStyle[]>([styles.catBox,styles.catBox,styles.catBox,styles.catBox])

    const [listColorsAvailable, setListColorsAvailable] = useState<string[]>([])

    const [colorSelectorStyle, setColorSelectorStyle] = useState<ViewStyle[]>([])
    const [colorSelected, setColorSelected] = useState<string | undefined>(undefined)

    const [listItemHead, setListItemHead] = useState<ItemHead[] | undefined>(undefined)

    useEffect(() => {
        if(categorySelected != undefined){
            let newCatStyles : ViewStyle[] = [styles.catBox,styles.catBox,styles.catBox,styles.catBox]
            const newStyle : ViewStyle = {backgroundColor: colorButtonSelected, height: 40, width: 100, borderRadius: 10, justifyContent:'center', alignItems:'center'};
            newCatStyles[categorySelected] = newStyle
            setCatStyles(newCatStyles)
            const colors: string[] = getColorsByCat(categorySelected)
            setListColorsAvailable(colors)
            let styleSelector : ViewStyle[] = []
            colors.forEach((color) => {
                styleSelector.push(
                    {width: 25,
                    height: 25,
                    borderRadius: 25,
                    marginLeft: 5,
                    marginRight: 5,
                    backgroundColor: color})
            })
            setColorSelectorStyle(styleSelector)
        }else{
            setListColorsAvailable([])
            setColorSelectorStyle([])
        }
        setColorSelected(undefined)
    }, [categorySelected])

    useEffect(() => {
        if(colorSelected != undefined) {

            let newColorStyles : ViewStyle[] = []

            for (let index = 0; index < colorSelectorStyle.length; index++) {
                const c = colorSelectorStyle[index].backgroundColor!.toString()
                if(c != colorSelected){
                    newColorStyles.push({width: 25,
                        height: 25,
                        borderRadius: 25,
                        marginLeft: 5,
                        marginRight: 5,
                        backgroundColor: c})
                }else{
                    newColorStyles.push(
                        {
                            width: 25,
                            height: 25,
                            borderRadius: 25,
                            borderWidth: 2,
                            borderColor: ThemeColor.PRIMARY,
                            marginLeft: 5,
                            marginRight: 5,
                            backgroundColor: c})
                }
            }

            setColorSelectorStyle(newColorStyles)

            setListItemHead(getItemHeadByCatAndColor(categorySelected!, colorSelected))
        }else{
            setListItemHead([])
        }
    }, [colorSelected])

    // afficher ces listItemHead grâce au map
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

            <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}
                style={{overflow:'scroll'}}>
                <View style={styles.colors}>
                    {
                        listColorsAvailable.map((color,index) => {
                            return (<Pressable onPress={() => {setColorSelected(color)}} key={index} style={colorSelectorStyle[index]} />)
                        })
                    }
                </View>
            </ScrollView>
            
            <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}
                style={{overflow:'scroll'}}>
                <View style={styles.HeadItems}>
                    {
                        listItemHead != undefined &&
                        listItemHead.map((item,index) => {
                            return (<View key={index} style={styles.HeadItem}>
                                <Image style={{width:50, height:50}} source={item.image}/>
                            </View>)
                        })
                    }
                </View>
                
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer:{
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
    },
    colors: {
        flexDirection: 'row',
        marginTop: 10,
        marginLeft: 10,
    },
    color: {
        width: 25,
        height: 25,
        borderRadius: 25,
        marginLeft: 5,
        marginRight: 5,
    },
    HeadItems: {
        marginTop: 10,
        flexDirection: 'row',
        marginLeft: 10,
        marginRight: 10,
    },
    HeadItem: {
        width: 80,
        height: 80,
        marginLeft: 5,
        marginRight: 5,
        backgroundColor: ThemeColor.SECONDARY,
        borderRadius: 10,
        justifyContent:'center',
        alignItems:'center'
    },
  });

export default ProfilEditor