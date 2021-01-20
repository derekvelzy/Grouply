import React, {useContext} from 'react';
import {Context} from '../context.js';
import {StyleSheet} from 'react-native';
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

export default Home;
