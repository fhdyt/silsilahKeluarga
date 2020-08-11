import React, { useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Input } from 'react-native-elements';
import { Context as MemberContext } from '../context/MemberContext';
import { RadioButton } from 'react-native-paper';

import { TextInput, Switch, Button } from 'react-native-paper';

const AddPersonScreen = ({ navigation }) => {
  const id = navigation.state.params.item.id;

  const { add_member } = useContext(MemberContext);
  const [name, setName] = useState('');
  const [gender, setGender] = useState('M');

  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
    return (
        <View style={styles.container}>
            <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
            <Text h4>Tambah Anggota Keluarga</Text>
            <TextInput
              label="Nama"
              value={name}
              onChangeText={setName}
              mode='outlined'
            />
            <TextInput
              label="Alamat"
              value={name}
              onChangeText={setName}
              mode='outlined'
            />
            <RadioButton.Group onValueChange={gender => setGender(gender)} value={gender}>
              <RadioButton.Item label="Pria" value="M" />
              <RadioButton.Item label="Wanita" value="F" />
            </RadioButton.Group>
            <Button
              mode="outlined" 
              onPress={() => add_member({ name, id })}
            >Simpan</Button>
        </View>
    );
}

AddPersonScreen.navigationOptions = ({ navigation }) => {
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
        marginBottom: 50,
        marginHorizontal: 20,
      },
});

export default AddPersonScreen;