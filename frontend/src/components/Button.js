import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({ title, styles, onPress, children }) =>  (
  <TouchableOpacity onPress={onPress} style={styles.button}>
    <Text style={styles.title}>{title}</Text>
    {children}
  </TouchableOpacity>
);

export default Button;