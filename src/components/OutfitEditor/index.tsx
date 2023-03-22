import React, { useEffect } from "react";
import { useState } from "react";
import { View, StyleSheet, Text, ColorValue, Pressable, ViewStyle,Image, TextStyle, ScrollView } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { ThemeColor } from "../../../theme";
import { CATEGORY_BODY, ItemBody } from "../../../types/types";
import { useAvatar } from "../../hooks";

type PropsOutfitEditor = {
    requestClosePage: () => void,
    displayStyle: ViewStyle,
}

const colorButtonSelected = ThemeColor.PRIMARY;

const Categories = [
    {title: "Hauts", catergory : CATEGORY_BODY.TOP},
    {title: "Bas", catergory : CATEGORY_BODY.BOTTOM},
    {title: "Combis", catergory : CATEGORY_BODY.WETSUITS},
    {title: "Chaussure", catergory : CATEGORY_BODY.SHOES}
]

const OutfitEditor = (props : PropsOutfitEditor) => {
    const {getColorsBodyByCat, getItemBodyByCatAndColor} = useAvatar()

    const {requestClosePage, displayStyle} = props
    const [categorySelected,setCategorySelected] = useState<CATEGORY_BODY | undefined>(undefined)
    const [catStyles, setCatStyles] = useState<ViewStyle[]>([styles.catBox,styles.catBox,styles.catBox,styles.catBox])

    const [listColorsAvailable, setListColorsAvailable] = useState<string[]>([])

    const [colorSelected, setColorSelected] = useState<string | undefined>(undefined)
    const [colorSelectorStyle, setColorSelectorStyle] = useState<ViewStyle[]>([])

    const [listItemBody, setListItemBody] = useState<ItemBody[] | undefined>(undefined)

    const [itemStyles, setItemStyles] = useState<ViewStyle[]>([])
    const [selectedItem, setSelectedItem] = useState<number>(-1)

    useEffect(() => {
        if(colorSelected != undefined) {
            setSelectedItem(-1)

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

            setListItemBody(getItemBodyByCatAndColor(categorySelected!, colorSelected))
        }else{
            setListItemBody([])
        }
    }, [colorSelected])

    useEffect(() => {
        if(categorySelected != undefined){
            let newCatStyles : ViewStyle[] = [styles.catBox,styles.catBox,styles.catBox,styles.catBox]
            const newStyle : ViewStyle = {backgroundColor: colorButtonSelected, marginHorizontal: 10, height: 40, width: 100, borderRadius: 10, justifyContent:'center', alignItems:'center'};
            newCatStyles[categorySelected] = newStyle
            setCatStyles(newCatStyles)
            const colors: string[] = getColorsBodyByCat(categorySelected)
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
        if(listItemBody != undefined){
            const styles : ViewStyle[] = []
            for (let index = 0; index <= listItemBody?.length; index++) {
                if(index != selectedItem){
                    styles.push({})
                }else{
                    styles.push({backgroundColor: ThemeColor.SECONDARY})
                }
            }
            setItemStyles(styles)
        }
    },[selectedItem])

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
                <View style={styles.BodyItems}>
                    {
                        listItemBody != undefined &&
                        listItemBody.map((item,index) => {
                            return (
                            <Pressable onPress={() => setSelectedItem(index)} key={index} style={[styles.BodyItem, itemStyles[index]]}>
                                <Image style={{width:'90%',height:'90%',resizeMode:'contain'}} source={item.image}/>
                            </Pressable>)
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
        marginHorizontal: 10,
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
    BodyItems: {
        marginTop: 10,
        flexDirection: 'row',
        marginLeft: 10,
        marginRight: 10,
    },
    BodyItem: {
        width: 80,
        height: 80,
        marginLeft: 5,
        marginRight: 5,
        backgroundColor: ThemeColor.WHITE,
        borderRadius: 10,
        justifyContent:'center',
        alignItems:'center',

        shadowColor: ThemeColor.SECONDARY,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.9,
        shadowRadius: 9,
        
        elevation: 20,
    },
  });

export default OutfitEditor