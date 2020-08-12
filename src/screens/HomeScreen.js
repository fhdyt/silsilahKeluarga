import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, Button, TouchableOpacity, FlatList, Dimensions, Alert } from 'react-native';
import { Text } from 'react-native-elements';
import { Context as MemberContext } from '../context/MemberContext';
import { NavigationEvents } from 'react-navigation';

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

    buttonAlert = (id) =>
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
            { text: "Hapus", onPress: () => console.log(id) }
        ],
        { cancelable: false }
        );
    }


    return (
        <>
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
                            <Text style={{fontSize: 20}}>Keluarga</Text>
                            <Text h3 style={styles.Nama}>{item.name}</Text>
                            
                        </View>
                        </TouchableOpacity>
                    );
                    }}
                />
                <Button title="Press" onPress={() => buttonAlert('fikri')}/>
        </View>
        </>
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
    marginTop: 15,
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