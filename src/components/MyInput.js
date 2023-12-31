import {TextInput, Text, View, StyleSheet, useColorScheme} from "react-native"
import Colors from "../../constants/colors";
import MyText from "./MyText";
export default function MyInput({

    label,
    value,
    onChangeText,
    secureTextEntry
}){

    const theme= useColorScheme();
    return (
        <View  style= {[styles.container]}>
            <MyText style={{fontWeight:"bold", marginBottom:5}} type={"caption"}> {label}</MyText>
            <TextInput
            placeholder={label}
            style={[styles.input,  styles[theme] ]}
            value={value}
            onChangeText ={onChangeText}
            secureTextEntry={secureTextEntry}
            />

        </View>
    )
}


const styles = StyleSheet.create({

    container:{
        marginBottom:20,
    },

    input:{
        width: "100%",
        height:50,
        justifyContent:"center",
       
        padding:10,
        backgroundColor:Colors.light,
        borderRadius:8,
        borderWidth:1,
    },
    dark:{
        backgroundColor: Colors.dark.text + "06",
        borderColor: Colors.dark.text + "80",
        color:Colors.dark.text,
    },
    light:{
        backgroundColor:Colors.light.text + "06",
        borderColor: Colors.light.text + "80",
        color:Colors.light.text,
    },
   
})