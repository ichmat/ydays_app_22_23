import { useEffect, useState } from 'react';
import { Permission, PermissionsAndroid } from "react-native";

// Rédiger les permissions ici 
// Pour chaque `permission` : https://reactnative.dev/docs/permissionsandroid
const permissionsAndroid = [
    {titre: "Lecture stockage interne", description: "", permission: PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE},
    {titre: "Ecriture stockage interne", description: "", permission: PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE},
]



const usePermissions = () => {
    const requestPermissionAndroid = async (permission: Permission, title: string, message: string): Promise<boolean> => {
        try {
          const granted = await PermissionsAndroid.request(
            permission,
            {
              title: title,
              message: message,
              buttonNegative: 'Annulé',
              buttonPositive: 'OK',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            return true
          } else {
            return false
          }
        } catch (err) {
          console.warn(err);
          return false
        }
      };

    const requestAndroid = async () : Promise<boolean> => {
        for (let index = 0; index < permissionsAndroid.length; index++) {
            const p = permissionsAndroid[index];
            const result = await requestPermissionAndroid(p.permission, p.titre, p.description)
            if(result != true){
                return false
            }
        }

        return true
    }

    return {
        requestAndroid
    }
}

export default usePermissions;