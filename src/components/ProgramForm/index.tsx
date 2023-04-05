import React, { useEffect, useState, useRef } from 'react';
import { View, Image, StyleSheet, Text, Pressable, Animated, SafeAreaView, ViewStyle } from "react-native";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { CustomFont, ThemeColor } from '../../../theme';
import { ComboBox, LevelStars } from '../';

type ProgramFormProps = {
    close:() => void,
    finish:() => void,
}

type ComponentContent = {
    title: string
    icon1: any
    title1: string
    icon2: any
    title2: string
    percentage: number
}

const ProgramForm = (props : ProgramFormProps) => {
    const [indexPage,setIndexPage] = useState<number>(0)
    
    const [starValue, setStarValue] = useState<number>(0)

    const [colorStyle, setColorStyle] = useState<ViewStyle[]>([{backgroundColor: ThemeColor.WHITE}, {backgroundColor: ThemeColor.WHITE}])

    const switchColor = (index: number) => {
        if (index == 0) {
            setColorStyle([{backgroundColor: ThemeColor.PRIMARY},{backgroundColor: ThemeColor.WHITE}])
        } else if (index == 1) {
            setColorStyle([{backgroundColor: ThemeColor.WHITE},{backgroundColor: ThemeColor.PRIMARY}])
        } else {
            setColorStyle([{backgroundColor: ThemeColor.WHITE},{backgroundColor: ThemeColor.WHITE}])
        }
    }
    
    const [componentContent, setComponentContent] = useState<ComponentContent[]> (
        [
        {title: "Sommeil", icon1: require("../../assets/ring.png"), title1: "Team Leve tôt", icon2: require("../../assets/time.png"), title2: "Team Leve tard", percentage: 0},
        {title: "Nutrition", icon1: require("../../assets/radis.png"), title1: "Repas Healthy", icon2: require("../../assets/frite.png"), title2: "Repas Gourmant", percentage: 33},
        {title: "Sport", icon1: require("../../assets/sport.png"), title1: "Sportif débutant", icon2: require("../../assets/trophe.png"), title2: "Grand athlète", percentage: 66},
        ])

    const goBack = () => {
        if(indexPage == 0){
            props.close()
        }else{
            switchColor(-1)
            setStarValue(0)
            setIndexPage(indexPage-1)
        }
    }

    const Next = () => {
        if (indexPage == 2) {
            props.finish()
        } else {
            switchColor(-1)
            setStarValue(0)
            setIndexPage(indexPage+1)
        }
    }

    return (
    <View style={styles.mainContainer}>
        <Pressable style={styles.prev} onPress={() => goBack()} >
            <FontAwesome5 name='chevron-left' size={20} />
            <Text style={{paddingLeft: 10, fontSize: 12}}>Retour</Text>
        </Pressable>
        <Text style={styles.Title}>{componentContent[indexPage].title}</Text>
        <View style={styles.containerBar}>
            <View style={[styles.bar,{width: componentContent[indexPage].percentage+ '%',}]} />
        </View>
        <Text style={styles.subTitle}>Vous êtes plutôt</Text>
        <View style={styles.boxContainer}>
            <Pressable style={[styles.box, colorStyle[0]]} onPress={() => switchColor(0)}>
                <View style={styles.boxContent}>
                    <Image style={{width:'40%',height:'65%',resizeMode:'contain'}} source={componentContent[indexPage].icon1} />
                    <Text style={styles.boxText}>{componentContent[indexPage].title1}</Text>
                </View>
            </Pressable>
            <Pressable style={[styles.box, colorStyle[1]]} onPress={() => switchColor(1)}>
                <View style={styles.boxContent}>
                    <Image style={{width:'40%',height:'65%',resizeMode:'contain'}} source={componentContent[indexPage].icon2} />
                    <Text style={styles.boxText}>{componentContent[indexPage].title2}</Text>
                </View>
            </Pressable>
        </View>
        <Text style={styles.subTitle}>Niveau d'intensité</Text>
        <Text style={styles.subText}>L'intensité permet de situer sur une échelle de 1 à 5 à quel point vous souhaitez travailler sur cette catégorie dans vos objectifs.</Text>
        <LevelStars value={starValue} max={5} setValue={(newVal) => {setStarValue(newVal)}} />
        <Text style={styles.subTitle}>Fréquence des rappels</Text>
        <ComboBox elements={[{value:0, title:"jour"}, {value:1, title:"semaine"}, {value:2, title:"mois"}, {value:3, title:"année"}]} setValue={() => {}} />
        <View style={styles.bottomContainer}>
            <Pressable style={[styles.validate, {backgroundColor: true ? ThemeColor.PRIMARY : ThemeColor.PRIMARY_LIGHT, justifyContent: 'center'}]} onPress={() => Next()}>
                <Text style={{textAlign: 'center'}}>confirmer</Text>
            </Pressable>
            <Pressable style={styles.next} onPress={() => Next()}>
                <Text style={{textDecorationLine: 'underline', paddingRight: 10}}>Passer cette étape</Text>
                <FontAwesome5 name='chevron-right' size={20} />
            </Pressable>
        </View>
    </View>
    )}

const styles = StyleSheet.create({
    mainContainer:{
        flex:6,
        backgroundColor: ThemeColor.BACKGROUND,
        marginHorizontal: 20,
    },
    prev: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 20
    },
    Title :{
        marginTop: 8,
        fontSize: 35,
        fontFamily: CustomFont.AUSTER,
    },
    containerBar:{
        width: '95%',
        height:12,
        alignSelf:'stretch',
        backgroundColor:ThemeColor.SECONDARY,
        borderRadius: 15,
        marginTop: 25,
        marginBottom: 20,
    },
    bar:{
        flex:1,
        backgroundColor: ThemeColor.PRIMARY,
        borderRadius: 15
    },
    boxContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        maxHeight: 90
    },
    box: {
        width: '45%',
        height: 80,
        borderWidth: 0,
        borderRadius: 15,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingHorizontal:5,
        shadowColor: ThemeColor.PRIMARY,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,

        elevation: 12,
    },
    boxContent: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        height: 80,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    boxText: {
        fontSize: 15,
        textAlign: 'center',
    },
    subTitle:{
        fontSize : 22,
        marginBottom: 10,
    },
    subText:{
        marginTop: 10,
        fontFamily: CustomFont.PARALUCENT,
        fontSize: 16,
        lineHeight: 26,
    },
    bottomContainer: {
        position :'absolute',
        bottom: 20,
        width: '100%',
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    validate: {
        width:120,
        height: 30,
        borderRadius: 5,
    },
    next: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
})

export default ProgramForm;