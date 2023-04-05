import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ColorValue, Pressable, ViewStyle, TextStyle } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ThemeColor } from '../../../theme';

type LevelStarsProps = {
    max: number,
    value: number,
    setValue: (newValue : number) => void
}

const LevelStars = (props: LevelStarsProps) => {
    const {max, value, setValue} = props;
    const [stars, setStars] = useState<boolean[]>([]);

    useEffect(() => {
        const arr_stars : boolean[] = []
        for (let index = 0; index < max; index++) {
            arr_stars.push(value > index)
        }
        setStars(arr_stars)
    }, [max, value])

    return (
        <View style={styles.container}>
            {
                stars.map((val, index) => {
                    if(val)
                        return <AntDesign key={index} onPress={() => {setValue(index+1)}} size={40} color={ThemeColor.PRIMARY} name='star' />
                    else 
                        return <AntDesign key={index} onPress={() => {setValue(index+1)}} size={40} color={ThemeColor.PRIMARY_LIGHT} name='star' />
                })
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        height: 60,
        width: '100%',
        flexDirection:'row',
        justifyContent:'space-between'
    }
})

export default LevelStars;
