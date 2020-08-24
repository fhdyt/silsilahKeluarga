import React, { useContext, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Context as MemberContext } from '../context/MemberContext';
import { RadioButton, Divider, ToggleButton } from 'react-native-paper';

import { TextInput, Switch, Button, Headline } from 'react-native-paper';

const EditPersonScreen = ({ navigation }) => {
  const pid = navigation.state.params.item.pid;
  const item = navigation.state.params.item
  const { state, edit_member } = useContext(MemberContext);
  const member = state.personData.find(p => p._id === item._id);
    if(member.tags[0] == 'assistant' ){
        var memberTags = true
        }
        else{
        var memberTags = false
        }
  const [name, setName] = useState(member.name);
  const [address, setAddress] = useState(member.address);
  const [contact, setContact] = useState(member.contact);
  const [color, setColor] = useState(member.color);
  const [birthdate, setBirthdate] = useState(member.birthdate);
  const [diedate, setDiedate] = useState(member.diedate);
  const [gender, setGender] = useState(member.gender);
  const [tags_status, setTags_status] = useState(memberTags);

  
  const [loadingButton, setLoadingButton] = useState(false)
  const [disabledButton, setDisabledButton] = useState(false)

  const onToggleSwitch = () => setTags_status(!tags_status);
    return (
        <View style={styles.container}>
          <Headline>Edit</Headline>
          <View style={styles.Pasangan}>
            <Text style={{alignSelf:'center', fontSize:16}}>Suami / Istri</Text>
            <Switch color="#6139EE" value={tags_status} onValueChange={onToggleSwitch} />
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
              <Divider />
              <RadioButton.Item color="#6139EE" label="Wanita" value="F" />
            </RadioButton.Group>
            </View>

            <View style={[styles.Color]}>
              <Text style={{fontSize:16, color:color}}>Warna Kotak</Text>
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
              icon="account-edit"
              mode="contained"
                onPress={() => {
                  setLoadingButton(true);
                  setDisabledButton(true);
                  edit_member({ _id:item._id, id:item.id, pid, name, address, contact, color, birthdate, gender, diedate, tags_status },() => navigation.navigate('Home'))
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
        marginTop: 10,
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

export default EditPersonScreen;