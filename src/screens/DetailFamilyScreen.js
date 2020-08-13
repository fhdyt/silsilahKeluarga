import React, { useContext } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import { Text, ListItem } from 'react-native-elements';
import { Context as MemberContext } from '../context/MemberContext';
import { Subheading, Button} from 'react-native-paper';
const DetailFamilyScreen = ({ navigation }) => {
    const item = navigation.state.params.item
    const id = navigation.state.params.item.id;
    const _id = navigation.state.params.item._id;
    const { state, deleteMember } = useContext(MemberContext)

    const filter = id => {
      return state.filter(result => {
        return result.pid === id;
      });
    };

    buttonAlert = (_id) =>
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
            { text: "Hapus", onPress: () => deleteMember(_id, () => {navigation.navigate('DetailFamily', { item:item })}) }
        ],
        { cancelable: false }
        );
    }

    return (
      <>
        <View style={styles.container}>
          <View style={styles.Cover}>
            <Text h3>{item.name}</Text>
            <Subheading>{item.address}</Subheading>
            <Subheading>{item.diedate}</Subheading>
          </View>
              <View style={styles.ButtonAction}>
              <Button title='Tambah' mode='contained' icon="plus" onPress={() => {navigation.navigate('AddPerson', { item:item })}} >Tambah</Button>
              <Button mode='contained' icon="pencil" color="black" onPress={() => {navigation.navigate('EditPerson', { item:item })}} >Edit</Button>
              <Button mode='contained' icon="delete" color="red" onPress={() => buttonAlert(_id)} >Hapus</Button>
                
              </View>
                <View style={styles.Member}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={filter(id)}
                    keyExtractor={(person) => person._id}
                    renderItem={({ item }) => {
                      if(item.gender == 'M')
                      {
                        var iconGender = require(`../../assets/M.png`)
                      }
                      else{
                        var iconGender = require(`../../assets/F.png`)
                      }
                    return (
                        <ListItem
                            title={item.name}
                            subtitle={item.address}
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
        </>
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
        marginBottom: 250,
        marginHorizontal: 10,
    },
    Member: {
        marginTop: 15
    },
    Cover:{
      justifyContent: 'flex-end',
      height: 200,
      backgroundColor:'#eeeeee',
      borderRadius: 10,
      marginBottom: 10,
      paddingHorizontal:15,
      paddingVertical:15
    },
    ButtonAction:{
      flexDirection:'row',
      justifyContent: 'space-between',
    }
});

export default DetailFamilyScreen;