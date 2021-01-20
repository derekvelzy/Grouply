import React, {createContext, useState} from 'react';
import {AppState} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {GoogleSignin} from '@react-native-community/google-signin';
import {googleWebClientID} from './keys.js';

GoogleSignin.configure({
  webClientId: googleWebClientID,
});

export const Context = createContext(null);

export const ConfigProvider = ({children}) => {
  const [user, setUser] = useState();
  const [room, setRoom] = useState();
  const [nickname, setNickname] = useState('');
  const [signupError, setSignupError] = useState(false);

  const leaveRoom = () => {
    firestore()
      .collection('Rooms')
      .doc(room)
      .collection('Members')
      .doc(nickname)
      .set({Name: nickname, Email: user.email, On: false});
  };

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

  const google = async () => {
    try {
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      return auth().signInWithCredential(googleCredential);
    } catch (e) {
      console.log('error signing in with google', e);
    }
  };

  return (
    <Context.Provider
      value={{
        google,
        user,
        setUser,
        login,
        signup,
        logout,
        room,
        setRoom,
        nickname,
        setNickname,
        leaveRoom,
      }}>
      {children}
    </Context.Provider>
  );
};
