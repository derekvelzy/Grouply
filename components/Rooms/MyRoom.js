import React, {useState, useContext} from 'react';
import {StyleSheet, View, Text, Button, TouchableOpacity} from 'react-native';
import {Context} from '../../context.js';
import firestore from '@react-native-firebase/firestore';
import LinearGradient from 'react-native-linear-gradient';

const MyRoom = ({key, name, rooms, setRoom}) => {
  const {user, setNickname} = useContext(Context);

  const getNickname = async (room) => {
    const name = await firestore()
      .collection('Users')
      .doc(user.email)
      .collection('Rooms')
      .doc(room)
      .get();
    setNickname(name._data.nickname);
  };

  return (
    <TouchableOpacity
      style={styles.room}
      onPress={() => {
        setRoom(name);
        getNickname(name);
      }}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 0.6, y: 5.2}}
        colors={['#ffa33c', '#e7605c', '#ff4618']}
        style={styles.gradient}>
        <Text style={styles.text}>{name}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    color: 'white',
  },
  gradient: {
    fontSize: 24,
    height: 80,
    padding: 24,
    borderRadius: 20,
  },
  room: {
    fontSize: 24,
    height: 80,
    margin: 10,
    borderRadius: 20,
    backgroundColor: '#ffa33c',
    shadowOffset: {width: 0, height: 10},
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 21,
  },
});

export default MyRoom;
