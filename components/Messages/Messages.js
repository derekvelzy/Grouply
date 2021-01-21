import React, {useState, useContext, useEffect, useRef} from 'react';
import {Context} from '../../context.js';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Modal,
  Animated,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import MessageHeader from './MessageHeader.js';
import Message from './Message.js';
import SendBar from './SendBar.js';
import Emojis from './Emojis.js';
import firestore from '@react-native-firebase/firestore';

const Messages = () => {
  const lock = useRef();

  const {room, user} = useContext(Context);

  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState('');
  const [members, setMembers] = useState([]);
  const [emojis, setEmojis] = useState([]);
  const [animate, setAnimate] = useState(new Animated.Value(0));
  const [slider, setSlider] = useState(false);
  const [popup, setPopup] = useState(false);
  const [reactMess, setReactMess] = useState('');

  const _start = (pos) => {
    return Animated.parallel([
      Animated.timing(animate, {
        toValue: pos ? 0 : 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const reaction = (e) => {
    setPopup(false);
    firestore()
      .collection('Rooms')
      .doc(room)
      .collection('Messages')
      .doc(reactMess)
      .collection('Reactions')
      .add({
        emoji: e,
      });
  };

  const addEmoji = (e) => {
    setPopup(true);
    _start(true);
    setSlider(false);
    firestore().collection('Rooms').doc(room).collection('Emojis').add({
      emoji: e,
    });
  };

  const send = async () => {
    if (draft.length > 0) {
      const name = await firestore()
        .collection('Users')
        .doc(user.email)
        .collection('Rooms')
        .doc(room)
        .get();
      const time = new Date();
      await firestore()
        .collection('Rooms')
        .doc(room)
        .collection('Messages')
        .add({
          email: user.email,
          nickname: name._data.nickname,
          text: draft,
          time: time,
        });
    }
  };

  useEffect(() => {
    return firestore()
      .collection('Rooms')
      .doc(room)
      .collection('Messages')
      .orderBy('time')
      .onSnapshot((querySnapshot) => {
        const list = [];
        querySnapshot.forEach((dox) => {
          const pathArr = dox._ref._documentPath._parts;
          const path = pathArr[pathArr.length - 1];
          const dat = dox.data();
          list.push({
            email: dat.email,
            name: dat.nickname,
            text: dat.text,
            time: dat.time,
            path,
          });
        });
        setMessages(list);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return firestore()
      .collection('Rooms')
      .doc(room)
      .collection('Members')
      .onSnapshot((querySnapshot) => {
        const list = [];
        querySnapshot.forEach((dox) => {
          const dat = dox.data();
          if (dat.On) {
            list.push({name: dat.Name});
          }
        });
        setMembers(list);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return firestore()
      .collection('Rooms')
      .doc(room)
      .collection('Emojis')
      .onSnapshot((querySnapshot) => {
        const list = [];
        querySnapshot.forEach((dox) => {
          const dat = dox.data();
          list.push(dat.emoji);
        });
        setEmojis(list);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.view}>
      <MessageHeader />
      <View style={styles.scrollingView}>
        <View style={styles.inRoomContainer}>
          <Text style={styles.inRoomText}>In the Room: </Text>
          <ScrollView horizontal={true} style={styles.inRoomScroll}>
            {members.map((m) => {
              return (
                <Text key={m.name} style={styles.member}>
                  {m.name},
                </Text>
              );
            })}
          </ScrollView>
        </View>
        <ScrollView
          style={styles.messages}
          ref={lock}
          onContentSizeChange={(contentWidth, contentHeight) => {
            lock.current.scrollToEnd({animated: true});
          }}>
          <View style={styles.extraScroll} />
          {messages.map((m) => {
            return (
              <Message
                email={m.email}
                name={m.name}
                text={m.text}
                path={m.path}
                setReactMess={setReactMess}
                start={_start}
                setSlider={setSlider}
                setPopup={setPopup}
                key={m.time}
              />
            );
          })}
        </ScrollView>
        <View style={styles.bottomMargin} />
        <SendBar draft={draft} setDraft={setDraft} send={send} />
      </View>
      <Modal
        tyle={styles.emojiModal}
        animationType="slide"
        transparent={true}
        visible={popup}>
        <View style={styles.emojiPopupView}>
          <Text style={styles.groupEmojisText}>Group Emojis</Text>
          <ScrollView style={styles.emojiScroll}>
            <View style={styles.emojiRow}>
              {emojis.map((e) => (
                <TouchableOpacity onPress={() => reaction(e)}>
                  <Text key={e} style={styles.emoji}>
                    {e}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
          <View style={styles.popUpButtons}>
            <TouchableOpacity
              style={styles.addEmoji}
              onPress={() => {
                _start(false);
                setSlider(true);
                setPopup(false);
              }}>
              <Text style={styles.addEmojiText}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeModal}
              onPress={() => {
                setPopup(false);
              }}>
              <Text style={styles.closeText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Animated.View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          position: 'absolute',
          justifyContent: 'space-between',
          bottom: 0,
          transform: [
            {
              translateY: animate.interpolate({
                inputRange: [0, 1],
                outputRange: [Dimensions.get('window').height * 0.91, 0],
              }),
            },
          ],
          left: 8,
          right: 8,
          height: Dimensions.get('window').height * 0.9,
          alignItems: 'center',
          alignSelf: 'center',
          borderRadius: 34,
          backgroundColor: 'rgb(250, 250, 250)',
          shadowOffset: {width: 0, height: -20},
          shadowColor: 'black',
          shadowOpacity: 0.3,
          shadowRadius: 18,
          elevation: 21,
        }}>
        <Text style={styles.selectEmojiText}>Choose Emoji</Text>
        <Emojis addEmoji={addEmoji} open={slider} />
        <TouchableOpacity
          style={styles.close}
          onPress={() => {
            _start(true);
            setSlider(false);
            setPopup(true);
          }}>
          <Text style={styles.closeText}>Close</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  addEmoji: {
    borderWidth: 2,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  addEmojiText: {
    fontSize: 30,
    fontFamily: 'Avenir',
  },
  bottomMargin: {
    marginBottom: 95,
  },
  close: {
    marginBottom: 50,
    borderRadius: 20,
    height: 60,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(30, 30, 30)',
    marginTop: 10,
    shadowOffset: {width: 0, height: 10},
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  closeModal: {
    alignSelf: 'flex-end',
    borderRadius: 20,
    height: 50,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(30, 30, 30)',
    shadowOffset: {width: 0, height: 10},
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  closeText: {
    fontSize: 22,
    color: 'white',
    fontFamily: 'Avenir',
  },
  emoji: {
    fontSize: 40,
    margin: 8.6,
  },
  emojiModal: {
    // marginTop: Dimensions.get('window').height * 0.5,
  },
  emojiPopupView: {
    backgroundColor: 'white',
    alignSelf: 'center',
    marginTop: Dimensions.get('window').height * 0.3,
    width: 300,
    shadowOffset: {width: 0, height: 20},
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 20,
    borderRadius: 30,
    padding: 24,
  },
  emojiRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  emojiScroll: {
    maxHeight: 220,
  },
  extraScroll: {
    height: 80,
  },
  groupEmojisText: {
    fontFamily: 'Avenir',
    fontSize: 18,
    alignSelf: 'center',
    marginBottom: 16,
  },
  headerText: {
    alignSelf: 'center',
    padding: 20,
  },
  input: {
    backgroundColor: 'rgb(200, 200, 200)',
    height: 40,
    marginBottom: 10,
  },
  inRoomContainer: {
    position: 'absolute',
    marginTop: 12,
    marginBottom: 4,
    marginRight: 16,
    marginLeft: 16,
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 18,
    paddingTop: 12,
    paddingBottom: 12,
    borderRadius: 30,
    zIndex: 1,
    shadowOffset: {width: 0, height: 10},
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowRadius: 14,
  },
  inRoomText: {
    fontSize: 20,
    marginRight: 5,
    fontFamily: 'Avenir',
  },
  judge: {
    fontSize: 19,
    marginLeft: 5,
    fontWeight: 'bold',
  },
  member: {
    fontSize: 20,
    marginLeft: 5,
    fontFamily: 'Avenir',
  },
  memes: {
    height: 143,
    width: 200,
    marginRight: 10,
    borderColor: 'rgb(220, 220, 220)',
    borderWidth: 1,
    borderRadius: 20,
  },
  memeContainer: {
    marginBottom: 8,
    marginRight: 16,
    marginLeft: 16,
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 30,
  },
  messages: {
    flex: 1,
  },
  popUpButtons: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  scrollingView: {
    flex: 1,
    backgroundColor: 'rgb(235, 239, 245)',
    borderRadius: 32,
    bottom: 0,
  },
  selectEmojiText: {
    marginTop: 20,
    fontFamily: 'Avenir Next',
    fontSize: 20,
  },
  view: {
    flex: 1,
  },
});

export default Messages;
