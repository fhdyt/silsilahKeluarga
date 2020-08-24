import React, { useContext, useEffect } from 'react';
import { View, StyleSheet, Image, FlatList, Linking } from 'react-native';
import { Context as MemberContext } from '../context/MemberContext';
import { Card, Button, Searchbar, Banner, IconButton, Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-navigation';
const HomeScreen = ({ navigation }) => {
    const { state, fetchFamily, showLoading } = useContext(MemberContext);
    
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
                      onPress: () => {showLoading(), fetchFamily()},
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
                Gagal menghubungkan ke server ! Periksa kembali koneksi internet anda atau ulangi beberapa saat lagi.
            </Banner>
            <Banner
                visible={state.loading}
                actions={[]}
                >
                Mengambil data... Mohon tunggu
            </Banner>
        <FlatList
                    showsVerticalScrollIndicator={false}
                    data={filter()}
                    keyExtractor={(person) => person._id}
                    renderItem={({ item }) => {
                    return (
                            <View>
                                <Card style={styles.Cover}>
                                <Card.Title style={styles.Title}
                                    title="Keluarga Besar"
                                    titleStyle={{fontSize:13}}
                                    subtitleStyle={{fontSize:20}}
                                    subtitle={item.name}
                                    right={(props) => <IconButton {...props} icon="refresh" onPress={() => {showLoading(); fetchFamily()}} />}
                                />
                                <Card.Title
                                title="Jumlah Keluarga"
                                titleStyle={{fontSize:14}}
                                subtitle={state.info.jumlah}
                                subtitleStyle={{fontSize:19}}
                                />
                                <Divider />
                                <Card.Title
                                title="Pria"
                                titleStyle={{fontSize:14}}
                                subtitle={state.info.pria}
                                subtitleStyle={{fontSize:19}}
                                />
                                <Divider />
                                <Card.Title
                                title="Wanita"
                                titleStyle={{fontSize:14}}
                                subtitle={state.info.wanita}
                                subtitleStyle={{fontSize:19}}
                                />
                                <Divider />
                                <Card.Title
                                title="Meninggal"
                                titleStyle={{fontSize:14}}
                                subtitle={state.info.meninggal}
                                subtitleStyle={{fontSize:19}}
                                />
                                <Divider />
                                <Card.Actions>
                                <Button mode="contained" icon="file-tree" style={{marginRight:10}}onPress={() => Linking.openURL('https://fhdyt.github.io/silsilahKeluarga-UWAK/')}>Pohon Keluarga</Button>
                                <Button mode="contained" icon="open-in-new"style={{marginRight:10}}onPress={() => navigation.navigate('DetailFamily', { item:item })}>Lihat</Button>
                                </Card.Actions>
                            </Card>
                            </View>
                    );
                    }}
                />
                

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
        borderTopRightRadius:10,
        height:100
    }
});

export default HomeScreen;