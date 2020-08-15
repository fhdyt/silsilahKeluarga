import React, { useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { Context as MemberContext } from '../context/MemberContext';
import { RadioButton } from 'react-native-paper';

import { TextInput, Switch, Button } from 'react-native-paper';

const AddPersonScreen = ({ navigation }) => {
  const id = navigation.state.params.item.id;
  const item = navigation.state.params.item
  const { state, add_member } = useContext(MemberContext);

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [diedate, setDiedate] = useState('');
  const [gender, setGender] = useState('M');
  const [tags, setTags] = useState(false);

  const [loadingButton, setLoadingButton] = useState(false)
  const [disabledButton, setDisabledButton] = useState(false)

  const onToggleSwitch = () => setTags(!tags);
    return (
        <View style={styles.container}>
          <View style={styles.Pasangan}>
            <Text style={{alignSelf:'center'}}>Suami / Istri</Text>
            <Switch value={tags} onValueChange={onToggleSwitch} />
            </View>
            <Text h4>Tambah Anggota Keluarga</Text>
            
            <TextInput
              label="Nama"
              value={name}
              onChangeText={setName}
              mode='outlined'
            />
            <TextInput
              label="Alamat"
              value={address}
              onChangeText={setAddress}
              mode='outlined'
            />
            <TextInput
              label="Tanggal Lahir"
              value={birthdate}
              onChangeText={setBirthdate}
              mode='outlined'
            />
            <TextInput
              label="Tanggal Meninggal"
              value={diedate}
              onChangeText={setDiedate}
              mode='outlined'
            />
            <RadioButton.Group onValueChange={gender => setGender(gender)} value={gender}>
              <RadioButton.Item label="Pria" value="M" />
              <RadioButton.Item label="Wanita" value="F" />
            </RadioButton.Group>
            <Button
              loading={loadingButton}
              disabled={disabledButton}
                mode="contained" 
                onPress={() => {
                  setLoadingButton(true);
                  setDisabledButton(true);
                  add_member({ id, name, address, birthdate, gender, diedate, tags },() => navigation.navigate('DetailFamily', { item:item }))
                }
              }
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
      Pasangan: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      }
});

export default AddPersonScreen;