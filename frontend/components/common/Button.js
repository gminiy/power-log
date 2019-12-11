import React from 'react';
import {
  Text,
  TouchableOpacity
} from 'react-native';

const Button = (props) => {
  const { onPress, styles, text } = props;
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
}

export default Button;