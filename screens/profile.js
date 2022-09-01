import { Button, Image, Text, View } from 'react-native'
import React, { Component } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/style';


class Profil extends Component {

  SignOut = async () => {
    await AsyncStorage.setItem('isLogin', "false")
    this.props.navigation.navigate('SignIn')
  }
  render() {
    return (
      <View style={{flex: 1,backgroundColor:'#fff'}}>
        <View style={styles.profileView}>
          <Image source={require('../assets/user.png')} style = {{width:'99%', height:'100%'}} />
          <Text style={{marginLeft:'17%', fontSize:15, marginTop:'3%', }}>User Name</Text>
        </View>
        <View style={{marginTop:'10%'}} ><Button title = 'SignOut' onPress={this.SignOut}/></View>
        
      </View>
    )
  }
}
export default Profil