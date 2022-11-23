import { useEffect, useState } from 'react';
import { Button, TextInput, StatusBar, Pressable, StyleSheet, Text, View } from 'react-native';
import { Double } from 'react-native/Libraries/Types/CodegenTypes';
import { useTest } from '../../hooks';
import { Task } from '../../components'
const Home = ({ navigation }: any) => {
  const [text, onChangeText] = useState("Useless Text");
  const { hookTxt, setHookTxt, obj } = useTest();
  
  const [isShow, setIsShow] = useState<boolean>(false);

  return (
    <View style={styles.container}>
        <TextInput
            onChangeText={setHookTxt}
            value={hookTxt}
        />
        <Pressable onPress={() => {setIsShow(true)}}>créer tache</Pressable>
        
        {isShow && (
          <View>{hookTxt}</View>
        )}
        
        <Task duText='du text' unNombre={1} />
        <Text>{obj.var}</Text>
        
    </View>
  );
}
/**<Pressable onPress={() => <TextInput onChangeText={}></TextInput>} > </Pressable> */
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