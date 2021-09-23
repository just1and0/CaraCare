import {
    StyleSheet
} from 'react-native';

export const style = () => {


    return StyleSheet.create({
        flex: {
            flex: 1
        },
        container: {
            backgroundColor: '#53BFEF',
            paddingHorizontal: 15
        },
        header: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        headerItems: {
            alignItems: 'center',
            justifyContent: 'center'
        },
        headerItemTitle: {
            color: 'white',
            fontWeight: '600',
            fontSize: 25,
            marginBottom: 10
        },
        headerItemDescription: {
            color: 'white',
            textTransform: 'uppercase',
            textAlign: 'center'
        },
        body: {
            flex: 3,
        },
        humanView: {
            flex: 5,
            alignItems:'center',
            justifyContent:'center',
        },
        alertView: {
            flex: 1,
            justifyContent: 'center'
        },
        alertViewText: {
            textAlign: 'center',
            color: 'white',
            fontSize: 20,
            fontWeight: 'bold'
        },
        footer: {
            flex: 1,
        },
        footerSliderView: {
            flex: 1,
            backgroundColor: 'transparent'
        },
        footerButtonView: {
            flex: 2,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
        },
        circleButton: {
            height: 70,
            width: 70,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 4,
            borderColor: 'white',
            borderRadius: 70 / 2

        },
        circleButtonText: {
            fontSize: 50,
            fontWeight: 'bold',
            color: 'white'
        },
        spacer: {
            width: 20
        },
        carouselView: {  
            height:'100%',
            justifyContent:'center',
        },
        carouselTitle: {
            fontSize: 30,
            color:'white'
        },
        carouselTitleCenter: {
            alignSelf:'center'
        },
        lineView:{ 
            flexDirection:'row',
            position:'absolute',
            top:11,
            justifyContent:'flex-end',
            alignItems:'center',
            right:0,
            width:'100%'
        },
        line:{
            backgroundColor:'#088ECF',
            height:1,
            width:'35%',
        },
        lineText:{
            color:'white',
            fontWeight:'bold',
            fontSize:18
        },
        modalView:{
            backgroundColor:'rgba(52, 52, 52, 0.9)',
            justifyContent:'center',
            alignItems:'center',
          
        },
        modalContent:{
            backgroundColor:'white',
            width:'80%',
            borderRadius:10, 
            paddingHorizontal:10,
            paddingVertical:20
        },
        modalTitle:{
            alignSelf:'center',
            color:'#088ECF',
            fontWeight:'700',
            fontSize:25,
            marginBottom:25
        },
        modalDescription:{
            alignSelf:'center',
            color:'#088ECF',
            fontWeight:'500',
            fontSize:15,
            textAlign:'center',
            lineHeight:15,
            marginBottom:20
        },
        TextInputView:{
            flexDirection:'row', 
            width:'70%',
            alignSelf:'center',
            marginBottom:10,
            borderColor:'#088ECF',
            borderWidth:1,
            borderRadius:10,
            paddingHorizontal:10,
            justifyContent:'center',
            alignItems:'center',
            paddingVertical:5,
        },
        TextInput:{
            width:'70%',
            height:30, 
        },
        textInputText:{
            color:'#088ECF',
            fontWeight:'700'
        },
        button:{
            backgroundColor:'#088ECF',
            width:'70%',
            alignSelf:'center',
            alignItems:'center',
            paddingVertical:10,
            borderRadius:10
        }
    });
}