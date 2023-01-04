import { useEffect, useState } from 'react';
import { Button, TextInput, StatusBar, Pressable, StyleSheet, Text, View } from 'react-native';
import { Double } from 'react-native/Libraries/Types/CodegenTypes';
import { DataTask } from '../../../types/types';

const useTasks = () => {
    const [tasks, setTasks] = useState<DataTask[]>([]);

    const createTask = (newTask : DataTask) => {
        setTasks(tasks.concat(newTask))
    };

    const updateTask = (task: DataTask) => {
    }

    const removeTask = (task: DataTask) => {
        setTasks(tasks.filter(item => item.titre != task.titre && item.description != task.description && item.isFinished != task.isFinished))
    }

    return {
        tasks,
        createTask,
        updateTask,
        removeTask,
    }
}

export default useTasks;