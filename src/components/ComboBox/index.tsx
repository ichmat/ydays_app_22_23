import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ColorValue, Pressable, ViewStyle, TextStyle } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { CustomFont, ThemeColor } from '../../../theme';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

type ComboBoxProps = {
    setValue: (newValue : any) => void,
    elements: ComboElements[],
    defaultValueIndex?: number
}

type ComboElements = {
    value : any,
    title: string,
}

const ComboBox = (props: ComboBoxProps) => {

    const {setValue, elements, defaultValueIndex} = props

    const [selectedValueTitle, setSelectedValueTitle] = useState<string>("")

    const [selectorOpen, setSelectorOpen] = useState<boolean>(false)

    const elementSelected = (index: number) => {
        setSelectedValueTitle(elements[index].title)
        setValue(elements[index].value)
        setSelectorOpen(!selectorOpen)
    }

    useEffect(() => {
        if(defaultValueIndex != undefined){
            if(defaultValueIndex < elements.length){
                setSelectedValueTitle(elements[defaultValueIndex].title)
            }
        }
    }, [defaultValueIndex])

    return (
    <View style={styles.container}>
        <View style={styles.containerValue}>
            <FontAwesome5 onPress={() => {setSelectorOpen(!selectorOpen)}} style={{width:15}} name={selectorOpen ? 'chevron-up' : 'chevron-down'} size={16} />
            <Text style={styles.txtValue}>{selectedValueTitle}</Text>
        </View>
        <View style={[styles.selectors, {display : selectorOpen ? 'flex' : 'none'}]}>
            {
                elements.map((element, index) => {
                    return (
                    <Pressable onPress={() => elementSelected(index)} key={index} style={styles.itemSelector}>
                        <Text style={styles.txtSelector}>{element.title}</Text>
                    </Pressable>)
                })
            }
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    container:{
        height: 40,
        flexDirection:'row',
        border: 1,
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: ThemeColor.WHITE,
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
    containerValue:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-start',
        flex:1
    },
    txtValue:{
        marginLeft: 8,
        fontFamily: CustomFont.PARALUCENT
    },
    selectors:{
        borderRadius: 15,
        position:'absolute',
        bottom: 40,
        width: '100%',
        backgroundColor: ThemeColor.WHITE,
        zIndex: 1000,
        maxHeight: 90,
        overflow: 'scroll'
    },
    itemSelector: {
        paddingVertical:6,
        paddingHorizontal: 20
    },
    txtSelector:{
        fontFamily: CustomFont.PARALUCENT
    },
})

export default ComboBox;