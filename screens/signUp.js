import { Text, TextInput, TouchableOpacity, View, ScrollView, Alert } from 'react-native';
import React, { Component } from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FeatHer from 'react-native-vector-icons/Feather';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { db,auth } from '../config/firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, setDoc,doc } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/style';

class SignUp extends Component {
  state = {
    name: "",
    username: "",
    email: "",
    password: "",
    secureTextEntry: true,
    check_textInput: false,
  } 

  processAuthError = (authError) => {
    if(authError.includes('user-not-found')) {
        Alert.alert('Wrong Email')
    } else if(authError.includes('wrong-password')) {
        Alert.alert('Wrong Password')
    } else if(authError.includes('email-already-in-use')) {
        Alert.alert("Please enter another e-mail address")
    } else if(authError.includes('network-request-failed')) {
        Alert.alert('Check your internet connection')
    }else{
      Alert.alert("Please make sure you enter the correct information")
    }
  }

  setData = async () =>{
    if (this.state.name.length == 0 || this.state.email.length == 0 || this.state.username.length == 0 || this.state.password.length == 0){
        Alert.alert('Please do not leave empty!!');
    }else{
        
        try {

            await createUserWithEmailAndPassword(auth, this.state.email, this.state.password)
            const docRef = collection(db, "users")

            await setDoc(doc(docRef),{
                allname: this.state.name,
                username: this.state.username,
                email: this.state.email,
                password: this.state.password
            });
            await AsyncStorage.setItem('isLogin', "true")
            await AsyncStorage.setItem('email', this.state.email)
            Alert.alert("Transaction successful!!");
            this.props.navigation.navigate('HomeTabs');
        } catch (error) {
            const errorCode = error.code
            this.processAuthError(errorCode)
        }
    }
  }

  updateSecureTextEntry = () => {
    if(this.state.secureTextEntry == true){
      this.setState({secureTextEntry: false})
    }else{
      this.setState({secureTextEntry: true })
    }
  }

  check_text = (email) => {

    this.setState({email : email})
    if(email.length > 10){
      this.setState({check_textInput: true})
    }else{
      this.setState({check_textInput: false})
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}> 
          <Text style={styles.textHeader}>REGISTER</Text>
        </View>
        <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <ScrollView>
        <Text style={styles.text}>Name</Text>
          <View style={styles.inputView}>
            <FontAwesome name='user' color='#05375a' size={28}/>
            <TextInput style={{color:'#000',marginLeft:'3%',width:'84%'}} 
                  placeholder="Your Name and Surname"
                  value={this.state.name}
                  placeholderTextColor="#000"
                  onChangeText={(name) => this.setState({name: name})}
                  autoCapitalize = 'none' 
            />
          </View>
          <Text style={styles.text}>Username</Text>
          <View style={styles.inputView}>
            <FontAwesome name='user-secret' color='#05375a' size={28}/>
            <TextInput style={{color:'#000',marginLeft:'3%',width:'84%'}} 
                  placeholder="Your Username"
                  value={this.state.username}
                  placeholderTextColor="#000"
                  onChangeText={(username) => this.setState({username: username})}
                  autoCapitalize = 'none' 
            />
          </View>
          <Text style={styles.text}>E-mail</Text>
          <View style={styles.inputView}>
            <FontAwesome name='mail-forward' color='#05375a' size={28}/>
            <TextInput style={{color:'#000',marginLeft:'3%',width:'82%'}} 
                  placeholder="Your E-mail"
                  value={this.state.email}
                  placeholderTextColor="#000"
                  onChangeText={(email) => this.check_text(email)}
                  autoCapitalize = 'none' 
            />
            {this.state.check_textInput ? <Animatable.View animation="bounceIn"><FeatHer name='check-circle' color='green' size={28}/></Animatable.View> : null}
          </View>
          <Text style={styles.text}>Password</Text>
          <View style={styles.inputView}>
            <FontAwesome name='lock' color='#05375a' size={30}/>
            <TextInput style={{color:'#000',marginLeft:'3%',width:'83%'}} 
                  placeholder="Your Password"
                  value={this.state.password}
                  placeholderTextColor="#000"
                  secureTextEntry= {this.state.secureTextEntry ? true : false}
                  onChangeText={(password) => this.setState({password : password})}
                  autoCapitalize = 'none' 
            />
            <TouchableOpacity  onPress={this.updateSecureTextEntry}>
              <FeatHer name='eye-off' color='grey' size={30} />
            </TouchableOpacity>
          </View>
          <View style={styles.button}>
            <TouchableOpacity style={styles.signIn} onPress={this.setData}>
                <LinearGradient colors={['#009387', '#01ab9d']} style={styles.signIn}>
                  <Text style={[styles.textSign, { color:'#fff' }]}>Register</Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
        </ScrollView>
        </Animatable.View>
        
      </View>
    )
  }
}

export default SignUp