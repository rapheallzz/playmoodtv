import React, { useState } from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import styled from 'styled-components/native';

interface FocusableTouchableOpacityProps extends TouchableOpacityProps {
  isFocused?: boolean;
}

const StyledTouchableOpacity = styled(TouchableOpacity)<FocusableTouchableOpacityProps>`
  border-width: 2px;
  border-color: ${(props) => (props.isFocused ? 'white' : 'transparent')};
  transform: ${(props) => (props.isFocused ? 'scale(1.1)' : 'scale(1)')};
`;

const FocusableTouchableOpacity: React.FC<TouchableOpacityProps> = (props) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <StyledTouchableOpacity
      {...props}
      isFocused={isFocused}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    />
  );
};

export default FocusableTouchableOpacity;
