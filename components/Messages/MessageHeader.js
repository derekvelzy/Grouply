import React, {useContext} from 'react';
import {Context} from '../../context.js';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

const MessageHeader = () => {
  const {room, setRoom, leaveRoom} = useContext(Context);

  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.leave}
        onPress={() => {
          setRoom();
          leaveRoom();
        }}>
        <Text style={styles.leaveText}>Leave</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity style={styles.newGame} onPress={() => {}}>
        <Text style={styles.newGameText}>New Game</Text>
      </TouchableOpacity> */}
      <Text style={styles.headerText}>{room}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'white',
    flex: 0.11,
    padding: 18,
    paddingBottom: 8,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  headerText: {
    color: '#ffa33c',
    fontSize: 36,
    fontFamily: 'Avenir',
  },
  leave: {
    borderColor: 'rgb(180, 180, 180)',
    borderWidth: 1,
    borderRadius: 14,
    padding: 8,
    marginBottom: 4,
  },
  leaveText: {
    color: 'rgb(100, 100, 100)',
    fontSize: 20,
    fontFamily: 'Avenir',
  },
  newGame: {
    backgroundColor: 'rgb(30, 30, 30)',
    borderRadius: 10,
    padding: 9,
    marginBottom: 4,
  },
  newGameText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Avenir',
  },
});

export default MessageHeader;
