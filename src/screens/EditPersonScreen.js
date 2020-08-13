import React, { useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Input } from 'react-native-elements';
import { Context as MemberContext } from '../context/MemberContext';
import { RadioButton } from 'react-native-paper';

import { TextInput, Switch, Button } from 'react-native-paper';

const EditPersonScreen = ({ navigation }) => {
  const pid = navigation.state.params.item.pid;
  const item = navigation.state.params.item
  const { state, edit_member } = useContext(MemberContext);
  const member = state.find(p => p._id === item._id);
    if(member.tags[0] == 'assistant' ){
        var memberTags = true
        }
        else{
        var memberTags = false
        }
  const [name, setName] = useState(member.name);
  const [address, setAddress] = useState(member.address);
  const [birthdate, setBirthdate] = useState(member.birthdate);
  const [diedate, setDiedate] = useState(member.diedate);
  const [gender, setGender] = useState(member.gender);
  const [tags, setTags] = useState(memberTags);

  
  const [loadingButton, setLoadingButton] = useState(false)
  const [disabledButton, setDisabledButton] = useState(false)

  const onToggleSwitch = () => setTags(!tags);
    return (
        <View style={styles.container}>
          <View style={styles.Pasangan}>
            <Text style={{alignSelf:'center'}}>Suami / Istri</Text>
            <Switch value={tags} onValueChange={onToggleSwitch} />
            </View>
            <Text h4>Edit Anggota Keluarga</Text>
            
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
                  edit_member({ _id:item._id, id:item.id, pid, name, address, birthdate, gender, diedate, tags },() => navigation.navigate('DetailFamily', { item:item }))
                }
              }
            >Edit</Button>
        </View>
    );
}

EditPersonScreen.navigationOptions = ({ navigation }) => {
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

export default EditPersonScreen;