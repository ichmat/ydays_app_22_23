# React native

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