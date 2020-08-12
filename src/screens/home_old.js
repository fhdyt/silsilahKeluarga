import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, Button, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { Text } from 'react-native-elements';
import { Context as MemberContext } from '../context/MemberContext';
import { NavigationEvents } from 'react-navigation';
import SkeletonContent from 'react-native-skeleton-content';

const HomeScreen = ({ navigation }) => {
    const { state, fetchMaster } = useContext(MemberContext);
    const { width, height } = Dimensions.get("window");
    
    return (
        <>
        <NavigationEvents onWillFocus={() => {fetchMaster()}} />
        <View style={styles.container}>
        {state.loading ? (
            <SkeletonContent
                containerStyle={{flex: 1, alignItems: 'center', marginTop: 15}}
                layout={[
                { key: 'positif', 
                    height : 200, 
                    width: width-50,
                    borderRadius:10, 
                    marginBottom: 20 
                },
                ]}>  
            </SkeletonContent>
        ):(
            <>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={state.data}
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
            </>
        )}
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