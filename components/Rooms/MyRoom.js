import React, {useState, useContext, useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Context} from '../../context.js';
import firestore from '@react-native-firebase/firestore';
import LinearGradient from 'react-native-linear-gradient';

const MyRoom = ({name, rooms, setRoom}) => {
  const {user, setNickname} = useContext(Context);

  const [members, setMembers] = useState(0);
  // const [notifications, setNotifications] = useState(0);

  const getNickname = async (room) => {
    const getName = await firestore()
      .collection('Users')
      .doc(user.email)
      .collection('Rooms')
      .doc(room)
      .get();
    setNickname(getName._data.nickname);
    firestore()
      .collection('Rooms')
      .doc(name)
      .collection('Members')
      .doc(getName._data.nickname)
      .set({
        Name: getName._data.nickname,
        Email: user.email,
        On: true,
      });
  };

  const getMembers = () => {
    firestore()
      .collection('Rooms')
      .doc(name)
      .collection('Members')
      .get()
      .then((result) => {
        let list = 0;
        result.forEach((dox) => {
          list++;
        });
        setMembers(list);
      });
  };

  useEffect(() => {
    getMembers();
  }, []);

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
        <Text style={styles.members}>{members} Members</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    color: 'white',
    fontFamily: 'Avenir Next',
  },
  gradient: {
    fontSize: 24,
    height: 80,
    paddingLeft: 24,
    paddingRight: 24,
    borderRadius: 26,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  members: {
    color: 'white',
    fontSize: 18,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    padding: 4,
    paddingLeft: 8,
    paddingRight: 8,
    fontFamily: 'Avenir',
  },
  room: {
    fontSize: 24,
    height: 80,
    margin: 10,
    borderRadius: 26,
    backgroundColor: '#ffa33c',
    shadowOffset: {width: 0, height: 10},
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 21,
  },
});

export default MyRoom;
