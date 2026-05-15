import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import axios from 'axios';
import BASE_API_URL from '../apiConfig';
import styled from 'styled-components/native';
import { shuffleArray } from '../utils/shuffle';

const HighlightsHome = ({ onSelect }) => {
  const [highlights, setHighlights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHighlights = async () => {
      try {
        const response = await axios.get(`${BASE_API_URL}/api/highlights/recent`);
        setHighlights(shuffleArray(response.data));
      } catch (error) {
        console.error('Error fetching highlights:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchHighlights();
  }, []);

  const handlePress = (item, index) => {
    onSelect(highlights, index);
  };

  const renderItem = ({ item, index }) => (
    <HighlightItem onPress={() => handlePress(item, index)}>
      <CircleContainer>
        <HighlightImage
          source={{ uri: item.thumbnail || item.user?.profileImage }}
          resizeMode="cover"
        />
      </CircleContainer>
      <CreatorName numberOfLines={1}>{item.user?.name || 'Creator'}</CreatorName>
    </HighlightItem>
  );

  if (loading) return null;
  if (highlights.length === 0) return null;

  return (
    <Container>
      <SectionTitle>Highlights</SectionTitle>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={highlights}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      />
    </Container>
  );
};

const Container = styled(View)`
  margin-vertical: 15px;
`;

const SectionTitle = styled(Text)`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  margin-left: 15px;
  margin-bottom: 15px;
`;

const HighlightItem = styled(TouchableOpacity)`
  align-items: center;
  margin-right: 15px;
  width: 80px;
`;

const CircleContainer = styled(View)`
  width: 70px;
  height: 70px;
  border-radius: 35px;
  border-width: 2px;
  border-color: #541011;
  padding: 2px;
  overflow: hidden;
`;

const HighlightImage = styled(Image)`
  width: 100%;
  height: 100%;
  border-radius: 32px;
`;

const CreatorName = styled(Text)`
  color: #ccc;
  font-size: 10px;
  margin-top: 6px;
  text-align: center;
`;

export default HighlightsHome;
