import {useState} from "react";
import { StyleSheet, Text, View, TextInput, Image, Alert, Pressable } from 'react-native';
import icon from '../assets/logo.png';
import {useNavigation} from '@react-navigation/native';
import{createUserWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../config/firebase'
import { collection, addDoc} from 'firebase/firestore';
import { db} from "../config/firebase";


function RegisterUser() {
    const navigation = useNavigation();

    const [firstName,setFirstName] = useState('');
    const [secondName,setSecondName] = useState('');
    const [email,setEmail] = useState('');
    const [contact,setContact] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setconfirmPassword] = useState('');



    const register = () => {
      createUserWithEmailAndPassword(auth,email,password).then(()=>{
      const UsersCollectionRef = collection(db, "users");
      const userDetails = {
        firstName: firstName,
        secondName:secondName,
        email: email,
        contact:contact,
        userId: auth.currentUser.uid,
      };
      addDoc(UsersCollectionRef, userDetails)
               }).then(()=>{ 
               Alert.alert("Successfully Registered")}),navigation.navigate("Home").catch((error)=> {
            console.log(error);
        })

    }
    
   
  

    const signIn = () => {
        navigation.navigate("Home")
    }
    return (
        <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white' }}>
            <View style={{ width: '100%', height: '35%', backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
                <Image source={icon} style={styles.logo} />
            </View>

            <View style={{ width: '100%', height: "65%", backgroundColor: "#2B2C34", borderTopEndRadius: 21, borderTopStartRadius: 21 }}>
                <Text style={styles.signIn}>Sign Up</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>setFirstName(text)}
                    value={firstName}
                    placeholder="First Name" />
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>setSecondName(text)}
                    value={secondName}
                    placeholder="Second Name" />
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>setEmail(text)}
                    value={email}
                    placeholder="Email Adress" />
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>setContact(text)}
                    value={contact}
                    placeholder="Phone Number" />
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>setPassword(text)}
                    secureTextEntry
                    value={password}
                    placeholder="Create Password" />
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>setconfirmPassword(text)}
                    secureTextEntry
                    value={confirmPassword}
                    placeholder="Confirm Password" />
                <Text style={{ color: "white", textAlign: 'center', margin: 10 }} onPress={signIn} >
                    Already has Account?
                </Text>
                <Pressable>
                    <Text style={{
                        backgroundColor: '#E85800',
                        color: 'white',
                        textAlign: 'center',
                        padding: 7,
                        marginTop: 3,
                        width: "50%",
                        alignSelf: 'center',
                        borderRadius: 5
                    }} onPress={()=>register()} >
                        Register
                    </Text>
                </Pressable>
               
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  logo: {
    width: 150,
    height: 150,
  },
  signIn: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    marginTop: 10,
  },
  input: {
    width: "90%",
    color: "white",
    borderWidth: 5,
    padding: 10,
    margin: 3,
    borderBottomColor: "white",
    borderEndColor: "#2B2C34",
    borderLeftColor: "#2B2C34",
    borderTopColor: "#2B2C34",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 8,
  },
});


export default RegisterUser;