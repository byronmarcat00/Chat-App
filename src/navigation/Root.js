import * as React from "react";
import { DefaultTheme, DarkTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "../screens/Home";
import Profile from "../screens/Profile";
import Onboarding from "../screens/Onboarding";
import {Ionicons} from "@expo/vector-icons"
import Chats from "../screens/Chats";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function Root({colorScheme}) {
  return (
    <NavigationContainer 
    theme={colorScheme === 'dark' ? DarkTheme: DefaultTheme}
    >
      <BottomNavigation />
      
    </NavigationContainer>
  );
}

function BottomNavigation(){

  return (
    <Tab.Navigator initialRouteName="Home">
    <Tab.Screen name="HomeStack" component={HomeStack}  
    options={{
      tabBarIcon:({color}) => (<TabBarIcon name="ios-home" color={color} />),
      headerShown:false,
      tabBarLabel:"Home",
    
    }}

    />

<Tab.Screen name="chats" component={Chats}
    options={{
      tabBarIcon:({color}) => (<TabBarIcon name="md-chatbubbles" color={color} />),
     
    
    }}/>


    <Tab.Screen name="Profile" component={Profile}
    options={{
      tabBarIcon:({color}) => (<TabBarIcon name="person-circle" color={color} />),
      headerShown:false,
      tabBarLabel:"Settings",
    
    }}/>
  </Tab.Navigator>
  )
}

function HomeStack(){

  return ( 

    <Stack.Navigator>

      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name = "Onboarding" component = {Onboarding}
      options={{
        headerShown:false,
        presentation:"fullScreenModal",

      }}
      />

    </Stack.Navigator>

  )
}



function TabBarIcon(props) {

  return <Ionicons size={28} style={{marginBottom:-3}} {...props}/>

}