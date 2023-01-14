import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DataTask } from '../../../types/types';

const KEY_TASKS = "storage_tasks"

const useStorage = () => {

    const getTasks = async (): Promise<DataTask[]> =>  {
        const str_data = await AsyncStorage.getItem(KEY_TASKS)
        if(str_data != null){
            const parsed : DataTask[] = JSON.parse(str_data) 
            if(parsed != undefined){
                return parsed;
            }
        }
        return [];
    }

    const saveTasks = async (tasks : DataTask[]) => {
        const str_tasks = JSON.stringify(tasks)
        await AsyncStorage.setItem(KEY_TASKS, str_tasks)
    }

    return {
        getTasks,
        saveTasks
    }
}

export default useStorage