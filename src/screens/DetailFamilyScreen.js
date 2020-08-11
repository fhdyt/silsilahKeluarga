import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Button, FlatList } from 'react-native';
import { Text, ListItem } from 'react-native-elements';
import { Context as MemberContext } from '../context/MemberContext';
import { NavigationEvents } from 'react-navigation';
const DetailFamilyScreen = ({ navigation }) => {
    const item = navigation.state.params.item;

    const { state, fetchMember } = useContext(MemberContext)

    return (
      <>
      <NavigationEvents onWillFocus={() => fetchMember({id:item.id})} />
        <View style={styles.container}>
                <Button title='Add Member' onPress={() => {navigation.navigate('AddPerson', { item:item })}} />
                
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={state}
                    keyExtractor={(person) => person._id}
                    renderItem={({ item }) => {
                    return (
                        <ListItem
                            title={item.name}
                            subtitle={item._id}
                            bottomDivider
                            chevron
                            onPress={() => navigation.push('DetailFamily', { item:item })}
                        />
                    );
                    }}
                />
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
    Card: {
    backgroundColor: '#f6f6f6',
    paddingHorizontal: 5,
    marginBottom: 10,
    marginTop: 5,
    marginHorizontal: 5,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    },
    Nama: {
        
    },
});

export default DetailFamilyScreen;