import React, { useContext } from 'react';
import { View, StyleSheet, Button, FlatList } from 'react-native';
import { Text, ListItem } from 'react-native-elements';
import { Context as MemberContext } from '../context/MemberContext';

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

    return (
      <>
        <View style={styles.container}>
                <Button title='Tambah Keluarga' onPress={() => {navigation.navigate('AddPerson', { item:item })}} />
                <Button title='Hapus' onPress={() => deleteMember(_id, () => {navigation.navigate('DetailFamily', { item:item })})} />
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

DetailFamilyScreen.navigationOptions = ({ navigation }) => {
    const name = navigation.state.params.item.name;

    return {
      title : name,
      headerStyle: {
        elevation: 0, // remove shadow on Android
        shadowOpacity: 0, // remove shadow on iOS
        backgroundColor: 'transparent'
      },
      
    };
  };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 5,
        marginHorizontal: 10,
    },
    Member: {
        marginTop: 15
    },
});

export default DetailFamilyScreen;