import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import { isTV } from '../utils/platform';
import axios from 'axios';
import BASE_API_URL from '../apiConfig';

const CategoryList = ({ route, navigation }) => {
  const { category, title } = route.params || {};
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_API_URL}/api/content/`);

        // Match the web app's filtering logic for special categories
        let filtered = [];
        if (category === 'Social') {
           filtered = response.data.filter(item => item.category === 'Social' || item.category === 'Story');
        } else if (category === 'New') {
           filtered = response.data.filter(item => item.isNew || item.category === 'New');
        } else {
           filtered = response.data.filter(item => item.category === category);
        }

        setData(filtered);
      } catch (error) {
        console.error('Error fetching category data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [category]);

  const renderItem = ({ item }) => <TVCategoryCard item={item} navigation={navigation} />;

  if (loading) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="large" color="#541011" />
      </LoadingContainer>
    );
  }

  return (
    <Container>
      <HeaderTitle>{title || category}</HeaderTitle>
      <FlatList
        key={isTV ? 'tv' : 'mobile'}
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        numColumns={isTV ? 4 : 2}
        contentContainerStyle={{ paddingBottom: 20 }}
        columnWrapperStyle={isTV ? { gap: 15 } : { justifyContent: 'space-between', marginBottom: 15 }}
        ListEmptyComponent={<EmptyText>No content found in this category.</EmptyText>}
      />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: #000;
  padding: 10px;
`;

const LoadingContainer = styled.View`
  flex: 1;
  background-color: #000;
  justify-content: center;
  align-items: center;
`;

const HeaderTitle = styled.Text`
  color: #fff;
  font-size: 22px;
  font-weight: bold;
  margin-vertical: 15px;
  margin-left: 5px;
  text-transform: uppercase;
`;

const Card = styled.TouchableOpacity`
  width: ${isTV ? '23%' : '48%'};
  background-color: #111;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 15px;
  border-width: ${props => props.isFocused ? '3px' : '0px'};
  border-color: #8c0734;
  transform: ${props => props.isFocused ? 'scale(1.05)' : 'scale(1)'};
`;

const TVCategoryCard = ({ item, navigation }) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <Card
      onPress={() => navigation.navigate('MoviePlayer', { movie: item })}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      isFocused={isFocused}
    >
      <Thumbnail source={{ uri: item.thumbnail }} resizeMode="cover" />
      <Info>
        <ItemTitle numberOfLines={2}>{item.title}</ItemTitle>
        <ViewsText>{item.views || 0} views</ViewsText>
      </Info>
    </Card>
  );
};

const Thumbnail = styled.Image`
  width: 100%;
  aspect-ratio: 1.77;
`;

const Info = styled.View`
  padding: 10px;
`;

const ItemTitle = styled.Text`
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  height: 40px;
`;

const ViewsText = styled.Text`
  color: #666;
  font-size: 11px;
  margin-top: 4px;
`;

const EmptyText = styled.Text`
  color: #666;
  text-align: center;
  margin-top: 50px;
`;

export default CategoryList;
