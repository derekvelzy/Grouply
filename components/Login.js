import React, {useContext, useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Context} from '../context.js';
import LinearGradient from 'react-native-linear-gradient';
import {GoogleSigninButton} from '@react-native-community/google-signin';

const Login = () => {
  const {google, login, signup} = useContext(Context);

  const [type, setType] = useState('main');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');

  if (type === 'main') {
    return (
      <View style={styles.mainView}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 2}}
          colors={['#ff913c', '#e7605c', '#ff4618']}
          style={styles.mainViewGrad}>
          <Text style={styles.title}>Grouply</Text>
          <TouchableOpacity
            style={styles.mainSignup}
            onPress={() => setType('signup')}>
            <Text
              style={{color: 'white', fontSize: 24, fontFamily: 'Avenir Next'}}>
              Signup
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.mainLogin}
            onPress={() => setType('login')}>
            <Text
              style={{
                color: '#ff913c',
                fontSize: 24,
                fontFamily: 'Avenir Next',
              }}>
              Login
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    );
  } else if (type === 'signup') {
    return (
      <View style={styles.view}>
        <Text style={styles.signupTitle}>Grouply</Text>
        <GoogleSigninButton
          onPress={() => google()}
          style={styles.googleButton}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
        />
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
          secureTextEntry={true}
          style={styles.input}
          value={pass}
          onChangeText={(e) => setPass(e)}
        />
        <View style={styles.gradButCont}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 2}}
            colors={['#ff913c', '#e7605c', '#ff4618']}
            style={styles.signupGrad}>
            <TouchableOpacity
              style={styles.signupBut}
              onPress={() => signup(email, pass, first, last)}>
              <Text style={styles.signupText}>Create Account</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
        <TouchableOpacity
          style={styles.cancelBut}
          onPress={() => setType('main')}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <View style={styles.view}>
        <Text style={styles.signupTitle}>Grouply</Text>
        <GoogleSigninButton
          onPress={() => google()}
          style={styles.googleButton}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
        />
        <TextInput
          placeholder="email"
          style={styles.input}
          value={email}
          onChangeText={(e) => setEmail(e)}
        />
        <TextInput
          placeholder="password"
          secureTextEntry={true}
          style={styles.input}
          value={pass}
          onChangeText={(e) => setPass(e)}
        />
        <View style={styles.gradButCont}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 2}}
            colors={['#ff913c', '#e7605c', '#ff4618']}
            style={styles.loginGrad}>
            <TouchableOpacity
              style={styles.loginBut}
              onPress={() => login(email, pass)}>
              <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
        <TouchableOpacity
          style={styles.cancelBut}
          onPress={() => setType('main')}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  cancelBut: {
    marginTop: 22,
  },
  cancelText: {
    fontSize: 22,
    textDecorationLine: 'underline',
    fontFamily: 'Avenir Next',
    marginTop: 20,
    alignSelf: 'center',
  },
  googleButton: {
    alignSelf: 'center',
    width: 200,
    height: 50,
  },
  gradButCont: {
    marginTop: 40,
    alignSelf: 'center',
  },
  input: {
    fontSize: 22,
    backgroundColor: 'rgb(224, 224, 224)',
    borderRadius: 20,
    marginTop: 20,
    height: 60,
    textAlign: 'center',
    fontFamily: 'Avenir',
    marginLeft: 30,
    marginRight: 30,
  },
  loginBut: {
    width: 120,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginGrad: {
    width: 120,
    height: 60,
    borderRadius: 20,
  },
  loginText: {
    color: 'white',
    fontSize: 22,
    fontFamily: 'Avenir Next',
  },
  mainView: {
    flex: 1,
  },
  mainViewGrad: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainLogin: {
    height: 60,
    width: 260,
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainSignup: {
    height: 60,
    width: 260,
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  signupBut: {
    width: 220,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signupGrad: {
    width: 220,
    height: 60,
    borderRadius: 20,
  },
  signupText: {
    color: 'white',
    fontSize: 22,
    fontFamily: 'Avenir Next',
  },
  signupTitle: {
    color: '#ff913c',
    fontSize: 40,
    marginBottom: 40,
    fontFamily: 'Avenir Next',
    alignSelf: 'center',
  },
  title: {
    color: 'white',
    fontSize: 50,
    marginBottom: 100,
    fontFamily: 'Avenir Next',
  },
  view: {
    justifyContent: 'center',
    flex: 1,
  },
});

export default Login;
