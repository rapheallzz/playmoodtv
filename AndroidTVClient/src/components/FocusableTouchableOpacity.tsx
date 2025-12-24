import React, { useState } from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import styled from 'styled-components/native';

interface FocusableTouchableOpacityProps extends TouchableOpacityProps {
  children: React.ReactNode;
}

const StyledTouchableOpacity = styled.TouchableOpacity<{ isFocused: boolean }>`
  border-width: 2px;
  border-color: ${(props) => (props.isFocused ? '#E50914' : 'transparent')};
  transform: ${(props) => (props.isFocused ? 'scale(1.1)' : 'scale(1)')};
  border-radius: 5px;
`;

const FocusableTouchableOpacity: React.FC<FocusableTouchableOpacityProps> = ({ children, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <StyledTouchableOpacity
      isFocused={isFocused}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      {...props}
    >
      {children}
    </StyledTouchableOpacity>
  );
};

export default FocusableTouchableOpacity;