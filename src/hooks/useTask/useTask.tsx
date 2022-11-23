import { useEffect, useState } from 'react';
import { Button, TextInput, StatusBar, Pressable, StyleSheet, Text, View } from 'react-native';
import { Double } from 'react-native/Libraries/Types/CodegenTypes';

const useTask = () => {
    //const [title,setTitle] = useState<string>("hookTxt");
    const [obj, setObj] = useState<Task>({titre : 'titre', etat : false, suppr : false});
    return {
        hookTxt,
        setHookTxt,
        obj
        
    }
}

export default useTask;