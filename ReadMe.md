# React native

// nvm install 14

**Syntaxe component**

```TypeScript
import React from "react";

// change `componentName` by the name of your component
const componentName = (props: PropsComponentName) => {
    // code

    return(
        <View>
            // view
        </View>
    )
}

const styles = StyleSheet.create({
    // just an example
    container: {
        backgroundColor: '#585858',
        padding:5,
        height:50,
        minWidth:200,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderWidth: 0,
        marginBottom:2
    }
    // style
});

// exportation
export default componentName

```

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

const [/*Nom de la variable*/,/*Nom de la fonction de modification*/] = useState</* Type */>(/* Valeur par défaut */);

// EXEMPLES : 

const [text,setText] = useState<string>("rien");

setText("nouveau") // fonction de modif
```

**Parcourir un tableau d'élément dans un return**

```TypeScript
// un exemple de tableau
const array = [
    {titre:'monTitre1', description: 'monDescription1'},
    {titre:'monTitre2', description: 'monDescription2'},
    {titre:'monTitre3', description: 'monDescription3'},
    ]

const Page = () => {
    // code

    return (
        <View>
        {
            array.map((value,index) => {
                // affichage des éléments
                return (
                    <View key={index}>
                        <Text>{value.titre}</Text>
                        <Text>{value.description}</Text>
                    </View>
                )
                // à l'utilisation d'une map, il faut toujours préciser une clé `key`. Par défaut, la fonction map possède en deuxième argument l'index de chaque élément.
            })
        }
        
        </View>
    )
}
```

**ajouter une icone**

