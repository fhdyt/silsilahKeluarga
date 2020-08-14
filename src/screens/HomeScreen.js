import React, { useContext, useEffect } from 'react';
import { View, StyleSheet, Image, FlatList, Linking } from 'react-native';
import { Context as MemberContext } from '../context/MemberContext';
import { Card, Button, Searchbar, Banner, List, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-navigation';
import { ListItem } from 'react-native-elements';
import { setStatusBarBackgroundColor } from 'expo-status-bar';
const HomeScreen = ({ navigation }) => {
    const { state, fetchFamily } = useContext(MemberContext);
    
    useEffect(() => {
        fetchFamily();
      }, []);

      var filter = () => {
        return state.personData.filter(result => {
          return result.pid === '';
        });
      };
    return (
        <>
        <View style={styles.container}>
            <SafeAreaView forceInset={{ top: 'always' }}>
            <Searchbar
                onTouchStart={() => navigation.navigate('Search')}
                placeholder="Cari"
            />
            <Banner
                style={{
                    marginTop:10
                }}
                visible={state.errorBanner}
                actions={[
                    {
                      label: 'Coba lagi',
                      onPress: () => {fetchFamily()},
                    },
                  ]}
                icon={({size}) => (
                    <Image
                    source={
                        require(`../../assets/connection.png`)
                    }
                    style={{
                        width: size,
                        height: size,
                    }}
                    />
                )}>
                Gagal membuat data, periksa kembali koneksi internet anda.
            </Banner>
            <Banner
                visible={state.loading}
                actions={[]}
                >
                Memuat data... Mohon tunggu
            </Banner>
        <FlatList
                    showsVerticalScrollIndicator={false}
                    data={filter()}
                    keyExtractor={(person) => person._id}
                    renderItem={({ item }) => {
                    return (
                            <Card style={styles.Cover}>
                                <Card.Title style={styles.Title}
                                    title={item.name}
                                    subtitle="Keluarga Besar"
                                />
                                <Card.Actions>
                                <Button onPress={() => Linking.openURL('https://fhdyt.github.io/silsilahKeluarga/')}>Pohon Keluarga</Button>
                                <Button onPress={() => navigation.navigate('DetailFamily', { item:item })}>Lihat</Button>
                                </Card.Actions>
                            </Card>
                    );
                    }}
                />
                <View style={styles.Info}>
                <List.Item
                    title="Jumlah Keluarga"
                    bottomDivider
                    description={state.info.jumlah}
                />
                <List.Item
                    title="Pria"
                    bottomDivider
                    description={state.info.pria}
                />
                <List.Item
                    title="Wanita"
                    bottomDivider
                    description={state.info.wanita}
                />
                <List.Item
                    title="Meninggal"
                    bottomDivider
                    description={state.info.meninggal}
                />
                </View>

                </SafeAreaView>
        </View>
        </>
    );
}

HomeScreen.navigationOptions = ({ navigation }) => {
    return {
        header: () => false,
    };
  };

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        marginBottom: 50,
    },
    Cover:{
        marginTop:15,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius:10,
        marginHorizontal:5
      },
    Info:{
        marginTop:15,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginHorizontal:5
    },
    Title:{
        backgroundColor:'#eeeeee',
        borderTopLeftRadius: 10,
        borderTopRightRadius:10
    }
});

export default HomeScreen;