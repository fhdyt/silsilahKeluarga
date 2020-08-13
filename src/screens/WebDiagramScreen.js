import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import { WebView } from 'react-native-webview';
import { SafeAreaView } from 'react-navigation';
import { HeaderStyleInterpolators } from 'react-navigation-stack';

const WebDiagramScreen = ({navigation}) => {
    //const item = navigation.state.params.item;
    return (
        <View style={styles.container}>
        <WebView source={{ uri: 'https://fhdyt.github.io/silsilahKeluarga/' }} />
        </View>
    );
}

WebDiagramScreen.navigationOptions = () => {
    return {
      title : 'Pohon Keluarga',
      headerStyle: {
        elevation: 0, // remove shadow on Android
        shadowOpacity: 0, // remove shadow on iOS
      }      
    };
  };
const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
    ActivityIndicatorStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      },

});

export default WebDiagramScreen;