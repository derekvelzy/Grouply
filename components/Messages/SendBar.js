import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const SendBar = ({draft, setDraft, send}) => {
  return (
    <View>
      <TextInput
        placeholder="send"
        style={styles.sendInput}
        value={draft}
        onChangeText={(e) => setDraft(e)}
      />
      <TouchableOpacity
        style={styles.sendButton}
        onPress={() => {
          send();
          setDraft('');
        }}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={['#ffa33c', '#e7605c']}
          style={styles.buttonGradient}>
          <Text style={styles.sendText}>S</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonGradient: {
    borderRadius: 40,
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButton: {
    position: 'absolute',
    bottom: 0,
    borderRadius: 30,
    marginBottom: 50,
    right: 15,
    height: 40,
    width: 50,
    shadowOffset: {width: 0, height: 8},
    shadowColor: 'rgb(100, 20, 20)',
    shadowOpacity: 0.6,
    shadowRadius: 14,
  },
  sendInput: {
    height: 50,
    padding: 15,
    position: 'absolute',
    bottom: 0,
    right: 90,
    left: 0,
    marginLeft: 15,
    marginBottom: 40,
    backgroundColor: 'white',
    paddingLeft: 14,
    paddingRight: 14,
    fontSize: 18,
    borderRadius: 30,
    shadowOffset: {width: 0, height: 10},
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowRadius: 18,
    elevation: 21,
    fontFamily: 'Avenir',
  },
  sendText: {
    color: 'white',
  },
});

export default SendBar;
