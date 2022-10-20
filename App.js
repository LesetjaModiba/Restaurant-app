import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Image } from 'react-native';
import React, { useState } from 'react';
import image from './assets/logo.png';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterUser from './pages/Register';
import ResetPassword from './pages/forgotPassword';
import Landing from './pages/landingPage';
import More from './pages/moreDetails';
import Cart from './pages/cart';
import Order from './pages/order';
import Payment from './pages/payment';
import Profile from './pages/profile';
import { TouchableOpacity} from 'react-native';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from './config/firebase';



function HomeScreen({navigation}) {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const login = () => { 
    signInWithEmailAndPassword(auth,email,password).then(()=>{
      if (email !== "" && password !== ""){
        navigation.navigate("landingPage");
        Alert.alert("Successfully Logged In")
      }else{
        Alert.alert("Inputs can not be empty")
        console.log("Inputs can not be empty");
      }

    }).catch((error)=>{
      console.log(error);
    })
  }
   //link to sign up page
   const signUp = () => {
    navigation.navigate('Register')
  }
  //link to reset password
  const forgotPassword = () => {
    navigation.navigate('forgotPassword')
  }
  return (
    <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white' }}>
      <View style={{ width: '100%', height: '50%', backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
        <Image source={image} style={styles.logo} />
      </View>

      <View style={{ width: '100%', height: "50%", backgroundColor: "#2B2C34", borderTopEndRadius: 21, borderTopStartRadius: 21 }}>
        <Text style={styles.signIn}>Sign In</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text)=>setEmail(text)}
          value={email}
          placeholder="Email Adress" />
        <TextInput
          style={styles.input}
          onChangeText={(text)=>setPassword(text)}
          value={password}
          secureTextEntry
          placeholder="Password" />
        <Text style={{ color: "white", textAlign: 'center', margin: 10 }} onPress={signUp}>
          Don't Have Account?
        </Text>

        <Text style={{ color: "white", textAlign: 'center', margin: 10 }} onPress={forgotPassword}>
          Forgot Password?
        </Text>
        <TouchableOpacity>
          <Text style={{
            backgroundColor: '#E85800',
            color: 'white',
            textAlign: 'center',
            padding: 7,
            marginTop: 10,
            width: "50%",
            alignSelf: 'center',
            borderRadius: 5
          }} onPress={ login }>
            Sign In
          </Text>
        </TouchableOpacity>
        
      </View>
    </View>
  );
}
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home' screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Register" component={RegisterUser} />
      <Stack.Screen name="landingPage" component={Landing}/>
      <Stack.Screen name="cart" component={Cart}/>
      <Stack.Screen name="payment" component={Payment}/>
      <Stack.Screen name="order" component={Order}/>
        <Stack.Screen name="forgotPassword" component={ResetPassword} />
        <Stack.Screen name="moreDetails" component={More} />
        <Stack.Screen name="profile" component={Profile} /> 


      </Stack.Navigator>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,    
    justifyContent: "center",
  },
  logo: {
    width: 200,
    height: 200
  },
  signIn: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    fontWeight:"500",
    marginTop: 30
  },
  input: {
    width:"90%",
    color: "white",
    borderWidth: 5,
    padding: 10,
    margin: 3,
    borderBottomColor: "white",
    borderEndColor: "#2B2C34",
    borderLeftColor: "#2B2C34",
    borderTopColor: '#2B2C34',
    marginLeft:"auto",
    marginRight:"auto",
    borderRadius:8,
  },
});