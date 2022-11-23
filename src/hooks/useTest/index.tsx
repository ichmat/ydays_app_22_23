import { useEffect, useState } from 'react';
import { Button, TextInput, StatusBar, Pressable, StyleSheet, Text, View } from 'react-native';
import { Double } from 'react-native/Libraries/Types/CodegenTypes';
import { MonObject } from '../../../types/types';

const useTest = () => {
    const [hookTxt,setHookTxt] = useState<string>("hookTxt");
    const [obj, setObj] = useState<MonObject>({var : 'etes', test : 1});
    return {
        hookTxt,
        setHookTxt,
        obj
    }
}

export default useTest;