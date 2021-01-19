import React, {useContext} from 'react';
import {Context} from '../../context.js';
import {StyleSheet, View, Text, Button, TouchableOpacity} from 'react-native';

const RoomHeader = () => {
  const {logout} = useContext(Context);

  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>Grouply</Text>
      <TouchableOpacity style={styles.logout} onPress={() => logout()}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'white',
    flex: 0.1,
    padding: 15,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  headerText: {
    color: '#ffa33c',
    fontSize: 36,
  },
  logout: {
    fontSize: 24,
    borderColor: 'rgb(180, 180, 180)',
    borderWidth: 1,
    borderRadius: 10,
    padding: 8,
  },
  logoutText: {
    color: 'rgb(100, 100, 100)',
    fontSize: 20,
  },
});

export default RoomHeader;
