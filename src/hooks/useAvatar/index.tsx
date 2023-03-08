import { useEffect, useState } from 'react';
import { CATEGORY_HEAD, ItemData, ItemHead, ITEM_TYPE } from '../../../types/types';
import uuid from 'react-native-uuid';

const createHead = (titre: string, image: any, color: string, typeHead: CATEGORY_HEAD) : ItemHead => {
    return new ItemHead(uuid.v4() as string, 
    ITEM_TYPE.HEAD,
    titre,
    image,
    typeHead,
    color)
}

const InitialData : ItemData[] = [
    createHead("", require("../../../src/assets/avatar/hair-1.png"),"#04294f", CATEGORY_HEAD.HAIR),
    createHead("", require("../../../src/assets/avatar/hair-2.png"),"#04294f", CATEGORY_HEAD.HAIR),
    createHead("", require("../../../src/assets/avatar/hair-3.png"),"#04294f", CATEGORY_HEAD.HAIR),
    createHead("", require("../../../src/assets/avatar/hair-4.png"),"#04294f", CATEGORY_HEAD.HAIR),
    createHead("", require("../../../src/assets/avatar/hair-5.png"),"#4f1e04", CATEGORY_HEAD.HAIR),
]

type ColorCatHead = {
    catHead : CATEGORY_HEAD,
    color : string
}

const useAvatar = () => {
    const [data, setData] = useState<ItemData[]>([])
    const [isReady, setIsReady] = useState<boolean>(false)
    const [colorCatHead, setColorCatHead] = useState<ColorCatHead[]>([])

    const loadCatHead = (currentData : ItemData[]) => {
        let cch : ColorCatHead[] = []
        for (let index = 0; index < currentData.length; index++) {
            if(currentData[index].typeItem == ITEM_TYPE.HEAD){
                const h : ItemHead = currentData[index] as ItemHead
                const ifound = cch.findIndex(x => x.catHead == h.typeHead && x.color == h.color)
                if(ifound == -1){
                    cch.push({catHead: h.typeHead, color: h.color})
                }
            }
        }
        setColorCatHead(cch)
    }

    useEffect(() => {
        setData(InitialData)
        loadCatHead(InitialData)
        setIsReady(true)
    }, [])

    const getColorsByCat = (cat : CATEGORY_HEAD) : string[] => {
        let colors : string[] = []
        
        colorCatHead.forEach(cch => {
            if(cch.catHead == cat){
                colors.push(cch.color)
            }
        })
        return colors
    }

    const getItemHeadByCatAndColor = (cat : CATEGORY_HEAD, color: string) : ItemHead[] => {
        let items : ItemHead[] = []

        data.forEach(d => {
            if(d.typeItem == ITEM_TYPE.HEAD && d instanceof ItemHead 
                && d.typeHead == cat && d.color == color){
                    items.push(d)
            }
        })

        return items
    }

    return {
        isReady,
        getColorsByCat,
        getItemHeadByCatAndColor
    }
}

export default useAvatar