import React from 'react';
import {createContext, useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const Context = createContext(null);

export const ConfigProvider = ({children}) => {
  const [user, setUser] = useState();
  const [room, setRoom] = useState();
  const [nickname, setNickname] = useState('');
  const [signupError, setSignupError] = useState(false);

  const login = async (email, pass) => {
    try {
      auth().signInWithEmailAndPassword(email, pass);
    } catch (e) {
      console.log('error logging in', e);
    }
  };

  const signup = async (email, pass, first, last) => {
    try {
      await auth().createUserWithEmailAndPassword(email, pass);
      await firestore()
        .collection('Users')
        .doc(email.toLowerCase())
        .set({first, last})
        .then(() => {
          console.log('user added!');
        });
    } catch (e) {
      setSignupError(true);
      console.log('error signing up', e);
    }
  };

  const logout = async () => {
    try {
      auth().signOut();
    } catch (e) {
      console.log('error logging out', e);
    }
  };

  return (
    <Context.Provider
      value={{
        user,
        setUser,
        login,
        signup,
        logout,
        room,
        setRoom,
        nickname,
        setNickname,
      }}>
      {children}
    </Context.Provider>
  );
};
