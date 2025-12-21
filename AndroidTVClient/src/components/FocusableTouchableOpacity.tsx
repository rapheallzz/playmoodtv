import React, { useState } from 'react';
import styled from 'styled-components/native';

const FocusableTouchableOpacity = (props: any) => {
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

const StyledTouchableOpacity = styled.TouchableOpacity`
  border-width: 2px;
  border-color: ${(props: any) => (props.isFocused ? '#fff' : 'transparent')};
  transform: ${(props: any) => (props.isFocused ? 'scale(1.1)' : 'scale(1)')};
`;

export default FocusableTouchableOpacity;
