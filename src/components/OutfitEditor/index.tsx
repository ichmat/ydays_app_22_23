import React, { useEffect } from "react";
import { useState } from "react";
import { View, StyleSheet, Text, ColorValue, Pressable, ViewStyle, TextStyle } from "react-native";
import { ThemeColor } from "../../../theme";

type PropsOutfitEditor = {
    requestClosePage: () => void,
    displayStyle: ViewStyle,
}

const OutfitEditor = (props : PropsOutfitEditor) => {
    const {requestClosePage, displayStyle} = props

    return (
    <View style={[styles.mainContainer,displayStyle]}>

    </View>
    )
}

const styles = StyleSheet.create({
    mainContainer:{
        backgroundColor: '#FF0000',
        flexDirection: 'column',
        flex: 1
    },
  });

export default OutfitEditor