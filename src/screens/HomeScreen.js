import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, Button, TouchableOpacity, FlatList, Alert } from 'react-native';
import { Context as MemberContext } from '../context/MemberContext';
import { Text } from 'react-native-elements'
import { Card, Title, Paragraph } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
const HomeScreen = ({ navigation }) => {
    const { state, fetchFamily, infoFamily } = useContext(MemberContext);
    
    useEffect(() => {
        fetchFamily();
        infoFamily();
      }, []);

      console.log(state.info)
      const filter = () => {
        return state.personData.filter(result => {
          return result.pid === '';
        });
      };

    return (
        <View style={styles.container}>

            <Button title="pohon keluarga" onPress={() => navigation.navigate('WebDiagram')}/>
        <FlatList
                    showsVerticalScrollIndicator={false}
                    data={filter()}
                    keyExtractor={(person) => person._id}
                    renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('DetailFamily', { item:item })}
                        >
                        <Card.Title
                            title={item.name}
                            subtitle="Keluarga Besar"
                        />
                        </TouchableOpacity>
                    );
                    }}
                />
        </View>
    );
}

HomeScreen.navigationOptions = ({ navigation }) => {
    return {
        headerRight: () => (
            <View style={{marginRight:12}}>
                <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                <AntDesign name="search1" size={27} color="black" />
            </TouchableOpacity>
            </View>
          ),
    };
  };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 10,
        marginBottom: 50,
    },
    Card: {
    backgroundColor: '#eeeeee',
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginVertical: 5,
    height: 200,
    marginHorizontal: 10,
    borderRadius: 10,
    },
    Nama: {
        justifyContent: 'flex-end',
    },
});

export default HomeScreen;