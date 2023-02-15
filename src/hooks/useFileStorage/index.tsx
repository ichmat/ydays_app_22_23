import { useEffect, useState } from 'react';
import RNFS, { ReadDirItem } from 'react-native-fs'
import { PermissionsAndroid } from 'react-native';

const useFileStorage = () => {
    const [alreadyLoadedDir, setAlreadyLoadedDir] = useState<boolean>(false)
    const [fileFound, setFileFound] = useState<ReadDirItem[]>([])

    const loadFile = async () : Promise<ReadDirItem[]> => {
        if(alreadyLoadedDir){
            return fileFound;
        }
        const items : ReadDirItem[] = await RNFS.readDir(RNFS.MainBundlePath)
        setFileFound(items)
        setAlreadyLoadedDir(true)
        return items
    }

    const isExistFile = async (filename: string) : Promise<boolean> => {
        const files = (await loadFile()).filter(x => x.isFile())
        return files.filter(x => x.name == filename).length > 0
    }

    const getFilePath = async (filename: string) : Promise<string | null> => {
        if(await isExistFile(filename)){
            return fileFound.find(x => x.isFile() && x.name == filename)!.path
        }
        return null
    }

    const getAllFilenames = async () : Promise<string[]> => {
        const files = (await loadFile()).filter(x => x.isFile())
        return files.map(x => x.name)
    }

    const writeFile = async (filename: string, content : string) : Promise<boolean> => {
        setAlreadyLoadedDir(false)
        let isWriteFile = false
        await RNFS.writeFile(RNFS.MainBundlePath + '/' +filename, content).then(() => {
            isWriteFile = true
        }).catch(() => {
            isWriteFile = false
        })

        return isWriteFile
    }

    const deleteFile = async (filename: string) : Promise<boolean> => {
        if(await isExistFile(filename)){
            let isWriteDelete = false
            await RNFS.unlink(RNFS.MainBundlePath + '/' +filename)
            .then(() => isWriteDelete = true)
            .catch(() => isWriteDelete = false)

            return isWriteDelete
        }

        return false;
    }

    return {
        isExistFile,
        getAllFilenames,
        getFilePath,
        writeFile,
        deleteFile
    }
}

export default useFileStorage;