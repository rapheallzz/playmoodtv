import React from 'react';
import { TextInput } from 'react-native';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

const SearchHeader = ({ value, onChangeText }) => {
  return (
    <SearchContainer>
      <SearchIcon name="search" size={20} color="#fff" />
      <SearchInput
        placeholder="Search..."
        placeholderTextColor="#8e8e8e"
        value={value}
        onChangeText={onChangeText}
      />
    </SearchContainer>
  );
};

const SearchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #1c1c1e;
  border-radius: 8px;
  padding: 5px 10px;
  width: 100%;
`;

const SearchIcon = styled(Ionicons)`
  margin-right: 10px;
`;

const SearchInput = styled.TextInput`
  flex: 1;
  color: #fff;
  font-size: 16px;
`;

export default SearchHeader;
