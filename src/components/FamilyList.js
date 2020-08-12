import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
const FamilyList = ({ results }) => {

    return (
      <>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={results}
                    keyExtractor={(person) => person._id}
                    renderItem={({ item }) => {
                    return (
                        <ListItem
                            title={item.name}
                            subtitle={item._id}
                            bottomDivider
                            chevron
                            onPress={() => navigation.navigate('DetailFamily', { item:item })}
                        />
                    );
                    }}
                />
        </>
    );
}

const styles = StyleSheet.create({

});

export default FamilyList;