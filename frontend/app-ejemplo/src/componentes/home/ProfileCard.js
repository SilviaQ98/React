import React from "react";
import {View, Text, StyleSheet, Image, Linking,TouchableWithoutFeedback} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";


const youtube = <Icon name={'youtube'} size={40} color={'#d1313d'}/>
const spotify = <Icon name={'spotify'} size={40} color={'#7abf66'}/>
const telegram = <Icon name={'telegram'} size={40} color={'#24c0eb'}/>
const twitch = <Icon name={'twitch'} size={40} color={'#7037cd'}/>
const pinterest = <Icon name={'pinterest'} size={40} color={'#ff6b6b'}/>
const kwai = <Icon name={'camera'} size={40} color={'#ff6b6b'}/>
const ProfileCard = () => {
    const user = {
        avatar: "https://z-p3-scontent.fuio11-1.fna.fbcdn.net/v/t39.30808-6/226090016_3660396854059777_1088858040122415809_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeFRPDf7dFo6zxAMPWXmA6ovxvPnsMglTo_G8-ewyCVOj8vC-ZOh8znmE8FQRlYffQ-As_kbs17CcuR27TT9TkWj&_nc_ohc=G9jCjaqhRQsAX8gJFbL&_nc_zt=23&_nc_ht=z-p3-scontent.fuio11-1.fna&oh=00_AfDycnCMkXMx_nByr5NK13mjNoITrwzVeulcvthPatqY5A&oe=65DAE33D",
        coverPhoto: "https://wallpapercave.com/wp/wp13377986.png",
        name: "Silvia Quillupangui"
    }
    return (
        <View style={styles.container}>
            <Image source={{uri: user.coverPhoto}} style={styles.coverPhoto}/>
            <View style={styles.avatarContainer}>
                <Image source={{uri: user.avatar}} style={styles.avatar}/>
                <Text style={styles.name}>
                    {user.name}
                </Text>
            </View>
            <View style={styles.buttonContainer}>

                <TouchableWithoutFeedback style={{color: 'blue'}} onPress={() => {
                    Linking.openURL('https://www.youtube.com')
                }}>
                    {youtube}
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback style={{color: 'blue'}} onPress={() => {
                    Linking.openURL('https://open.spotify.com/intl-es?')
                }}>
                    {spotify}
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback style={{color: 'blue'}} onPress={() => {
                    Linking.openURL('https://web.telegram.org/k/')
                }}>
                    {telegram}
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback style={{color: 'blue'}} onPress={()=>{
                Linking.openURL('https://www.twitch.tv')
                }}>
                    {twitch}
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback style={{color: 'blue'}} onPress={()=>{
                Linking.openURL('https://www.pinterest.es/#top')
                }}>
                    {pinterest}
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback style={{color: 'black'}} onPress={()=>{
                Linking.openURL('https://play.google.com/store/apps/details?id=com.kwai.video&shortlink=web&c=web&pid=web&source_caller=ui')
                }}>
                    {kwai}
                </TouchableWithoutFeedback>


            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center' //flex y grid
    },
    coverPhoto: {
        width: '100%',
        height: 300,
        resizeMode: 'cover'

    },
    avatarContainer: {
        alignItems: 'center',
        marginTop: -60
    },
    avatar: {
        width: 200,
        height: 200,
        borderRadius: 80,
        borderWidth: 10,
        borderColor: '#9a5071'
    },
    name: {
        marginTop: 30,
        fontSize: 25,
        fontWeight: 'bold'
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 40,
        width: '80%',
        justifyContent: 'space-between'
    }
});
export default ProfileCard