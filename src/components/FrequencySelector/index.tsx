import React, { useEffect } from "react";
import { useState } from "react";
import { View, StyleSheet, Text, ColorValue, Pressable, ViewStyle, TextStyle } from "react-native";
import { Frequency, FrequencyEvery, WEEKDAY } from "../../../types/types";
import DropDownPicker from 'react-native-dropdown-picker';
import { Pressable as PressMaterial, TextInput as TxtInMaterial, Text as TxtMaterial } from '@react-native-material/core';
import { ThemeColor } from "../../../theme";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from "@mui/material/FormControl";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import 'dayjs/locale/fr';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import TextField from "@mui/material/TextField";

enum SelectedEnd {
    ENDDATE = 0,
    OCCURENCE = 1
}

type PropsFrequencySelector = {
    changeFrequency: (frequencies : Frequency[]) => void,
}

const locales = ['en', 'fr'] as const;

const FrequencySelector = (props: PropsFrequencySelector) => {

    //#region PROPS

    //#region DROPDOWN&OCCURENCE

    // état d'ouverture de la `DropDownPicker`
    const [dropDownOpen, setDropDownOpen] = useState<boolean>(false);
    // l'état de répétition sélectionné
    const [dropDownSelected, setDropDownSelected] = useState<FrequencyEvery>(FrequencyEvery.DAY);
    // la listes des éléments sélectionnable du `DropDownPicker`
    const [dropDownItems, setDropDownItems] = useState([
        {label: 'Pas de répétition', value: FrequencyEvery.NULL},
        {label: 'Tous les X jour', value: FrequencyEvery.DAY},
        {label: 'Toutes les X semaines', value: FrequencyEvery.WEEK},
        {label: 'Tous les X mois', value: FrequencyEvery.MONTH},
        {label: 'Tous les X année', value: FrequencyEvery.YEAR},
      ])
    // occurence (en string pour qui puisse être modifiable)
    const [occurence, setOccurence] = useState<string>("")
    // visibilité de la `TextInput` pour l'occurence
    const [occurenceEditable, setOccurenceEditable] = useState<boolean>(true)
    // change l'opacité du `TextInput` pour l'occurence
    const [occurenceOpacity, setOccurenceOpacity] = useState<ViewStyle>({opacity: 1})
    
    //#endregion

    //#region WEEKDAY

    // la visibilité du container `weekDay` ("Appliquer le : ")
    const [weekDayVisible, setWeekDayVisible] = useState<boolean>(false)
    // les jours de la semaine sélectionné
    const [weekDaySelected, setWeekDaySelected] = useState<WEEKDAY[]>([])
    // les styles des boutons, classés par ordre (du Lundi jusqu'au Dimanche)
    const [buttonWeekStyle,setButtonWeekStyle] = useState<ViewStyle[]>([styles.buttonWeek, styles.buttonWeek, styles.buttonWeek, styles.buttonWeek, styles.buttonWeek, styles.buttonWeek, styles.buttonWeek])
    // les styles du text des boutons, classés par ordre (du Lundi jusqu'au Dimanche)
    const [txtButtonWeekStyle,setTxtButtonWeekStyle] = useState<TextStyle[]>([styles.buttonWeekTxt, styles.buttonWeekTxt, styles.buttonWeekTxt, styles.buttonWeekTxt, styles.buttonWeekTxt, styles.buttonWeekTxt, styles.buttonWeekTxt])

    //#endregion

    //#region END

    // la visibilité du container `end` ("se termine : ")
    const [endVisible, setEndVisible] = useState<boolean>(false)
    // le type d'entré de fin selectionné (entré une date de fin, un nombre de )
    const [selectedTypeEnd, setSelectedTypeEnd] = useState<SelectedEnd>(SelectedEnd.OCCURENCE)
    // date de fin de la répétition
    const [dateValueEnd, setDateValueEnd] = React.useState<Dayjs | null>(
        dayjs(new Date(Date.now())),
      );
    // langue du selecteur de date
    const [locale, setLocale] = useState<typeof locales[number]>('fr');
    const [nbTaskToCreate, setNbTaskToCreate] = useState<string>()
    

    //#endregion

    //#endregion
    
    const onChangeOccurenceText = (text: string) => {
        // on ne souhaite que des nombre
        setOccurence(text.replace(/[^0-9]/g, ''))
    }

    const onChangeNbTaskText = (text: string) => {
        setNbTaskToCreate(text.replace(/[^0-9]/g, ''))
    }

    // ajoute ou enlève le jour de la semaine séléctionné
    const addOrRemoveDay = (weekday : WEEKDAY) => {
        const indexFound : number = weekDaySelected.findIndex(x => x == weekday)
        if(indexFound != -1){
            // élément déjà existant, on le retire
            setWeekDaySelected(weekDaySelected.filter((val, index) => index != indexFound))
        }else{
            // élément non existant, on l'ajoute
            setWeekDaySelected(weekDaySelected.concat(weekday))
        }
    }
    
    // à chaque fois que la fréquence a été modifier
    useEffect(() => {
        switch(dropDownSelected){
            case FrequencyEvery.NULL:
                setOccurenceEditable(false)
                setWeekDayVisible(false)
                setEndVisible(false)
                break;
            case FrequencyEvery.DAY:
                setOccurenceEditable(true)
                setWeekDayVisible(false)
                setEndVisible(true)
                break;
            case FrequencyEvery.WEEK:
                setOccurenceEditable(true)
                setWeekDayVisible(true)
                setEndVisible(true)
                break;
            case FrequencyEvery.MONTH:
                setOccurenceEditable(true)
                setWeekDayVisible(false)
                setEndVisible(true)
                break;
            case FrequencyEvery.YEAR:
                setOccurenceEditable(true)
                setWeekDayVisible(false)
                setEndVisible(true)
                break;
        }
    }, [dropDownSelected]) 

    // changer le style des boutons et des textes en cas de sélection
    useEffect(() => {
        const styleButtons: ViewStyle[] = [styles.buttonWeek, styles.buttonWeek, styles.buttonWeek, styles.buttonWeek, styles.buttonWeek, styles.buttonWeek, styles.buttonWeek]
        const styleTextButtons : TextStyle[] = [styles.buttonWeekTxt, styles.buttonWeekTxt, styles.buttonWeekTxt, styles.buttonWeekTxt, styles.buttonWeekTxt, styles.buttonWeekTxt, styles.buttonWeekTxt]
        for (let index = 0; index < weekDaySelected.length; index++) {
            const weekday : number = weekDaySelected[index];
            styleButtons[weekday] = styles.buttonWeekSelected
            styleTextButtons[weekday] = styles.buttonWeekTxtSelected
        }
        setTxtButtonWeekStyle(styleTextButtons)
        setButtonWeekStyle(styleButtons)
    }, [weekDaySelected])

    // change le style de la `TextInput` de l'occurence
    useEffect(() => {
        if(occurenceEditable){
            // éclaircir l'input s'il est activé
            setOccurenceOpacity({opacity: 1})
        }else{
            // griser l'input s'il est désactivé
            setOccurenceOpacity({opacity: 0.6})
        }
    }, [occurenceEditable])

    return (
        <View style={styles.container}>

            <Text style={styles.containerLibelleOccurence}>
                Fréquence de répétition : 
            </Text>

            <View style={styles.containerOccurence}>

                <TxtInMaterial
                    editable={occurenceEditable}
                    inputContainerStyle={[styles.occurenceInput, occurenceOpacity]}
                    inputStyle={[styles.occurenceInput, occurenceOpacity]}
                    style={[styles.occurenceInput, occurenceOpacity]}
                    label="Répéter"
                    value={occurence}
                    onChangeText={onChangeOccurenceText}
                    variant='outlined'
                    />

                <DropDownPicker
                    style={styles.dropdown}
                    open={dropDownOpen}
                    value={dropDownSelected}
                    items={dropDownItems}
                    setOpen={setDropDownOpen}
                    setValue={setDropDownSelected}
                    setItems={setDropDownItems}
                    containerStyle={styles.dropdown}
                    dropDownContainerStyle={styles.dropdownBox}
                />
            </View>

            <View style={[styles.containerLibelleDayWeek, weekDayVisible ? {display:"flex"} :  {display:"none"}]}>
                <Text style={{ alignSelf:'flex-start'}}>
                    Appliquer le : 
                </Text>
            </View>
            
            <View style={[styles.containerDayWeek, weekDayVisible ? {display:"flex"} :  {display:"none"}]}>

                <Pressable style={buttonWeekStyle[0]} onPress={() => {addOrRemoveDay(WEEKDAY.MONDAY)}}>
                    <Text style={txtButtonWeekStyle[0]}>Lun</Text>
                </Pressable>
                <Pressable style={buttonWeekStyle[1]} onPress={() => {addOrRemoveDay(WEEKDAY.THUESDAY)}}>
                    <Text style={txtButtonWeekStyle[1]}>Mar</Text>
                </Pressable>
                <Pressable style={buttonWeekStyle[2]} onPress={() => {addOrRemoveDay(WEEKDAY.WEDNESDAY)}}>
                    <Text style={txtButtonWeekStyle[2]}>Mer</Text>
                </Pressable>
                <Pressable style={buttonWeekStyle[3]} onPress={() => {addOrRemoveDay(WEEKDAY.THURSDAY)}}>
                    <Text style={txtButtonWeekStyle[3]}>Jeu</Text>
                </Pressable>
                <Pressable style={buttonWeekStyle[4]} onPress={() => {addOrRemoveDay(WEEKDAY.FRIDAY)}}>
                    <Text style={txtButtonWeekStyle[4]}>Ven</Text>
                </Pressable>
                <Pressable style={buttonWeekStyle[5]} onPress={() => {addOrRemoveDay(WEEKDAY.SATURDAY)}}>
                    <Text style={txtButtonWeekStyle[5]}>Sam</Text>
                </Pressable>
                <Pressable style={buttonWeekStyle[6]} onPress={() => {addOrRemoveDay(WEEKDAY.SUNDAY)}}>
                    <Text style={txtButtonWeekStyle[6]}>Dim</Text>
                </Pressable>
            </View>

            <View style={[styles.containerLibelleEnd, endVisible ? {display:"flex"} :  {display:"none"}]}>
                <Text style={{ alignSelf:'flex-start'}}>
                    Se termine : 
                </Text>
            </View>

            <View style={[styles.containerEnd, endVisible ? {display:"flex"} :  {display:"none"}]}>
                <RadioGroup
                row
                style={{marginBottom:8}}
                value={selectedTypeEnd}
                onChange={(event, value) => {setSelectedTypeEnd(Number(value))}}>
                    <FormControlLabel  
                        label={'Date Fin'}
                        value={SelectedEnd.ENDDATE}
                        control={<Radio />}
                    />
                    <FormControlLabel 
                        label={'Occurence'}
                        value={SelectedEnd.OCCURENCE}
                        control={<Radio />}
                    />
                </RadioGroup>

                <View style={selectedTypeEnd == SelectedEnd.ENDDATE ? {display:"flex"} :  {display:"none"}}>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
                        <MobileDatePicker
                            label="Date Fin"
                            inputFormat="DD/MM/YYYY"
                            value={dateValueEnd}
                            onChange={setDateValueEnd}
                            renderInput={(params) => <TextField required {...params} />}
                            />
                    </LocalizationProvider>
                </View>

                <View style={selectedTypeEnd == SelectedEnd.OCCURENCE ? {display:"flex"} :  {display:"none"}}>
                    <TextField value={nbTaskToCreate} onChange={(event) => onChangeNbTaskText(event.target.value)} required label="Nombre de tâche" variant="outlined" />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:2,
        alignSelf:'stretch',
        alignItems:'stretch',
        justifyContent:'center',
        flexDirection: 'column',
        padding: 5,
        overflow:'scroll'
    },
    containerLibelleOccurence:{
        marginBottom:8, 
        alignSelf:'flex-start'
    },
    containerOccurence:{
        flexDirection: 'row',
        justifyContent:'center',
    },
    containerLibelleDayWeek:{
        borderColor: ThemeColor.PRIMARY_LIGHT,
        borderTopWidth: 2,
        marginTop: 8,
        paddingTop: 8,
        paddingBottom: 8,
        zIndex: -10
    },
    containerDayWeek:{
        marginBottom: 8,
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'space-between',
        zIndex: -10
    },
    containerLibelleEnd : {
        borderColor: ThemeColor.PRIMARY_LIGHT,
        borderTopWidth: 2,
        marginTop: 8,
        paddingTop: 8,
        paddingBottom: 8,
        zIndex: -10
    },
    containerEnd:{
        flexDirection: 'column',
        justifyContent:'center',
        alignItems:'center',
        zIndex: -10
    },
    dropdown: {
        width:190,
        height: 56,
        borderColor: "#949494", // TODO
        backgroundColor:'transparent',
        borderRadius: 5,
    },
    dropdownBox:{
        borderColor: "#949494", // TODO
        backgroundColor: '#ffffff',
        borderRadius: 5,
        zIndex: 100,
        maxHeight: 224
    },
    occurenceInput:{
        width: 100,
        marginRight: 5,
        backgroundColor:'transparent'
    },
    buttonWeekSelected:{
        borderRadius: 50, 
        backgroundColor: ThemeColor.PRIMARY_SHADE, 
        width: 35, 
        height:35,
        justifyContent:'center',
        alignItems:'center',
        margin: 2,

        // box shadow
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8,
    },
    buttonWeek:{ 
        borderRadius: 50, 
        backgroundColor: "#00000000", 
        borderWidth: 2,
        borderColor: ThemeColor.PRIMARY_SHADE,
        width: 35, 
        height:35,
        justifyContent:'center',
        alignItems:'center',
        margin: 2,

        // box shadow
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8,
    },
    buttonWeekTxtSelected: {
        color: ThemeColor.WHITE,
        fontWeight: 'bold',
    },
    buttonWeekTxt: {
        color: ThemeColor.PRIMARY_SHADE,
        fontWeight: 'bold',
    }
})

export default FrequencySelector