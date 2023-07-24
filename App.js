import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SignIn from './src/components/SignIn';
import { Auth } from 'aws-amplify';
import { Amplify } from 'aws-amplify';
import awsconfig from './src/aws-exports';
Amplify.configure(awsconfig);

export default function App() {

  const signOut= async() =>{

    try {
      await Auth.signout();
  
    } catch (e) {
      console.log("Error loging out", e);
    }

  }
  return (
    <View style={styles.container}>
      <SignIn />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
