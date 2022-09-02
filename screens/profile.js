import { Button, FlatList, Image, Text, View, TouchableOpacity, Dimensions } from 'react-native'
import React, { Component } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../styles/style';


class Profil extends Component {
  state = {
    imageData: ['https://habervakticom.teimg.com/crop/1280x720/habervakti-com/uploads/2021/08/fotografci.jpg',
    'https://i0.wp.com/bakikaracay.com/wp-content/uploads/2016/09/Kamera-I%C5%9F%C4%B1k-Foto%C4%9Fraf.jpg?fit=1600%2C1067&ssl=1',
  'https://www.aa.com.tr/uploads/userFiles/de89f914-66b1-4a0b-9347-13c0eafe70cc/2021%2F07%2Ffoto-1-.jpg',
'https://i0.wp.com/www.malumatfurus.org/wp-content/uploads/ay-foto-montaj.jpeg?resize=500%2C500&ssl=1',
'https://www.gazeteilksayfa.com/d/gallery/331_25.jpg',
'https://i2.wp.com/bakikaracay.com/wp-content/uploads/2020/05/Foto%C4%9Fraf-Makinesi-Kamera.jpg?fit=810%2C540&ssl=1',]
  }
  SignOut = async () => {
    await AsyncStorage.setItem('isLogin', "false")
    this.props.navigation.navigate('SignIn')
  }
  render() {
    return (
      <View style={{flex: 1,backgroundColor:'#fff'}}>
        <View style={styles.profileView}>
          <Image source={require('../assets/user.png')} style = {{width:'98%', height:'100%'}} resizeMode='contain' />
          <Text style={{marginLeft:'15%', fontSize:17, marginTop:'8%',fontWeight:'bold' }}>User Name</Text>
        </View>
        <View style={{ width:'80%',marginLeft:'10%',marginTop:'15%'}}>
            <TouchableOpacity style={styles.signIn} onPress={ () => this.props.navigation.navigate('ProfileSettings')} >
                <LinearGradient colors={['#009999', '#01ab9d']} style={[styles.signIn,{height:44}]}>
                  <Text style={[styles.textSign, { color:'#fff' }]}>Edit Profile</Text>
                </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.signIn, {borderColor: '#009387',borderWidth: 1,marginTop: 15,height:44}]} onPress={this.SignOut}>
                    <Text style={[styles.textSign, {color: '#009387'}]}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        <View style={{borderBottomWidth:3,marginTop:'10%'}}></View>
        <View>
          <FlatList 
          data={this.state.imageData} 
          numColumns={3} 
          horizontal={false} 
          keyExtractor={(item,index) => {
            return index.toString();
          }}
          renderItem={({item}) => {
            return(
              <View style={{borderWidth:1,borderColor:'#fff',borderTopWidth:0}}>
                <Image source={{uri: item}} style={{width: (Dimensions.get('window').width)*0.33, height:(Dimensions.get('window').height)*0.15}} resizeMode='cover' />
              </View>
            )
          }}
         />
         </View>
        
        
      </View>
    )
  }
}
export default Profil