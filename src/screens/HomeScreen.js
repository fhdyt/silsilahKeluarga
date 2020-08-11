import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, TouchableOpacity, FlatList } from 'react-native';
import { Text } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';
import server from '../api/server';


const HomeScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState([]);

    const getResult = async id => {
        setLoading(true)
        const response = await server.get('/master')
          .then((response) => {
            setResult(response.data);
            console.log(response.data)
            setLoading(false)
          }, (error) => {
            console.log(error);
          });
      };
    
      useEffect(() => {
        getResult();
      }, []);

    return (
        <View style={styles.container}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={result}
                    keyExtractor={(person) => person._id}
                    renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('DetailFamily', { item:item })}
                        >
                        <View style={styles.Card}>
                            <Text style={{fontSize: 20}}>Keluarga</Text>
                            <Text h3 style={styles.Nama}>{item.name}</Text>
                            
                        </View>
                        </TouchableOpacity>
                    );
                    }}
                />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 50,
        marginHorizontal: 10,
        marginTop: 10
    },
    Card: {
    backgroundColor: '#f6f6f6',
    paddingHorizontal: 20,
    marginBottom: 10,
    paddingTop: 15,
    marginTop: 5,
    height: 200,
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
        justifyContent: 'flex-end',
    }
});

export default HomeScreen;