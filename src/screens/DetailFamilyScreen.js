import React, { useContext, useState } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import { Context as MemberContext } from '../context/MemberContext';
import { Button, Card, IconButton, Divider, Avatar, List} from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { YellowBox } from 'react-native'

const DetailFamilyScreen = ({ navigation }) => {
    YellowBox.ignoreWarnings([
      'VirtualizedLists should never be nested',
    ])

    const item = navigation.state.params.item
    const id = navigation.state.params.item.id;
    const _id = navigation.state.params.item._id;
    const { state, deleteMember } = useContext(MemberContext)

    const [loadingButton, setLoadingButton] = useState(false)
    const [disabledButton, setDisabledButton] = useState(false)

    var filter = id => {
      return state.personData.filter(result => {
        return result.pid === id;
      });
    };

    const buttonAlert = (_id) =>
    {
        Alert.alert(
        "Peringatan !!!",
        "Menghapus berarti menghapus semua keluarga pada anggota ini",
        [
            {
            text: "Batal",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
            },
            { text: "Hapus", onPress: () => {setLoadingButton(true); setDisabledButton(true); deleteMember(_id, () => {navigation.navigate('Home')})} }
        ],
            { cancelable: false }
        );
    }

    if(item.gender == 'M')
    {
      var iconGender = require(`../../assets/M.png`)
    }
    else if(item.gender == 'F')
    {
      var iconGender = require(`../../assets/F.png`)
    }
    else{
      var iconGender = require(`../../assets/FM.png`)
    }


    return (
      <ScrollView keyboardShouldPersistTaps="always"> 
      <View style={styles.container}>
            <Card style={styles.Cover}>
                <Card.Title style={styles.Title}
                    title={item.name}
                    titleStyle={{fontSize:25}}
                    subtitle={item.address}
                    left={(props) => <Avatar.Image size={50} source={iconGender} />}
                />
                <Card.Title
                    title="Tanggal Lahir"
                    titleStyle={{fontSize:12}}
                    subtitle={item.birthdate}
                    subtitleStyle={{fontSize:18}}
                />
                    <Divider />
                <Card.Title
                    title="Tanggal Meninggal"
                    titleStyle={{fontSize:12}}
                    subtitle={item.diedate}
                    subtitleStyle={{fontSize:18}}
                />
                <Divider />
                <Card.Actions>
                  <Button onPress={() => {navigation.navigate('AddPerson', { item:item })}}>Tambah</Button>
                  <Button color="green" onPress={() => {navigation.navigate('EditPerson', { item:item })}}>Edit</Button>
                  <Button color="red" loading={loadingButton} disabled={disabledButton} onPress={() =>  buttonAlert(_id)}>Hapus</Button>
                </Card.Actions>
            </Card>
                <View style={styles.Member}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={filter(id)}
                    keyExtractor={(person) => person._id}
                    renderItem={({ item }) => {
                      if(item.tags[0] == 'assistant')
                      {
                        var subtitle = 'Pasangan';
                        var right_icon = 'human-male-female'
                      }
                      else{
                        var subtitle = 'Anak';
                        var right_icon = 'chevron-right'
                      }

                      if(item.gender == 'M')
                      {
                        var iconGender = require(`../../assets/M.png`)
                      }
                      else if(item.gender == 'F')
                      {
                        var iconGender = require(`../../assets/F.png`)
                      }
                      else{
                        var iconGender = require(`../../assets/FM.png`)
                      }
                    return (
                        <List.Item
                            title={item.name}
                            description={subtitle}
                            left={(props) => <Avatar.Image size={35} source={iconGender} />}
                            right={props => <List.Icon {...props} icon={right_icon} />}
                            onPress={() => navigation.push('DetailFamily', { item:item })}
                        />
                    );
                    }}
                />
                </View>
        </View>
        </ScrollView>
    );
}

DetailFamilyScreen.navigationOptions = ({ navigation }) => {
    return {
      title : '',
      headerStyle: {
        elevation: 0, // remove shadow on Android
        shadowOpacity: 0, // remove shadow on iOS
      },
      headerRight: () => (
        <IconButton
          icon="home"
          color="black"
          size={25}
          onPress={() => navigation.navigate('Home')}
        />
      ),
        
      }
     
  };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 10,
    },
    Member: {
        marginTop: 15
    },
    Cover:{
      marginBottom: 10,
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      borderRadius:10
    },
    Title:{
      backgroundColor:'#eeeeee',
      borderTopLeftRadius: 10,
      borderTopRightRadius:10
    },
    Member:{
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
});

export default DetailFamilyScreen;