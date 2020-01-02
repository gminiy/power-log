import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';

const NavLink = ({ navigation, text, routeName, styles }) => {
  return (
  <TouchableOpacity style={styles.nav} onPress={() => navigation.navigate(routeName)}>
    <Text style={styles.text}>{text}</Text>
  </TouchableOpacity>
  )
}

export default withNavigation(NavLink);