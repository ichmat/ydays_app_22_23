import { useEffect, useState } from 'react';
import { Button, TextInput, StatusBar, Pressable, StyleSheet, Text, View } from 'react-native';
import { Double } from 'react-native/Libraries/Types/CodegenTypes';
import { DataTask, SimpleTask, ProgressTask, Frequency } from '../../../types/types';
import uuid from 'react-native-uuid';
import { useStorage } from '../';

const useTasks = () => {
    const {getTasks, saveTasks} = useStorage()
    const [tasks, setTasks] = useState<DataTask[]>([]);
    const [tasksLoaded, setTasksLoaded] = useState<boolean>(false)
    useEffect(() => {
        getTasks().then((value : DataTask[]) => {
            setTasks(value)
            setTasksLoaded(true)
        })
    }, [])

    const createSimpleTask = (title: string, description: string, checked : boolean = false) => {
        const newTask : SimpleTask = new SimpleTask(uuid.v4() as string, title, description, checked, true, Frequency.nowWithDateOnly(), Frequency.nowWithDateOnly())
        const newTasks : DataTask[] = tasks.concat(newTask);
        setTasks(newTasks)
        saveTasks(newTasks)
    };

    const createProgressTask = (title: string, description: string, progress: number = 0, checked : boolean = false) => {
        const newTask : ProgressTask = new ProgressTask(uuid.v4() as string, title, description, checked, progress, true, Frequency.nowWithDateOnly(), Frequency.nowWithDateOnly())
        const newTasks : DataTask[] = tasks.concat(newTask);
        setTasks(newTasks)
        saveTasks(newTasks)
    };

    const updateTask = (task: DataTask) => {
        let modifiable : DataTask[] = tasks;
        const indexTask = modifiable.findIndex(item => item.id == task.id)
        if(indexTask != -1){
            modifiable[indexTask] = task;
            setTasks(modifiable);
            saveTasks(modifiable)
        }
    }

    const removeTask = (task: DataTask) => {
        const newTasks : DataTask[] = tasks.filter(item => item.id != task.id);
        setTasks(newTasks)
        saveTasks(newTasks)
    }

    return {
        tasksLoaded,
        tasks,
        createSimpleTask,
        createProgressTask,
        updateTask,
        removeTask,
    }
}

export default useTasks;