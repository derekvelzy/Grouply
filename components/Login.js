import React, {useContext, useState, useEffect} from 'react';
import {StyleSheet, View, Text, TextInput, Button} from 'react-native';
import auth from '@react-native-firebase/auth';
import {Context} from '../context.js';

const Login = () => {
  const {login, signup} = useContext(Context);

  const [type, setType] = useState(false);
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');

  if (type) {
    return (
      <View style={styles.view}>
        <TextInput
          placeholder="First Name"
          style={styles.input}
          value={first}
          onChangeText={(e) => setFirst(e)}
        />
        <TextInput
          placeholder="Last Name"
          style={styles.input}
          value={last}
          onChangeText={(e) => setLast(e)}
        />
        <TextInput
          placeholder="email"
          style={styles.input}
          value={email}
          onChangeText={(e) => setEmail(e)}
        />
        <TextInput
          placeholder="password"
          style={styles.input}
          value={pass}
          onChangeText={(e) => setPass(e)}
        />
        <Button
          title="Create Account"
          onPress={() => signup(email, pass, first, last)}
        />
        <Button title="cancel" onPress={() => setType(false)} />
      </View>
    );
  } else {
    return (
      <View style={styles.view}>
        <TextInput
          placeholder="email"
          style={styles.input}
          value={email}
          onChangeText={(e) => setEmail(e)}
        />
        <TextInput
          placeholder="password"
          style={styles.input}
          value={pass}
          onChangeText={(e) => setPass(e)}
        />
        <Button title="login" onPress={() => login(email, pass)} />
        <Button title="signup" onPress={() => setType(true)} />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  view: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  signinbutton: {
    alignSelf: 'center',
  },
  input: {
    borderColor: 'rgb(200, 200, 200)',
    borderWidth: 1,
    width: 300,
    height: 40,
  },
});

export default Login;
