import React, { useState } from 'react';
import { Text, StyleSheet, TouchableHighlight } from 'react-native';

const NeonButton = ({ title, onPress }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <TouchableHighlight
      style={[styles.button, isFocused && styles.focused]}
      onPress={onPress}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      underlayColor="#541011"
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 4,
    marginRight: 10,
  },
  focused: {
    borderColor: '#541011',
    transform: [{ scale: 1.1 }],
    shadowColor: '#541011',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 10,
  },
  text: {
    color: 'white',
    fontSize: 14,
  },
});

export default NeonButton;
