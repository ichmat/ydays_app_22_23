import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, Pressable } from 'react-native';
import { CustomFont, ThemeColor } from '../../../theme';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { height } from '@mui/system';
import { Row } from 'native-base';
import { ProgramForm } from '../../components';
import { convertRemToAbsolute } from 'native-base/lib/typescript/theme/tools';

const Program = (ProgramProps: any) => {

    const [programStep, setProgramStep] = useState<number>(0)
    // CustomFont.AUSTER
    // CustomFont.PARALUCENT
    // CustomFont.PARALUCENT_DEMIBOLD
    // ThemeColor.PRIMARY

    // button : 
    return (
    <View style={styles.mainContainer}>
        {
            programStep == 0 && (
                <View>
                    <Text style={styles.Title} >Programme perso</Text>
                    <View style={styles.second}>
                        <Pressable style={styles.boxContainer} onPress={() => {setProgramStep(1)}} >
                            <Image style={{width: 60, height: 60, resizeMode:'contain'}} source={require("../../assets/badge.png")} />
                            <View style={styles.textContainer}>
                            <Text style={styles.Text}>Remplissez notre formulaire pour débuter notre programme perso</Text>
                            <Text style={styles.blueText}>Durée 2min</Text>
                            </View>
                            <FontAwesome5 name='chevron-right' size={30} />
                        </Pressable>
                        <Text style={styles.petitTexte}>
                            Le questionnaire permet Eveil de mieux vous comprendre et de proposer des tâches personnalisés en fonction de vos objectifs.
                        </Text> 
                    </View>
                </View>
            )
        }
        

        {
            programStep == 1 && (
                <ProgramForm finish={() => {setProgramStep(2)}} close={() => {setProgramStep(0)}} />
            )
        }

        {
            programStep == 2 && (
                <View style={styles.endContainer}>
                    <Text style={{fontSize: 35, fontFamily: CustomFont.PARALUCENT, fontWeight: 'bold'}}>Bravo votre profil est configuré !</Text>
                    <Pressable style={styles.endButton}><Text style={{textAlign : 'center', color: ThemeColor.WHITE, fontFamily: CustomFont.PARALUCENT, fontSize: 15}} onPress={() => ProgramProps.route.params.navTabUpdate("Tasks") }>Découvre tes Taches !</Text></Pressable>
                    <Image style={{width: '90%', height: '70%', resizeMode:'contain', position: 'absolute', bottom: -75}} source={require("../../assets/guy.png")} />
                    <Image style={{width: 100, height: 100, resizeMode:'contain', position: 'absolute', transform: [{ rotate: '20deg'}] , right: 0,  bottom: '60%'}} source={require("../../assets/bigtime.png")} />
                    <Image style={{width: 95, height: 95, resizeMode:'contain', position: 'absolute', transform: [{ rotate: '20deg'}],  right: -20,  bottom: '15%'}} source={require("../../assets/bigtrophe.png")} />
                    <Image style={{width: 120, height: 120, resizeMode:'contain', position: 'absolute', transform: [{ rotate: '340deg'}],  left: -15,  bottom: '18%'}} source={require("../../assets/bigradis.png")} />
                </View>
            )
        }
    </View>)
}

export default Program

const styles = StyleSheet.create({
    mainContainer:{
        flex:6,
        
        backgroundColor: ThemeColor.BACKGROUND
    },
    Title :{
       marginTop: 40,
        marginLeft: 20,
        fontSize: 35,
        fontFamily: CustomFont.AUSTER,
    },
    second: {
        flex: 1,
        alignItems: 'center',
    },
    boxContainer: {
        padding: 14,
        marginTop: 40,
        width: '90%',
        height: 200,
        flex: 1,
        flexDirection: 'row',
        borderWidth: 0,
        backgroundColor: ThemeColor.WHITE,
        borderRadius: 15,
        maxHeight: 200,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    textContainer: {
        flex: 1,
        flexDirection: 'column',
        paddingLeft: 20,
    },
    Text:{
        fontFamily: CustomFont.PARALUCENT,
        fontSize : 20,
        lineHeight : 26,
        fontWeight: 'bold',
        
    },
    blueText:{
        fontFamily: CustomFont.PARALUCENT,
        paddingTop: 10,
        color: ThemeColor.PRIMARY,
    },
    petitTexte :{
        fontFamily: CustomFont.PARALUCENT,
        fontSize: 15,
        width: '90%',
        paddingTop : 20,
    },
    endContainer: {
        flex: 1,
        paddingHorizontal: 30,
        paddingTop: 40
    },
    endButton: {
        alignItems: 'center',
        justifyContent: 'center', 
        marginTop: 20,
        width: '60%',
        height: 40,
        borderWidth: 0,
        borderRadius: 15,
        backgroundColor: ThemeColor.BLACK,
    }
})