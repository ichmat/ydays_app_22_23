import { useEffect, useState } from 'react';
import { Button, TextInput, StatusBar, Pressable, StyleSheet, Text, View } from 'react-native';
import { Double } from 'react-native/Libraries/Types/CodegenTypes';
import { useTest } from '../../hooks';
import { Task } from '../../components'
const Home = ({ navigation }: any) => {
  const [text, onChangeText] = useState("Useless Text");

 const { hookTxt, setHookTxt, obj } = useTest();

  return (
    <View style={styles.container}>
        <TextInput
            onChangeText={setHookTxt}
            value={hookTxt}
        />
        <Text style={{borderWidth:1, textAlign:'center'}}>Resultat : {text}</Text>
        <Task />
        <Text>{obj.var}</Text>

        <Pressable onPress={() => { navigation.push('Tasks') }} >
            <Text>Mes tâches</Text>
        </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      marginTop: 50, 
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
      /** style ici */
    }
  });
  

export default Home