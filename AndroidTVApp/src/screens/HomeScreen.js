import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, ActivityIndicator, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import axios from 'axios';
import ContentSlider from '../components/ContentSlider';
import FocusableTouchableOpacity from '../components/FocusableTouchableOpacity';
import BASE_API_URL from '../apiConfig';

// Styled Components
const Container = styled.View`
  flex: 1;
  background-color: #000;
`;

const Banner = styled.ImageBackground`
  width: 100%;
  height: 550px; /* Adjust as needed for TV */
  justify-content: flex-end; /* Align content to the bottom */
`;

const BannerContent = styled.View`
  padding: 30px;
  background-color: 'rgba(0, 0, 0, 0.5)';
`;

const Title = styled.Text`
  color: #fff;
  font-size: 28px;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
`;

const Description = styled.Text`
  color: #fff;
  font-size: 16px;
  margin-top: 10px;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.8);
  max-width: 60%; /* Prevent text from spanning the entire width */
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  margin-top: 20px;
`;

const NeonButton = styled(FocusableTouchableOpacity)`
  padding: 12px 20px;
  background-color: rgba(255, 255, 255, 0.2);
  border: 1px solid #ffffff;
  border-radius: 4px;
  margin-right: 15px;
  flex-direction: row;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-size: 14px;
`;

const LoadingContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: #000;
`;

const HomeScreen = ({ navigation }) => {
  const [bannerContent, setBannerContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const FALLBACK_IMAGE_URL = 'https://res.cloudinary.com/dpehzv4sc/image/upload/v1718890242/PLAYMOOD_DEF_l1a3sf.png';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_API_URL}/content/`, {
          headers: { 'Cache-Control': 'no-cache' },
        });
        if (response.data && response.data.length > 0) {
          setBannerContent(response.data[0]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="large" color="#fff" />
      </LoadingContainer>
    );
  }

  const handleWatchNow = (content) => {
    navigation.navigate('Movie', { contentId: content._id });
  };

  const sections = [
    { type: 'banner', data: bannerContent },
    { type: 'slider', category: 'Top 10' },
    { type: 'slider', category: 'New on Playmood' },
    { type: 'slider', category: 'Fashion Show' },
    { type: 'slider', category: 'Recommended for you' },
  ];

  const renderItem = ({ item }) => {
    if (item.type === 'banner') {
      if (!item.data) return <View style={{height: 550}} />;
      return (
        <Banner source={{ uri: item.data.thumbnail || FALLBACK_IMAGE_URL }} resizeMode="cover">
          <BannerContent>
            <Title>{item.data.title}</Title>
            <Description numberOfLines={3}>{item.data.description}</Description>
            <ButtonContainer>
              <NeonButton onPress={() => handleWatchNow(item.data)}>
                <ButtonText>WATCH NOW</ButtonText>
              </NeonButton>
            </ButtonContainer>
          </BannerContent>
        </Banner>
      );
    }
    if (item.type === 'slider') {
      return <ContentSlider category={item.category} navigation={navigation} />;
    }
    return null;
  };

  return (
    <Container>
      <FlatList
        data={sections}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.type + index}
      />
    </Container>
  );
};

export default HomeScreen;
