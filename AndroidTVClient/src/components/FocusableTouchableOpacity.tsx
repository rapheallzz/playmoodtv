import React, { useState, useRef } from 'react';
import { TouchableOpacityProps, Animated } from 'react-native';
import styled from 'styled-components/native';

interface FocusableTouchableOpacityProps extends TouchableOpacityProps {
  children: React.ReactNode;
}

const StyledTouchableOpacity = styled(Animated.createAnimatedComponent(styled.TouchableOpacity`
  padding: 10px;
  margin: 10px;
`))<{ isFocused: boolean }>`
  border-width: 2px;
  border-color: ${(props) => (props.isFocused ? '#fff' : 'transparent')};
`;

const FocusableTouchableOpacity: React.FC<FocusableTouchableOpacityProps> = ({ children, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const scaleValue = useRef(new Animated.Value(1)).current;

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(scaleValue, {
      toValue: 1.1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  return (
    <StyledTouchableOpacity
      isFocused={isFocused}
      onFocus={handleFocus}
      onBlur={handleBlur}
      style={{ transform: [{ scale: scaleValue }] }}
      {...props}
    >
      {children}
    </StyledTouchableOpacity>
  );
};

export default FocusableTouchableOpacity;
