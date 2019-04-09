import {StyleSheet} from 'react-native'
import Layout from '../constants/Layout'
import {Constants} from 'expo'
export default StyleSheet.create({
    container: {
   
        paddingTop:Constants.statusBarHeight,
    },

    headerBox: { flex: 1, },
    contentBox: { flex: 9 },
    footerBox: { flex: 1 },

    contentContainer: {
        paddingTop: 30,
    },
    textDefault: { color: 'white', fontSize: 18, alignSelf: 'center', textAlign: 'center', fontFamily: 'Roboto_medium' },
    textHeader: { color: 'white', fontSize: 20, alignSelf: 'center', fontFamily: 'Roboto_medium' },
    textSmall: { fontFamily: 'Roboto_light', color: 'grey', fontSize: 14 },
    inputLabel: { fontSize: 14, alignSelf: 'center', textAlign: 'center', fontFamily: 'Roboto_medium' ,textAlign: 'left', color: '#5a83c2', fontSize: 14, },
    textInput:{ height: 40, backgroundColor: '#FAFBFE', borderRadius: 5, width: '100%', paddingLeft: 10, fontSize: 16, color: '#232fd0', fontFamily: 'Roboto_medium', borderWidth: 1, borderColor: '#D0D6EA' },
    textInput1:{ height: 40, backgroundColor: '#FAFBFE', borderRadius: 5,  paddingLeft: 10, fontSize: 16, color: '#232fd0', fontFamily: 'Roboto_medium', borderWidth: 1, borderColor: '#D0D6EA' },
    textInputPicker:{fontSize: 12,paddingLeft: 0, marginLeft:0, backgroundColor: '#FAFBFE', borderRadius: 5,  borderWidth: 1, borderColor: '#D0D6EA' },

    topActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop:30
    },
    flipCamera: {
        margin: 10
    },
    chronometer: {
        margin: 10
    },
    bottonActions: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginBottom: 10
    },
    containerCenter: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    containerCamera: {
        width:Layout.window.width,
        height:Layout.window.height

    },
    
    circle:{width: 10,
        height: 10,
        borderRadius: 10 / 2,
        backgroundColor: '#d94498',margin:2},
        rect:{height:5,width:30,marginTop:4,backgroundColor:'#5a83c2'},
        shadow:{shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        
        elevation: 10,},lowOpac:{opacity:0.5},normalOpac:{opacity:1}  

        

        
        

});

