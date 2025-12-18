import React, { useState, useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

const StyledTouchable = styled.TouchableOpacity``;

const FocusableTouchableOpacity = (props) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
    if (props.onFocus) {
      props.onFocus();
    }
  }, [props.onFocus]);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
    if (props.onBlur) {
      props.onBlur();
    }
  }, [props.onBlur]);

  const focusStyle = {
    transform: [{ scale: 1.1 }],
    borderColor: '#E50914',
    borderWidth: 2,
    borderRadius: 5,
  };

  return (
    <StyledTouchable
      {...props}
      onFocus={handleFocus}
      onBlur={handleBlur}
      style={[props.style, isFocused ? focusStyle : {}]}
    >
      {props.children}
    </StyledTouchable>
  );
};

export default FocusableTouchableOpacity;
