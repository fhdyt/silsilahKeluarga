import React, { useContext, useState } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { Context as MemberContext } from '../context/MemberContext';
import { RadioButton, Divider, ToggleButton } from 'react-native-paper';

import { TextInput, Switch, Button, Headline, IconButton } from 'react-native-paper';

const AddPersonScreen = ({ navigation }) => {
  const id = navigation.state.params.item.id;
  const item = navigation.state.params.item
  const { state, add_member } = useContext(MemberContext);

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [color, setColor] = useState('#9e9e9e');
  const [birthdate, setBirthdate] = useState('');
  const [diedate, setDiedate] = useState('');
  const [gender, setGender] = useState('M');
  const [tags, setTags] = useState(false);

  const [loadingButton, setLoadingButton] = useState(false)
  const [disabledButton, setDisabledButton] = useState(false)

  const onToggleSwitch = () => setTags(!tags);
    return (
      <ScrollView>
        <View style={styles.container}>
        <Headline>Tambah Anggota Keluarga</Headline>
          <View style={styles.Pasangan}>
            <Text style={{alignSelf:'center', fontSize:16}}>Suami / Istri</Text>
            <Switch value={tags} color="#6139EE" onValueChange={onToggleSwitch} />
            </View>
            
            
            <TextInput
              label="Nama"
              value={name}
              onChangeText={setName}
              mode='outlined'
              maxLength={20}
            />
            <TextInput
              label="Alamat"
              value={address}
              onChangeText={setAddress}
              mode='outlined'
            />
            <TextInput
              label="Kontak"
              value={contact}
              onChangeText={setContact}
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
            <View style={styles.RadioButton}>
            <RadioButton.Group onValueChange={gender => setGender(gender)} value={gender}>
              <RadioButton.Item color="#6139EE" label="Pria" value="M" />
              <Divider/>
              <RadioButton.Item color="#6139EE" label="Wanita" value="F" />
            </RadioButton.Group>
            </View>

            <View style={[styles.Color]}>
              <Text style={{fontSize:16, color:color, fontWeight:'bold'}}>Warna Kotak</Text>
            <ToggleButton.Row
              onValueChange={color => setColor(color)}
              value={color}>
              <ToggleButton mode="contained" size={40} color="#9e9e9e" icon="square" value="#9e9e9e" />
              <ToggleButton mode="contained" size={40} color="#2979ff" icon="square" value="#2979ff" />
              <ToggleButton mode="contained" size={40} color="#ec407a" icon="square" value="#ec407a" />
              <ToggleButton mode="contained" size={40} color="#43a047" icon="square" value="#43a047" />
              <ToggleButton mode="contained" size={40} color="#6139EE" icon="square" value="#6139EE" />
            </ToggleButton.Row>
            </View>

            <Button
              loading={loadingButton}
              disabled={disabledButton}
              icon="content-save"
                mode="contained" 
                onPress={() => {
                  setLoadingButton(true);
                  setDisabledButton(true);
                  add_member({ id, name, address, contact, color, birthdate, gender, diedate, tags },() => navigation.navigate('DetailFamily', { item:item }))
                }
              }
            >Simpan</Button>
        </View>       
        </ScrollView>
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
      },
      RadioButton: {
        backgroundColor: '#F6F6F6',
        marginTop: 5,
        marginBottom:5,
        borderColor: '#888888',
        borderWidth: 1,
        borderRadius: 5
      },
      Color: {
        flexDirection:'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom:15,
        borderColor: '#888888',
        borderWidth: 1,
        borderRadius: 5,
        paddingVertical:10
      }
});

export default AddPersonScreen;