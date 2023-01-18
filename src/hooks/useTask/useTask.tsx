import { useEffect, useState } from 'react';
import { Button, TextInput, StatusBar, Pressable, StyleSheet, Text, View } from 'react-native';
import { Double } from 'react-native/Libraries/Types/CodegenTypes';
import { DataTask } from '../../../types/types';
import uuid from 'react-native-uuid';

const useTask = () => {
    //const [title,setTitle] = useState<string>("hookTxt");
    const [tasks, setTasks] = useState<DataTask[]>([{id:uuid.v4() as string, titre:'test',etat:false}]);

    const createTask = (titreTache : string, etatTache : boolean) => {
        const task : DataTask = {id: uuid.v4() as string ,titre: titreTache, etat: etatTache}
        const newTab : DataTask[] = tasks.concat(task)
        setTasks(newTab)
    }

    const modifTask = (newName : string, task : DataTask) => {
        let modifiableArray : DataTask[] = tasks;
        const idOfTaskToModif = modifiableArray.findIndex(item => item.id == task.id)
        if(idOfTaskToModif != -1){
            modifiableArray[idOfTaskToModif].titre = newName
            setTasks(modifiableArray)
        }
    }

    const supprTask = (task : DataTask) => {
        let newTab : DataTask[] = tasks.filter(item => item.id != task.id)
        setTasks(newTab)
    }

    const changeState = (task: DataTask, newState : boolean) => {
        let newStateData : DataTask[] = tasks;
        const idOfTaskToModif = newStateData.findIndex(item => item.id == task.id)
        if(idOfTaskToModif != -1){
            newStateData[idOfTaskToModif].etat = newState
            setTasks(newStateData)
        }
    }

    // Modifier un element
    // etat faux à vrai |   c ok
    // changer le titre

    // Supprimer un élément | c ok
    // tasks.filter(item => item.titre != task.titre && item.etat != task.etat)



    return {
        tasks,
        createTask,
        modifTask,
        changeState,
        supprTask
    }
}

export default useTask;