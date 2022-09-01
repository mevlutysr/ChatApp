import { Text, View } from 'react-native'
import React, { Component } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

class Home extends Component {
  state = { 
    email: "",
  }
  componentDidMount = async () => {
    await AsyncStorage.getItem('email').then((value) => {this.setState({email:value})})
  }
  render() {
    return (
      <View style={{flex: 1, alignItems:'center', justifyContent:'center'}}>
        <Text>HOSGELDİN {this.state.email}</Text>

      </View>
    )
  }
}
export default Home