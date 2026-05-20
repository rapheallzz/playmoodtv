import React, { useState } from 'react';
import { TouchableOpacity, Platform } from 'react-native';
import styled from 'styled-components/native';

const FocusableItem = ({ children, onPress, style, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <StyledTouchableOpacity
      onPress={onPress}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      activeOpacity={0.7}
      isFocused={isFocused}
      style={style}
      {...props}
    >
      {children}
    </StyledTouchableOpacity>
  );
};

const StyledTouchableOpacity = styled(TouchableOpacity)`
  border-width: ${props => props.isFocused ? '3px' : '0px'};
  border-color: #8c0734;
  border-radius: 8px;
  transform: ${props => props.isFocused ? 'scale(1.05)' : 'scale(1)'};
`;

export default FocusableItem;
