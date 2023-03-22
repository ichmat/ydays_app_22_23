import { useEffect, useState } from 'react';
import { CATEGORY_BODY, CATEGORY_HEAD, ItemBody, ItemData, ItemHead, ITEM_TYPE } from '../../../types/types';
import uuid from 'react-native-uuid';

const createHead = (titre: string, image: any, color: string, typeHead: CATEGORY_HEAD) : ItemHead => {
    return new ItemHead(uuid.v4() as string, 
    ITEM_TYPE.HEAD,
    titre,
    image,
    typeHead,
    color)
}

const createBody = (titre: string, image: any, color: string, typeBody: CATEGORY_BODY) : ItemBody => {
    return new ItemBody(uuid.v4() as string, 
    ITEM_TYPE.BODY,
    titre,
    image,
    typeBody,
    color)
}

const InitialData : ItemData[] = [
    createHead("", require("../../../src/assets/avatar/hair-1.png"),"#04294f", CATEGORY_HEAD.HAIR),
    createHead("", require("../../../src/assets/avatar/hair-2.png"),"#04294f", CATEGORY_HEAD.HAIR),
    createHead("", require("../../../src/assets/avatar/hair-3.png"),"#04294f", CATEGORY_HEAD.HAIR),
    createHead("", require("../../../src/assets/avatar/hair-4.png"),"#04294f", CATEGORY_HEAD.HAIR),
    createHead("", require("../../../src/assets/avatar/hair-5.png"),"#4f1e04", CATEGORY_HEAD.HAIR),
    createBody("", require("../../../src/assets/avatar/outfit-1.png"), "#2a2d41", CATEGORY_BODY.WETSUITS)
]

type ColorCatHead = {
    catHead : CATEGORY_HEAD,
    color : string
}

type ColotCatBody = {
    catBody : CATEGORY_BODY,
    color : string
}

const useAvatar = () => {
    const [data, setData] = useState<ItemData[]>([])
    const [isReady, setIsReady] = useState<boolean>(false)
    const [colorCatHead, setColorCatHead] = useState<ColorCatHead[]>([])
    const [colorCatBody, setColorCatBody] = useState<ColotCatBody[]>([])

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

    const loadCatBody = (currentData : ItemData[]) => {
        let ccb : ColotCatBody[] = []
        for (let index = 0; index < currentData.length; index++) {
            if(currentData[index].typeItem == ITEM_TYPE.BODY){
                const h : ItemBody = currentData[index] as ItemBody
                const ifound = ccb.findIndex(x => x.catBody == h.typeBody && x.color == h.color)
                if(ifound == -1){
                    ccb.push({catBody: h.typeBody, color: h.color})
                }
            }
        }
        setColorCatBody(ccb)
    }

    useEffect(() => {
        setData(InitialData)
        loadCatHead(InitialData)
        loadCatBody(InitialData)
        setIsReady(true)
    }, [])

    const getColorsHeadByCat = (cat : CATEGORY_HEAD) : string[] => {
        let colors : string[] = []
        
        colorCatHead.forEach(cch => {
            if(cch.catHead == cat){
                colors.push(cch.color)
            }
        })
        return colors
    }

    const getColorsBodyByCat = (cat : CATEGORY_BODY) : string[] => {
        let colors : string[] = []
        
        colorCatBody.forEach(ccb => {
            if(ccb.catBody == cat){
                colors.push(ccb.color)
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

    const getItemBodyByCatAndColor = (cat : CATEGORY_BODY, color: string) : ItemBody[] => {
        let items : ItemBody[] = []

        data.forEach(d => {
            if(d.typeItem == ITEM_TYPE.BODY && d instanceof ItemBody 
                && d.typeBody == cat && d.color == color){
                    items.push(d)
            }
        })

        return items
    }

    return {
        isReady,
        getColorsHeadByCat,
        getColorsBodyByCat,
        getItemHeadByCatAndColor,
        getItemBodyByCatAndColor
    }
}

export default useAvatar