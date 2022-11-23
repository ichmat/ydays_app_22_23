# React native
```bash
// changer de version node :
nvm install 18 // ou autre pour autre version
```
## Fonctions de bases

**Syntaxe fonction**

```TypeScript
const funct = () => {
    
}
```

**Syntaxe useEffect**

```TypeScript
useEffect(() => {
    /**  */
},[/** les dépendances */])

// EXEMPLES : 

useEffect(() => {
    /**  */
},[text,compteur])

useEffect(() => {
    /** se lance une seule fois */
},[])

useEffect(() => {
    /** se lance tout le temps */
})

```

**Syntaxe useState**

```TypeScript
const [/*variable*/,/*fonction de modification*/] = useState</*Type*/>(/*Valeur par défaut*/);

// EXEMPLES : 

const [text,setText] = useState<string>("rien");

setText("nouveau") // fonction de modif
```

**afficher un tableau d'élément**

```TypeScript
const persons = [
  {
	id: "1",
	name: "Earnest Green",
  },
  {
	id: "2",
	name: "Winston Orn",
  },
  {
	id: "3",
	name: "Carlton Collins",
  },
]

export default function App() {
  return (
    <View style={styles.container}>
      {persons.map((person) => {
        return (
          <View>
            <Text style={styles.item}>{person.name}</Text>
          </View>
        );
      })}
    </View>
  );
}
```

## Architecture

### Pages

*localisation :* `/src/pages`

```TypeScript
const Page = (/** paramètres */) => {
    return (
        /** la vue de la page */
    );
}
/** export obligatoire pour récupérer la page*/
export default Page
```

***Exemple :***

```TypeScript
/** les imports */
import { useEffect, useState } from 'react';
import { Button, TextInput, StatusBar, Pressable, StyleSheet, Text, View } from 'react-native';
const Page = (/** paramètres */) => {
    /** la vue de la page */
    return (
        <View>
        
        </View>
    );
}

const styles = StyleSheet.create({
     /** style ici */
});
  
export default Page
```

### Hooks

*localisation :* `/src/hooks`

```TypeScript
const useHook = () => {
    /** code */
    
    return {
        /** Les éléments retournés*/
    }
}

export default useHook;
```

***Exemple :***

```TypeScript
const useTest = () => {
    const [hookTxt,setHookTxt] = useState<string>();
    const [obj, setObj] = useState<MonObject>({var : 'etes', test : 1});

    useEffect(()=> {
        setHookTxt("hookTxt");
    },[])

    return {
        hookTxt,
        setHookTxt,
        obj
    }
}

export default useTest;
```