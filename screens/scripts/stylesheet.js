import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    backgroundScreen: {
        flex:1,
        backgroundColor: '#121212'
    },
    loginButtons: {
        backgroundColor: '#8034eb', borderColor: '#8034eb',
        paddingHorizontal: 15, paddingVertical: 8, margin: 5, borderRadius: 6, borderWidth: 3,
        color: '#000000', width: '50%', alignSelf: 'center'
    },
    loginButtonsText:{
        fontSize: 16, textAlign:'center', color:'#ffffff', fontWeight: 600
    },
    loginTextInput:{
        paddingHorizontal: 15, paddingVertical: 8, margin: 5, borderRadius: 6, borderWidth: 3,
        color: '#000000', backgroundColor: '#ffffff', borderColor: '#ffffff', width: '65%', alignSelf: 'center'
    }, 
    loginConfirmButton:{
        paddingHorizontal: 8, paddingVertical: 8, margin: 5, borderRadius: 6, borderWidth: 3, 
        color: '#000000', backgroundColor: '#ffffff', borderColor: '#8034eb', width: '25%', alignSelf: 'center'
    },
    loginConfirmButtonText:{
        fontSize: 14, color: '#000000', textAlign:'center', fontWeight: 600
    }
});

export default styles;