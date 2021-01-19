/* eslint-disable react-native/no-inline-styles */
import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Context} from '../../context.js';
import firestore from '@react-native-firebase/firestore';

const Room = ({key, name, rooms, setRoom}) => {
  const {user, setNickname} = useContext(Context);
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [selection, setSelection] = useState('');
  const [error, setError] = useState(false);
  const [nicknameErr, setNicknameErr] = useState(false);
  const [writeNickname, setWriteNickname] = useState('');

  const check = () => {
    if (writeNickname.length === 0) {
      setNicknameErr(true);
    } else {
      for (let i = 0; i < rooms.length; i++) {
        if (rooms[i].name === selection) {
          if (rooms[i].pass === password) {
            setNicknameErr(false);
            setError(false);
            setRoom(selection);
            firestore()
              .collection('Users')
              .doc(user.email)
              .collection('Rooms')
              .doc(selection)
              .set({
                name: selection,
                nickname: writeNickname,
              });
            setNickname(writeNickname);
          } else {
            setError(true);
          }
        }
      }
    }
  };

  return (
    <View
      style={
        !open
          ? {
              height: 80,
              padding: 24,
              margin: 10,
              borderRadius: 20,
              backgroundColor: 'white',
              shadowOffset: {width: 0, height: 10},
              shadowColor: 'black',
              shadowOpacity: 0.2,
              shadowRadius: 12,
              elevation: 21,
            }
          : {
              height: 246,
              padding: 24,
              margin: 10,
              borderRadius: 20,
              backgroundColor: 'white',
              shadowOffset: {width: 0, height: 10},
              shadowColor: 'black',
              shadowOpacity: 0.2,
              shadowRadius: 12,
              elevation: 21,
            }
      }>
      <Text
        onPress={() => {
          setError(false);
          setNicknameErr(false);
          setSelection(name);
          setOpen(!open);
        }}
        style={styles.roomName}>
        {name}
      </Text>
      <View style={!open ? {display: 'none'} : {display: 'flex'}}>
        <Text
          style={
            error
              ? {
                  marginTop: 10,
                  marginBottom: 10,
                  color: 'red',
                }
              : {
                  color: 'black',
                  marginTop: 10,
                  marginBottom: 10,
                }
          }>
          {error ? 'Incorrect Room Code' : 'Enter Room Code and Nickname'}
        </Text>
        <View
          style={{
            height: 40,
          }}>
          <TextInput
            style={
              nicknameErr
                ? {
                    backgroundColor: 'rgb(220, 220, 220)',
                    borderColor: 'red',
                    borderWidth: 1,
                    borderRadius: 20,
                    height: 54,
                    width: 250,
                    paddingLeft: 15,
                    marginBottom: 12,
                    marginTop: 6,
                  }
                : {
                    backgroundColor: 'rgb(220, 220, 220)',
                    borderRadius: 20,
                    height: 54,
                    width: 250,
                    paddingLeft: 15,
                    marginBottom: 12,
                    marginTop: 6,
                  }
            }
            placeholder="Nick Name"
            value={writeNickname}
            onChangeText={(e) => setWriteNickname(e)}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TextInput
              style={styles.passInput}
              placeholder="Code"
              value={password}
              onChangeText={(e) => setPassword(e)}
            />
            <TouchableOpacity style={styles.join} onPress={() => check()}>
              <Text style={styles.joinText}>Join</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  join: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(30, 30, 30)',
    height: 54,
    width: 74,
    borderRadius: 20,
    marginTop: 6,
  },
  joinText: {
    color: 'white',
  },
  roomName: {
    fontSize: 24,
  },
  passInput: {
    backgroundColor: 'rgb(220, 220, 220)',
    borderRadius: 20,
    height: 54,
    width: 250,
    paddingLeft: 15,
    marginBottom: 12,
    marginTop: 6,
  },
});

export default Room;
