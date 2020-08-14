import React, { useContext } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import { Text, ListItem } from 'react-native-elements';
import { Context as MemberContext } from '../context/MemberContext';
import { Subheading, Button, Card} from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';

const DetailFamilyScreen = ({ navigation }) => {
    const item = navigation.state.params.item
    const id = navigation.state.params.item.id;
    const _id = navigation.state.params.item._id;
    const { state, deleteMember } = useContext(MemberContext)
    
    var filter = id => {
      return state.personData.filter(result => {
        return result.pid === id;
      });
    };

    const buttonAlert = (_id) =>
    {
        Alert.alert(
        "Peringatan !",
        "Menghapus berarti menghapus semua keluarga pada anggota ini",
        [
            {
            text: "Batal",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
            },
            { text: "Hapus", onPress: () => deleteMember(_id, () => {navigation.navigate('Home')}) }
        ],
        { cancelable: false }
        );
    }

    return (
      <View style={styles.container}>
            <Card style={styles.Cover}>
                <Card.Title style={styles.Title}
                    title={item.name}
                    subtitle={item.address}
                />
                <Card.Actions>
                <Button onPress={() => {navigation.navigate('AddPerson', { item:item })}}>Tambah</Button>
                <Button color="green" onPress={() => {navigation.navigate('EditPerson', { item:item })}}>Edit</Button>
                <Button color="red" onPress={() => buttonAlert(_id)}>Hapus</Button>
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
                      }
                      else{
                        var subtitle = 'Anak';
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
                        <ListItem
                            title={item.name}
                            subtitle={subtitle}
                            bottomDivider
                            chevron
                            leftAvatar={{ source: iconGender }}
                            onPress={() => navigation.push('DetailFamily', { item:item })}
                        />
                    );
                    }}
                />
                </View>
        </View>
    );
}

DetailFamilyScreen.navigationOptions = () => {
    return {
      title : '',
      headerStyle: {
        elevation: 0, // remove shadow on Android
        shadowOpacity: 0, // remove shadow on iOS
      },
      
    };
  };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 10,
        marginBottom:100
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
      marginBottom: 10,
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