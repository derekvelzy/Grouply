import React, {useContext, useState, useEffect} from 'react';
import {Context} from '../context.js';
import {StyleSheet, View, Text, Button} from 'react-native';
import Login from './Login';
import Messages from './Messages/Messages.js';
import Rooms from './Rooms/Rooms.js';

const Home = () => {
  const {room} = useContext(Context);

  if (room) {
    return <Messages />;
  } else {
    return <Rooms />;
  }
};

const styles = StyleSheet.create({
  StyledView: {},
  view: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});

export default Home;
