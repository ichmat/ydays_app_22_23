import React, { useEffect } from "react";
import { useState } from "react";
import { View, StyleSheet, Text, ColorValue } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import { TypeTask } from "../../../types/types";

type PropsTypeTaskSelector = {
    changeSelection : (type: TypeTask) => void
}

const TypeTaskSelector = (props : PropsTypeTaskSelector) => {
    const [open, setOpen] = useState<boolean>(false);
    const [value, setValue] = useState<TypeTask>(TypeTask.Simple);
    const [items, setItems] = useState([
        {label: 'Simple', value: TypeTask.Simple},
        {label: 'Progression', value: TypeTask.Progress}
      ]);

    useEffect(() => {
        props.changeSelection(value)
    }, [value])

    return (
        <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
        />
    )
}

export default TypeTaskSelector