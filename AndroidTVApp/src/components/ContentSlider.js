import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import axios from 'axios';
import FocusableTouchableOpacity from './FocusableTouchableOpacity';
import BASE_API_URL from '../apiConfig';

const SliderContainer = styled.View`
  margin-bottom: 25px;
`;

const SliderTitle = styled.Text`
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 15px;
  padding-left: 15px;
`;

const Card = styled(FocusableTouchableOpacity)`
  width: 150px; /* Adjust width as needed for TV */
  margin-right: 15px;
  border-radius: 8px; /* Ensure border radius is applied for focus effect */
`;

const Thumbnail = styled.Image`
  width: 100%;
  height: 220px; /* Adjust height as needed for TV */
  border-radius: 8px;
`;

const LoadingContainer = styled.View`
    height: 220px;
    justify-content: center;
    align-items: center;
`;

const ContentSlider = ({ category, navigation }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_API_URL}/content/`);
        if (response.data && Array.isArray(response.data)) {
          const filteredData = category
            ? response.data.filter((item) => item.category === category)
            : response.data;
          setData(filteredData);
        }
      } catch (error) {
        console.error(`Error fetching ${category} data:`, error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [category]);

  const renderItem = ({ item }) => (
    <Card onPress={() => navigation.navigate('Movie', { contentId: item._id })}>
      <Thumbnail source={{ uri: item.thumbnail }} resizeMode="cover" />
    </Card>
  );

  if (isLoading) {
    return (
        <LoadingContainer>
            <ActivityIndicator size="large" color="#fff" />
        </LoadingContainer>
    );
  }

  return (
    <SliderContainer>
      <SliderTitle>{category || 'All Content'}</SliderTitle>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 15 }}
      />
    </SliderContainer>
  );
};

export default ContentSlider;
