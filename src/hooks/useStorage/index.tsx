import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DataTask } from '../../../types/types';

const KEY_TASKS = "storage_tasks"

const useStorage = () => {

    const getTasks = async (): Promise<DataTask[]> =>  {
        // récupère les données sérialisé stockés
        const str_data = await AsyncStorage.getItem(KEY_TASKS)
        if(str_data != null){
            // désérialise en tableau d'objet `DataTask`
            const parsed : DataTask[] = JSON.parse(str_data) 
            if(parsed != undefined){
                return parsed;
            }
        }
        // aucune donnée trouvé
        return [];
    }

    const saveTasks = async (tasks : DataTask[]) => {
        // sérialise les données en json
        const str_tasks = JSON.stringify(tasks)
        // sauvegarde 
        await AsyncStorage.setItem(KEY_TASKS, str_tasks)
    }

    return {
        getTasks,
        saveTasks
    }
}

export default useStorage