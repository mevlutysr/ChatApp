import { NavigationContainer } from '@react-navigation/native'
import React, { Component } from 'react'
import HomeStack from './tab'

class App extends Component {
  render() {
    return (

      <NavigationContainer>
        <HomeStack />
      </NavigationContainer>
      
    )
  }
}

export default App