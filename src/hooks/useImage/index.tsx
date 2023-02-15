import { useEffect, useState } from 'react';
import { useFileStorage } from '../';

const useImage = () => {
    const {isExistFile, writeFile, deleteFile, getAllFilenames} = useFileStorage()
}

export default useImage