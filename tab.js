import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './screens/home';
import ProfilScreen from './screens/profile';
import ChatScreen from './screens/chat';
import SignInScreen from './screens/signIn';
import SignUpScreen from './screens/signUp';
import ProfileSettingsScreen from './screens/profileSettings'

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

class HomeTabs extends Component {
  render() {
    return (
      <Tab.Navigator tabBarOption = {{ shadowLabel: false}} 
        screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home': 'home-outline';
          }else if (route.name === 'Chat') {
            iconName = focused ? 'chatbox-ellipses' : 'chatbox-ellipses-outline';
          }else if (route.name === 'Profil') {
            iconName = focused ? 'person-circle-sharp' : 'person-circle-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerShown: false,
        tabBarActiveTintColor: '#009387',
        tabBarInactiveTintColor: 'gray',
      })}>
        
        <Tab.Screen name="Home" component={HomeScreen}  />
        <Tab.Screen name="Chat" component={ChatScreen} />
        <Tab.Screen name="Profil" component={ProfilScreen} />

      </Tab.Navigator>
    )
  }
}

class HomeStack extends Component {
  render(){
    return(
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="HomeTabs" component={HomeTabs} />
            <Stack.Screen name="ProfileSettings" component={ProfileSettingsScreen} />
        </Stack.Navigator>
        )
    }
}
export default HomeStack