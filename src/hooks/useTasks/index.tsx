import { useEffect, useState } from 'react';
import { Button, TextInput, StatusBar, Pressable, StyleSheet, Text, View } from 'react-native';
import { Double } from 'react-native/Libraries/Types/CodegenTypes';
import { DataTask } from '../../../types/types';
import uuid from 'react-native-uuid';
import useStorage from '../useStorage';

const useTasks = () => {
    const {getTasks, saveTasks} = useStorage()
    const [tasks, setTasks] = useState<DataTask[]>([{id: uuid.v4() as string,titre: "title", description: "description", isFinished: false}]);
    const [tasksLoaded, setTasksLoaded] = useState<boolean>(false)
    useEffect(() => {
        getTasks().then((value : DataTask[]) => {
            setTasks(value)
            setTasksLoaded(true)
        })
    }, [])

    const createTask = (title: string, description: string, checked : boolean = false) => {
        const newTask : DataTask = {id: uuid.v4() as string, titre: title, description: description, isFinished: checked} 
        const newTasks : DataTask[] =tasks.concat(newTask);
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
        createTask,
        updateTask,
        removeTask,
    }
}

export default useTasks;