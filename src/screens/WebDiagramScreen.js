import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { SafeAreaView } from 'react-navigation';

const WebDiagramScreen = ({navigation}) => {
    //const item = navigation.state.params.item;
    return (
        <WebView source={{ uri: 'https://fhdyt.github.io/silsilahKeluarga/' }} />
    );
}


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