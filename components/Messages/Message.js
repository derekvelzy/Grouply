import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {Context} from '../../context.js';
import LinearGradient from 'react-native-linear-gradient';
import firestore from '@react-native-firebase/firestore';

const Message = ({
  email,
  name,
  text,
  path,
  setReactMess,
  start,
  setSlider,
  setPopup,
}) => {
  const {user, room} = useContext(Context);

  const [reactions, setReactions] = useState([]);

  useEffect(() => {
    return firestore()
      .collection('Rooms')
      .doc(room)
      .collection('Messages')
      .doc(path)
      .collection('Reactions')
      .onSnapshot((querySnapshot) => {
        const list = [];
        querySnapshot.forEach((dox) => {
          const dat = dox.data();
          list.push(dat.emoji);
        });
        setReactions(list);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let i = 0;

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
        <View
          style={
            // eslint-disable-next-line react-native/no-inline-styles
            reactions.length === 0 ? {display: 'none'} : {display: 'flex'}
          }>
          <View style={styles.myEmojiShelf}>
            {reactions.map((e) => {
              i++;
              if (i < 7) {
                return <Text>{e}</Text>;
              }
            })}
            <Text
              style={
                i > 6
                  ? // eslint-disable-next-line react-native/no-inline-styles
                    {display: 'flex', color: 'rgb(100, 100, 100)'}
                  : // eslint-disable-next-line react-native/no-inline-styles
                    {display: 'none'}
              }>
              {' '}
              + {i - 6} more
            </Text>
          </View>
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
          <TouchableOpacity
            style={styles.textContainer}
            onPress={() => {
              // start(false);
              // setSlider(true);
              setReactMess(path);
              setPopup(true);
            }}>
            <Text style={styles.text}>{text}</Text>
          </TouchableOpacity>
        </View>
        <View
          style={
            // eslint-disable-next-line react-native/no-inline-styles
            reactions.length === 0 ? {display: 'none'} : {display: 'flex'}
          }>
          <View style={styles.emojiShelf}>
            {reactions.map((e) => {
              i++;
              if (i < 7) {
                return <Text>{e}</Text>;
              }
            })}
            <Text
              style={
                i > 6
                  ? // eslint-disable-next-line react-native/no-inline-styles
                    {display: 'flex', color: 'rgb(100, 100, 100)'}
                  : // eslint-disable-next-line react-native/no-inline-styles
                    {display: 'none'}
              }>
              {' '}
              + {i - 6} more
            </Text>
          </View>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  emojiShelf: {
    flexDirection: 'row',
    marginLeft: 80,
    marginTop: -4,
    backgroundColor: 'white',
    padding: 4,
    borderRadius: 14,
    shadowOffset: {width: 0, height: 10},
    shadowColor: 'rgb(100, 100, 100)',
    shadowOpacity: 0.3,
    shadowRadius: 12,
    alignSelf: 'flex-start',
    overflow: 'hidden',
  },
  fullName: {
    marginLeft: 74,
    marginTop: 8,
    color: 'rgb(160, 160, 160)',
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
  more: {
    color: 'rgb(100, 100, 100)',
  },
  myEmojiShelf: {
    flexDirection: 'row',
    marginRight: 10,
    marginTop: -4,
    backgroundColor: 'white',
    padding: 4,
    borderRadius: 14,
    shadowOffset: {width: 0, height: 10},
    shadowColor: 'rgb(100, 100, 100)',
    shadowOpacity: 0.3,
    shadowRadius: 12,
    alignSelf: 'flex-end',
    overflow: 'hidden',
  },
  myView: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    height: 'auto',
    marginTop: 12,
    marginRight: 11,
    marginBottom: 12,
  },
  myText: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'Avenir',
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
  text: {
    fontSize: 16,
    fontFamily: 'Avenir',
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
  whiteView: {
    height: 'auto',
    flexDirection: 'row',
    margin: 10,
    marginTop: 4,
    marginBottom: 0,
  },
  view: {
    marginBottom: 16,
  },
});

export default Message;
