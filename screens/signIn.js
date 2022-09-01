import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { Component } from 'react';
import styles from '../styles/style';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FeatHer from 'react-native-vector-icons/Feather';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { auth } from '../config/firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';

class Login extends Component {
  state = {
    email: "",
    password: "",
    secureTextEntry: true,
    check_textInput: false,
  } 
  componentDidMount = async () => {
    await AsyncStorage.getItem('isLogin').then((isLogin) => {
      if(isLogin == "true") {
          AsyncStorage.getItem('email').then((value) => {
              if(value !== null) {
                this.props.navigation.navigate('HomeTabs',{value: value});
                }else{
                  this.props.navigation.navigate('SignIn');
                }
          })   
      }
  }) 
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

  signIn = async () => {

    try {
      await signInWithEmailAndPassword(auth, this.state.email, this.state.password)
      await AsyncStorage.setItem('isLogin', "true")
      await AsyncStorage.setItem('email', this.state.email)
      this.setState({password: "", email: ""})
      this.props.navigation.navigate('HomeTabs',{value:this.state.email})
      
  }catch (error) {
      const errorCode = error.code
      this.processAuthError(errorCode)
  }
  }
  
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}> 
          <Text style={styles.textHeader}>WELCOME!</Text>
        </View>
        <Animatable.View animation="fadeInUpBig" style={styles.footer}>
          <Text style={styles.text}>E-mail</Text>
          <View style={styles.inputView}>
            <FontAwesome name='user' color='#05375a' size={28}/>
            <TextInput style={{color:'#000',marginLeft:'3%',width:'84%'}} 
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
            <TouchableOpacity style={styles.signIn} onPress={this.signIn} >
                <LinearGradient colors={['#009387', '#01ab9d']} style={styles.signIn}>
                  <Text style={[styles.textSign, { color:'#fff' }]}>Sign In</Text>
                </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.signIn, {borderColor: '#009387',borderWidth: 1,marginTop: 15}]} onPress={() => this.props.navigation.navigate('SignUp')}>
                    <Text style={[styles.textSign, {color: '#009387'}]}>Sign Up</Text>
            </TouchableOpacity>
        </View>
        </Animatable.View>
        
      </View>
    )
  }
  onPressButton() {
    const { navigate } = this.props.navigation;
    navigate('Register')
  }
}

export default Login