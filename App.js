import React from 'react';
import { StyleSheet, Text, View, ImageBackground,TextInput, TouchableOpacity,Image,Alert } from 'react-native';
import {getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword} from 'firebase/auth';
import {initializeApp} from 'firebase/app';
import { firebaseConfig } from './firebase-config';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const yourPicture = require ('../authfirebase/images/login2.jpg');

function HomeScreen({ navigation }){
  return(
    <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>HomeScreen</Text>
    </View>
  );
}

function LoginScreen({ navigation }){

  const [email,setEmail]=React.useState('');
  const [password,setPassword]=React.useState('');

  const app=initializeApp(firebaseConfig);
  const auth=getAuth(app);

  const handleCreateAccount = () =>{
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential)=>{
      console.log('Account created!')
      const user = userCredential.user
      console.log(user)
    })
    .catch(error => {
      console.log(error)
      Alert.alert(error.message)
    })
  }

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth,email,password)
    .then((userCredential)=>{
      console.log('Signed in!')
      const user = userCredential.user
      console.log(user)
      navigation.navigate('Home');
    })
    .catch(error => {
      console.log(error)
    })
  }
    

  return(
    <View style={styles.container}>
       <ImageBackground source={yourPicture} resizeMode="cover" style={styles.image}>
       <View style={styles.containerdata}>
        <View>
        <TextInput onChangeText={(text) => setEmail(text)} style={styles.input} placeholder="Email"></TextInput>
        </View>
        <View>
        <TextInput onChangeText={(text) => setPassword(text)} style={styles.input} placeholder="password"></TextInput>
        </View>
        <View>
        <TouchableOpacity onPress={handleSignIn} style={styles.button}>
          <Text style={{fontSize:18,fontWeight:'500',color:'white',fontWeight: "bold"}}>Login</Text>
        </TouchableOpacity>
        </View>
        <View>
        <TouchableOpacity onPress={handleCreateAccount} style={styles.button}>
          <Text style={{fontSize:18,fontWeight:'500',color:'white',fontWeight: "bold"}}>Create account</Text>
        </TouchableOpacity>
        </View>
      </View>
       </ImageBackground>
    </View>
  );
}


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center"
  },
  containerdata:{
    marginTop:400,
    //borderColor:'red',
    //borderWidth:2,
    borderRadius:10,
    padding:50,
    alignItems:'center',
    //backgroundColor:'blue',
  }, 
  input:{
    width:300,
    height:40,
    borderColor:'#fff',
    borderWidth:2,
    borderRadius:10,
    padding:10,
    marginVertical:10,
    backgroundColor:'#ffffff90',
    marginBottom:20,
  },
  button:{
    width:250,
    height:40,
    borderRadius:10,
    backgroundColor:"#FFAD2B",
    alignItems:'center',
    justifyContent: 'center',
    marginVetical:10,
    marginTop:10,
    borderColor:'#fff',
    borderWidth:2,
    
  },
});
