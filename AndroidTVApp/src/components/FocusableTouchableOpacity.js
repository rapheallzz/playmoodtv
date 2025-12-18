import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

const StyledTouchableOpacity = styled.TouchableOpacity`
  ${({ isFocused }) => isFocused && `
    border: 2px solid #fff;
    transform: scale(1.05); /* Enlarge the item slightly on focus */
  `}
`;

const FocusableTouchableOpacity = (props) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
    if (props.onFocus) {
      props.onFocus();
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (props.onBlur) {
      props.onBlur();
    }
  };

  return (
    <StyledTouchableOpacity
      {...props}
      onFocus={handleFocus}
      onBlur={handleBlur}
      isFocused={isFocused}
      activeOpacity={0.8} // Standard opacity for TV apps
    >
      {props.children}
    </StyledTouchableOpacity>
  );
};

export default FocusableTouchableOpacity;
