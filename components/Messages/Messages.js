import React, {useState, useContext, useEffect, useRef} from 'react';
import {Context} from '../../context.js';
import {StyleSheet, ScrollView, View, Text} from 'react-native';
import MessageHeader from './MessageHeader.js';
import Message from './Message.js';
import SendBar from './SendBar.js';
import firestore from '@react-native-firebase/firestore';

const Messages = () => {
  const lock = useRef();

  const {room, user} = useContext(Context);

  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState('');

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
          const dat = dox.data();
          list.push({
            email: dat.email,
            name: dat.nickname,
            text: dat.text,
            time: dat.time,
          });
        });
        console.log('list', list)
        setMessages(list);
      });
  }, []);

  return (
    <View style={styles.view}>
      <MessageHeader />
      <View style={styles.scrollingView}>
        <ScrollView
          style={styles.messages}
          ref={lock}
          onContentSizeChange={(contentWidth, contentHeight) => {
            lock.current.scrollToEnd({animated: true});
          }}>
          {messages.map((m) => {
            return <Message email={m.email} name={m.name} text={m.text} />;
          })}
        </ScrollView>
        <Text style={styles.bottomMargin}></Text>
        <SendBar draft={draft} setDraft={setDraft} send={send} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomMargin: {
    marginBottom: 120,
  },
  view: {
    flex: 1,
  },
  scrollingView: {
    flex: 1,
    backgroundColor: 'rgb(235, 239, 245)',
    borderRadius: 32,
    bottom: 0,
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
  messages: {
    flex: 1,
  },
});

export default Messages;
