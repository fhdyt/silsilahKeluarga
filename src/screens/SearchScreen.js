import React, { useState, useContext } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, ListItem } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';
import { Searchbar } from 'react-native-paper';
import { Context as MemberContext } from '../context/MemberContext';

const SearchScreen = ({navigation}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const { state } = useContext(MemberContext);

    const findQuery =(key) =>{
        return state.filter(result => {
            if(!key)
            {
                return null
            }
            return result.name.match(new RegExp(`${key}`, 'gi'));
          });
    }


    return (
        <View style={styles.container}>
            <SafeAreaView forceInset={{ top: 'always' }}>
            <Searchbar
                placeholder="Search"
                onChangeText={setSearchQuery}
                value={searchQuery}
            />
            <View>
            <FlatList
                    showsVerticalScrollIndicator={false}
                    data={findQuery(searchQuery)}
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
                            onPress={() => navigation.navigate('DetailFamily', { item:item })}
                        />
                    );
                    }}
                />
            </View>
      </SafeAreaView>
      </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 100,
        marginHorizontal: 10,
        marginTop: 10
      },

});

export default SearchScreen;