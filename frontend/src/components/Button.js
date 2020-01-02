import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({ title, styles, onPress }) =>  (
  <TouchableOpacity onPress={onPress} style={styles.button}>
    <Text style={styles.title}>{title}</Text>
  </TouchableOpacity>
);

export default Button;