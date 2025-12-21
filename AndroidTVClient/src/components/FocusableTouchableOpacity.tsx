import React, { useState, useRef } from 'react';
import { TouchableOpacity, TouchableOpacityProps, Animated } from 'react-native';
import styled from 'styled-components/native';

interface FocusableTouchableOpacityProps extends TouchableOpacityProps {
  children: React.ReactNode;
}

const StyledTouchableOpacity = styled(TouchableOpacity)<{ isFocused: boolean }>`
  border-width: 2px;
  border-color: ${(props) => (props.isFocused ? '#FFFFFF' : 'transparent')};
  transform: ${(props) => (props.isFocused ? 'scale(1.1)' : 'scale(1.0)')};
`;

const FocusableTouchableOpacity: React.FC<FocusableTouchableOpacityProps> = ({ children, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleFocus = () => {
    setIsFocused(true);
    Animated.spring(scaleAnim, {
      toValue: 1.1,
      useNativeDriver: true,
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <StyledTouchableOpacity
      {...props}
      isFocused={isFocused}
      onFocus={handleFocus}
      onBlur={handleBlur}
      activeOpacity={0.8}
      style={{ transform: [{ scale: scaleAnim }] }}
    >
      {children}
    </StyledTouchableOpacity>
  );
};

export default FocusableTouchableOpacity;
