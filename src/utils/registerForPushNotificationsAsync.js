import * as Notifications from "expo-notifications";
import {isDevice} from "expo-device";
import {Alert, Linking, Platform } from 'react-native';
import {startActivityASync, ActivityAction} from 'expo-intent-launcher';

export async function registerForPushNotificationsAsync(){

    let token;
    if(isDevice){

        const {status:existingStatus}=await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if(existingStatus !== "granted"){
            const {status} = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if(finalStatus !== "granted"){
            Alert.alert(
                "Notifications permission denied",
                "Please enable notificaitons for this app in your phone settings",
                [{
                    terxt:"Cancel",
                    onPress:() => consolelog("cancel pressed"),
                    style:'cancel',
                },
                {
                    text:"Go to Settings",
                    onPress:() => {
                        if(Platform.OS === "ios"){
                            Linking.openURL("app-settings:notifications");
                        }
                        else if (Platform.OS ==="android"){
                            startActivityASync(ActivityAction.NOTIFICATION_SETTINGS);
                        }
                        else{
                            return;
                        }

                    },
                    style:"default",
                }
            
            
            
            ]



            );
            return null;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log("This is the token", token)

        
    }else{
        return;
    }


    if (Platform.OS ==='android'){
        Notifications.setNotificationChannelAsync("default",{
            name:"default",
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern:[0,250,250,250],
            lightColor:"#FF231F7C"
        });
    }
    return token
}