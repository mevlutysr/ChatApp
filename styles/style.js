import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor:'#009387'
    },
    header:{
        flex: 1,
        justifyContent:'flex-end',
        paddingHorizontal: '7%',
        paddingBottom: '13%',
    },
    footer: {
        flex: 3,
        backgroundColor:'#ffff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: '5%',
        paddingVertical: '10%',

    },
    inputView: {
        width: "100%",
        height: 35,
        marginTop:'2%',
        flexDirection:'row',
        borderBottomWidth:1,
    },
    text:{
        fontSize: 15,
        fontWeight:'bold',
        marginTop:'7%'
    },
    textHeader:{
        fontSize: 20,
        fontWeight:'bold',
        textAlign:'center',
        color:'#fff'
    },
    button: {
        alignItems: 'center',
        marginTop: '17%'
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 13
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    profileView: {
        width:'30%',
        height:'15%',
        marginTop:'15%',
        marginLeft:'5%',
        borderWidth: 1,
        borderRadius: 100
        }
})

export default styles