import React, { useState, useRef } from 'react';
import { TouchableOpacity, TouchableOpacityProps, Animated } from 'react-native';
import styled from 'styled-components/native';

// --- Styled Components ---
const StyledTouchableOpacity = styled(Animated.createAnimatedComponent(TouchableOpacity))`
  border-width: 2px;
  border-color: transparent;
  transform: scale(1);
`;

// --- Component ---
const FocusableTouchableOpacity: React.FC<TouchableOpacityProps> = (props) => {
  const [isFocused, setIsFocused] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(scaleAnim, {
      toValue: 1.1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  return (
    <StyledTouchableOpacity
      {...props}
      onFocus={handleFocus}
      onBlur={handleBlur}
      style={{
        borderColor: isFocused ? '#007bff' : 'transparent',
        transform: [{ scale: scaleAnim }],
      }}
    />
  );
};

export default FocusableTouchableOpacity;
