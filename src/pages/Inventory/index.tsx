import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { ThemeColor } from '../../../theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Inventaire = [
    {titre: "titre1", description: "Lorem Ipsum"},
    {titre: "titre2", description: "Lorem Ipsum"},
    {titre: "titre3", description: "Lorem Ipsum"},
    {titre: "titre4", description: "Lorem Ipsum"},
    {titre: "titre5", description: "Lorem Ipsum"},
    {titre: "titre6", description: "Lorem Ipsum"},
    {titre: "titre7", description: "Lorem Ipsum"},
    {titre: "titre8", description: "Lorem Ipsum"},
    {titre: "titre9", description: "Lorem Ipsum"},
    {titre: "titre10", description: "Lorem Ipsum"},
    {titre: "titre11", description: "Lorem Ipsum"},
    {titre: "titre12", description: "Lorem Ipsum"},
    {titre: "titre13", description: "Lorem Ipsum"},
    {titre: "titre14", description: "Lorem Ipsum"},
    {titre: "titre15", description: "Lorem Ipsum"},
    {titre: "titre16", description: "Lorem Ipsum"},
    {titre: "titre17", description: "Lorem Ipsum"},
    {titre: "titre18", description: "Lorem Ipsum"},
    {titre: "titre19", description: "Lorem Ipsum"},
    {titre: "titre20", description: "Lorem Ipsum"},
    {titre: "titre21", description: "Lorem Ipsum"},
    {titre: "titre22", description: "Lorem Ipsum"},
    {titre: "titre23", description: "Lorem Ipsum"},
]

const Inventory = (InventoryProps: any) => {

    const navigate = (to: string) => {
        //navTabUpdate(to)
        InventoryProps.navigation.navigate(to)
      }

    return (
        
        <View style={styles.container}>
            <View  style={styles.containerInventory}>
            {
                Inventaire.map((value,index) => {
                    return (
                        <View key={index} style={styles.box}>
                            <View style={styles.boxLogo} >
                                <FontAwesome name='image' size={40} />
                            </View>
                            <Text style={styles.boxTitre}>
                                {value.titre}
                            </Text>
                        </View>
                    )
                })
            }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:6,
        overflow:'hidden',
        backgroundColor:ThemeColor.BACKGROUND
    },
    containerInventory:{
        flex:1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignContent: 'flex-start',
        overflow:'scroll',
        justifyContent: 'space-evenly',
        
    },
    boxTitre:{
        backgroundColor: ThemeColor.PRIMARY_THIN,
        borderBottomEndRadius: 50,
        borderBottomLeftRadius: 50,
        textAlign: 'center',
    },
    boxLogo:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    box: {
        width: 100,
        height: 90,
        margin: 5,
        //marginBottom:25,
        //border: 5,
        //backgroundColor: ThemeColor.PRIMARY_SHADE,
        borderTopEndRadius: 20,
        borderBottomEndRadius: 20,
        borderBottomLeftRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,

        elevation: 9,
    },

  
})

export default Inventory