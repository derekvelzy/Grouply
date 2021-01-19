import React, {useState, useContext, useEffect} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Context} from '../../context.js';
import LinearGradient from 'react-native-linear-gradient';

const Message = ({email, name, text}) => {
  const {user} = useContext(Context);

  if (user.email === email) {
    return (
      <View style={styles.myView}>
        <View style={styles.gradientContainer}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 5}}
            colors={['#ffa33c', '#e7605c']}
            style={styles.myTextContainer}>
            <Text style={styles.myText}>{text}</Text>
          </LinearGradient>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.view}>
        <Text style={styles.fullName}>{name}</Text>
        <View style={styles.whiteView}>
          <View style={styles.icon}>
            <Text>{name.substring(0, 1)}</Text>
          </View>
          <TouchableOpacity style={styles.textContainer}>
            <Text style={styles.text}>{text}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  myView: {
    justifyContent: 'flex-end',
    height: 'auto',
    flexDirection: 'row',
    margin: 11,
  },
  fullName: {
    marginLeft: 74,
    marginTop: 8,
    color: 'rgb(160, 160, 160)',
  },
  whiteView: {
    height: 'auto',
    flexDirection: 'row',
    margin: 10,
    marginTop: 4,
  },
  gradientContainer: {
    marginLeft: 7,
    borderRadius: 23,
    shadowOffset: {width: 0, height: 8},
    shadowColor: 'rgb(100, 20, 20)',
    shadowOpacity: 0.3,
    shadowRadius: 14,
  },
  icon: {
    backgroundColor: 'white',
    height: 42,
    width: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {width: 0, height: 10},
    shadowColor: 'rgb(100, 100, 100)',
    shadowOpacity: 0.2,
    shadowRadius: 12,
  },
  myText: {
    fontSize: 16,
    color: 'white',
  },
  text: {
    fontSize: 16,
  },
  myTextContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flexShrink: 1,
    height: 'auto',
    backgroundColor: 'white',
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 23,
  },
  textContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flexShrink: 1,
    height: 'auto',
    backgroundColor: 'white',
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    fontSize: 18,
    borderRadius: 23,
    marginLeft: 7,
    shadowOffset: {width: 0, height: 10},
    shadowColor: 'rgb(100, 100, 100)',
    shadowOpacity: 0.2,
    shadowRadius: 12,
  },
});

export default Message;
