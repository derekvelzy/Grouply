import React, {useContext, useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import Home from './Home.js';
import Login from './Login.js';
import auth from '@react-native-firebase/auth';
import {Context} from '../context.js';

const Index = () => {
  const {user, setUser} = useContext(Context);
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = (user) => {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  };

  useEffect(() => {
    const sub = auth().onAuthStateChanged(onAuthStateChanged);
    return sub;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (initializing) {
    return null;
  }

  if (user) {
    return <Home />;
  } else {
    return <Login />;
  }
};

export default Index;
