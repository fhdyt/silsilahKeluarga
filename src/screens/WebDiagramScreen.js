import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { ProgressDialog } from 'react-native-simple-dialogs';
import { SafeAreaView } from 'react-navigation';

const Loading = () => {
    return (
            <ProgressDialog
            visible={true}
            message="Loading..."
            />
        )
}
const WebDiagramScreen = ({navigation}) => {
    //const item = navigation.state.params.item;
    return (
        <View>
            <SafeAreaView forceInset={{ top: 'always' }}>
        <WebView
        originWhitelist={['*']}
        source={{ uri: 'https://fhdyt.github.io/silsilahKeluarga' }}  
        javaScriptEnabled={true}
        domStorageEnabled={true}
        renderLoading={Loading}
        startInLoadingState={true}
      />
      </SafeAreaView>
      </View>
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