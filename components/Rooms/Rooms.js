/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useContext, useState, useEffect} from 'react';
import {Context} from '../../context.js';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Animated,
  Dimensions,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import RoomHeader from './RoomHeader.js';
import Room from './Room.js';
import MyRoom from './MyRoom.js';
import LinearGradient from 'react-native-linear-gradient';

const Rooms = () => {
  const {setRoom, user, setNickname} = useContext(Context);

  const [rooms, setRooms] = useState([]);
  const [myRooms, setMyRooms] = useState([]);
  const [search, setSearch] = useState('');
  const [filtRooms, setFiltRooms] = useState([]);
  const [filtMyRooms, setMyFiltRooms] = useState([]);
  const [animate, setAnimate] = useState(new Animated.Value(0));
  const [slider, setSlider] = useState(false);
  const [roomName, setRoomName] = useState('');
  const [code, setCode] = useState('');
  const [nicknameDraft, setNicknameDraft] = useState('');
  const [lengthErr, setLengthErr] = useState(false);
  const [existingErr, setExistingErr] = useState(false);
  const [nicknameErr, setNicknameErr] = useState(false);

  const _start = (pos) => {
    return Animated.parallel([
      Animated.timing(animate, {
        toValue: pos ? 0 : 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const createRoom = async () => {
    if (roomName.length === 0) {
      setLengthErr(true);
      setExistingErr(false);
      setNicknameErr(false);
    } else if (nicknameDraft.length === 0) {
      setNicknameErr(true);
      setLengthErr(false);
      setExistingErr(false);
    } else {
      setLengthErr(false);
      const back = await firestore().collection('Rooms').doc(roomName).get();
      if (!back._data) {
        try {
          await firestore()
            .collection('Rooms')
            .doc(roomName)
            .set({Name: roomName, Password: code, Start: false})
            .then(() => {
              getMyRooms();
            })
            .then(() => {
              _start(true);
              setSlider(!slider);
            });
          await firestore()
            .collection('Rooms')
            .doc(roomName)
            .collection('Members')
            .doc(nicknameDraft)
            .set({Name: nicknameDraft, Email: user.email, On: true});
          await firestore()
            .collection('Users')
            .doc(user.email)
            .collection('Rooms')
            .doc(roomName)
            .set({
              name: roomName,
              nickname: nicknameDraft,
            });
          setRoom(roomName);
          setNickname(nicknameDraft);
        } catch (e) {
          console.log('error adding room', e);
        }
      } else {
        setExistingErr(true);
      }
    }
  };

  const filter = (query) => {
    const fr = rooms.filter((room) => {
      if (room.name.toLowerCase().includes(query.toLowerCase())) {
        return room;
      }
    });
    const fmr = myRooms.filter((room) => {
      if (room.name.toLowerCase().includes(query.toLowerCase())) {
        return room;
      }
    });
    setFiltRooms(fr);
    setMyFiltRooms(fmr);
  };

  const getMyRooms = async () => {
    const getter = await firestore()
      .collection('Users')
      .doc(user.email)
      .collection('Rooms')
      .get()
      .then((snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({name: doc._data.name, nickname: doc._data.nickname});
        });
        setMyRooms(list);
        return list;
      });
    getAllRooms(getter);
  };

  const getAllRooms = async (reserved) => {
    await firestore()
      .collection('Rooms')
      .get()
      .then((snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          let push = true;
          for (let i = 0; i < reserved.length; i++) {
            if (reserved[i].name === doc._data.Name) {
              push = false;
            }
          }
          if (push) {
            list.push({name: doc._data.Name, pass: doc._data.Password});
          }
        });
        setRooms(list);
      });
  };

  useEffect(() => {
    getMyRooms();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.StyledView}>
      <RoomHeader />
      <ScrollView style={styles.Scroll}>
        <TextInput
          placeholder="Search..."
          style={styles.search}
          value={search}
          onChangeText={(e) => {
            setSearch(e);
            filter(e);
          }}
        />
        <Text style={styles.title}>My Rooms</Text>
        {filtMyRooms.length === 0 && search.length === 0 ? (
          myRooms.length === 0 ?
            <Text style={styles.noRooms}>No Rooms</Text> :
            myRooms.map((name) => (
              <MyRoom
                name={name.name}
                rooms={rooms}
                setRoom={setRoom}
                key={name.name}
              />
            ))
          )
        :
          (
            myRooms.length === 0 ?
            <Text style={styles.noRooms}>No Rooms</Text> :
            filtMyRooms.map((name) => (
            <MyRoom
              name={name.name}
              rooms={rooms}
              setRoom={setRoom}
              key={name.name}
            />)
          ))}
        <Text style={styles.title}>Browse Rooms</Text>
        {search.length === 0
          ? rooms.map((name) => (
              <Room
                name={name.name}
                rooms={rooms}
                setRoom={setRoom}
                key={name.name}
              />
            ))
          : (filtRooms.length !== 0 ?
              filtRooms.map((name) => (
                <Room
                  name={name.name}
                  rooms={rooms}
                  setRoom={setRoom}
                  key={name.name}
              />
            )) : <Text style={styles.noResults}>No Results</Text>
            )
          }
        <View style={styles.extraScroll}></View>
      </ScrollView>
      <TouchableOpacity style={styles.create} onPress={() => {
        _start(false);
        setSlider(!slider);
        }}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={['#ffa33c', '#e7605c']}
          style={styles.gradient}>
          <Text style={styles.createText}>+</Text>
        </LinearGradient>
      </TouchableOpacity>
      <Animated.View
        style={{
          position: 'absolute',
          bottom: 0,
          transform: [
            {
              translateY: animate.interpolate({
                inputRange: [0, 1],
                outputRange: [Dimensions.get('window').height * 0.8, 0],
              }),
            },
          ],
          left: 8,
          right: 8,
          height: Dimensions.get('window').height * 0.79,
          alignItems: 'center',
          alignSelf: 'center',
          borderRadius: 34,
          backgroundColor: 'rgb(250, 250, 250)',
          shadowOffset: {width: 0, height: -20},
          shadowColor: 'black',
          shadowOpacity: 0.3,
          shadowRadius: 18,
          elevation: 21,
        }}
        >
          <Text style={styles.createNewText}>Create New Room</Text>
          <Text
            style={lengthErr ? {display: 'flex', color: 'red', fontSize: 16} : {display: 'none'}}>
              Room Name must be longer
          </Text>
          <Text
            style={existingErr ? {display: 'flex', color: 'red', fontSize: 16} : {display: 'none'}}>
              Room already exists
          </Text>
          <Text
            style={nicknameErr ? {display: 'flex', color: 'red', fontSize: 16} : {display: 'none'}}>
              Must enter a Nickname
          </Text>
          <Text style={styles.createNewRoomTitle}>Room Name</Text>
          <TextInput
            placeholder="Room Name"
            style={styles.roomInput}
            value={roomName}
            onChangeText={(e) => setRoomName(e)}
          />
          <Text style={styles.createNewRoomTitle}>Code</Text>
          <TextInput
            placeholder="Code"
            style={styles.roomInput}
            value={code}
            onChangeText={(e) => setCode(e)}
          />
          <Text style={styles.createNewRoomTitle}>Nickname</Text>
          <TextInput
            placeholder="Nickname"
            style={styles.roomInput}
            value={nicknameDraft}
            onChangeText={(e) => setNicknameDraft(e)}
          />
          <View style={styles.shadow}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 2}}
              colors={['#ff913c', '#e7605c', '#ff4618']}
              style={styles.createGrad}>
              <TouchableOpacity
                style={styles.generate}
                onPress={() => createRoom()}
              >
                <Text style={{ fontSize: 22, color: 'white', fontFamily: 'Avenir' }}>Create</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
          <TouchableOpacity
            style={styles.close}
            onPress={() => {
              _start(true);
              setSlider(!slider);
              setLengthErr(false);
              setExistingErr(false);
              setNicknameErr(false);
            }}>
          <Text style={{ fontSize: 22, color: 'white', fontFamily: 'Avenir' }}>Close</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  close: {
    borderRadius: 20,
    height: Dimensions.get('window').height * 0.07,
    width: 140,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(30, 30, 30)',
    marginTop: Dimensions.get('window').height * 0.05,
    shadowOffset: {width: 0, height: 10},
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  create: {
    position: 'absolute',
    borderRadius: 40,
    height: 80,
    width: 80,
    right: 20,
    marginBottom: 60,
    bottom: 0,
    shadowOffset: {width: 0, height: 8},
    shadowColor: 'rgb(100, 20, 20)',
    shadowOpacity: 0.6,
    shadowRadius: 14,
  },
  createGrad: {
    borderRadius: 20,
    height: Dimensions.get('window').height * 0.07,
    width: 140,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Dimensions.get('window').height * 0.055,
  },
  createNewRoomTitle: {
    marginTop: Dimensions.get('window').height * 0.015,
    fontSize: 18,
    fontFamily: 'Avenir',
  },
  createNewText: {
    fontSize: Dimensions.get('window').height * 0.035,
    marginTop: Dimensions.get('window').height * 0.03,
    fontWeight: 'bold',
    fontFamily: 'Avenir Next',
  },
  createText: {
    fontSize: 36,
    color: 'white',
  },
  extraScroll: {
    height: 340,
  },
  generate: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradient: {
    borderRadius: 40,
    height: 80,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  room: {
    padding: 24,
    height: 80,
    borderColor: 'grey',
    borderWidth: 1,
    fontSize: 28,
    margin: 3,
    borderRadius: 10,
  },
  roomInput: {
    fontSize: 22,
    backgroundColor: 'rgb(220, 220, 220)',
    borderRadius: 20,
    marginTop: 10,
    width: Dimensions.get('window').width * 0.7,
    height: Dimensions.get('window').height * 0.06,
    textAlign: 'center',
    fontFamily: 'Avenir',
  },
  noResults: {
    fontSize: 18,
    fontFamily: 'Avenir',
    marginLeft: 15,
    marginTop: 5,
    color: 'rgb(100, 100, 100)',
  },
  noRooms: {
    marginLeft: 10,
    marginTop: 10,
    fontSize: 16,
    color: 'rgb(120, 120, 120)',
    fontFamily: 'Avenir',
  },
  signinbutton: {
    alignSelf: 'center',
  },
  StyledView: {
    flex: 1,
  },
  Scroll: {
    flex: 1,
    backgroundColor: 'rgb(235, 239, 245)',
    borderRadius: 30,
    paddingTop: 12,
  },
  search: {
    backgroundColor: 'white',
    fontSize: 20,
    padding: 10,
    paddingLeft: 20,
    height: 50,
    margin: 10,
    marginTop: 4,
    borderRadius: 25,
    shadowOffset: {width: 0, height: 6},
    shadowColor: 'rgb(26, 15, 19)',
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 10,
  },
  shadow: {
    shadowOffset: {width: 0, height: 8},
    shadowColor: 'rgb(100, 20, 20)',
    shadowOpacity: 0.6,
    shadowRadius: 14,
  },
  title: {
    marginLeft: 14,
    fontSize: 25,
    marginTop: 16,
    fontFamily: 'Avenir',
  },
});

export default Rooms;
