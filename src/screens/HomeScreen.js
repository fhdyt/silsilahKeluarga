import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, Button, TouchableOpacity, FlatList, Alert } from 'react-native';
import { Context as MemberContext } from '../context/MemberContext';
import { Text } from 'react-native-elements'
import { Card, Title, Paragraph } from 'react-native-paper';

const HomeScreen = ({ navigation }) => {
    const { state, fetchFamily } = useContext(MemberContext);
    
    useEffect(() => {
        fetchFamily();
      }, []);

      const filter = () => {
        return state.filter(result => {
          return result.pid === '';
        });
      };

    return (
        <View style={styles.container}>
        <FlatList
                    showsVerticalScrollIndicator={false}
                    data={filter()}
                    keyExtractor={(person) => person._id}
                    renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('DetailFamily', { item:item })}
                        >
                        <View style={styles.Card}>
                            <Text h3 style={styles.Nama}>{item.name}</Text>    
                            <Text style={{fontSize: 18}}>Keluarga Besar</Text>
                        </View>
                        </TouchableOpacity>
                    );
                    }}
                />
        </View>
    );
}

// HomeScreen.navigationOptions = ({ navigation }) => {
//     return {
//       header: () => false,
//     };
//   };

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
    }
});

export default HomeScreen;