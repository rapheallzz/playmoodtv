import React, { useState, useEffect } from 'react';
import { Dimensions, ScrollView, ActivityIndicator, View, Text, Image, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import axios from 'axios';
import BASE_API_URL from '../apiConfig';
import Carousel from 'react-native-reanimated-carousel';
import { Ionicons } from '@expo/vector-icons';
import CircularContentCard from '../components/CircularContentCard';
import ContentPreviewModal from '../components/ContentPreviewModal';

const { width: windowWidth } = Dimensions.get('window');

const Home = ({ navigation }) => {
  const [homePageData, setHomePageData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPreview, setSelectedPreview] = useState(null);
  const [previewVisible, setPreviewVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_API_URL}/api/content/`);
        setHomePageData(response.data);
      } catch (error) {
        console.error('Error fetching home data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const openPreview = (item) => {
    setSelectedPreview(item);
    setPreviewVisible(true);
  };

  const navigateToMovie = (item) => {
    navigation.navigate('MoviePlayer', { movie: item });
  };

  const renderBannerItem = ({ item }) => (
    <BannerItem>
      <BannerImage
        source={{ uri: item.thumbnail || 'https://via.placeholder.com/800x450' }}
        resizeMode="cover"
      />
      <BannerOverlay>
        <BannerTitle numberOfLines={1}>{item.title}</BannerTitle>
        <WatchNowButton
          onPress={() => navigateToMovie(item)}
        >
          <Ionicons name="play" size={20} color="white" />
          <WatchNowText>WATCH NOW</WatchNowText>
        </WatchNowButton>
      </BannerOverlay>
    </BannerItem>
  );

  const renderSection = (title, data, circular = false) => (
    <Section>
      <SectionTitle>{title}</SectionTitle>
      <HorizontalScroll horizontal showsHorizontalScrollIndicator={false}>
        {data.map((item) => (
          circular ? (
            <CircularContentCard
              key={item._id}
              content={item}
              onPress={() => openPreview(item)}
              onMorePress={() => openPreview(item)}
            />
          ) : (
            <ContentCard
              key={item._id}
              onPress={() => openPreview(item)}
            >
              <CardImage
                source={{ uri: item.thumbnail || 'https://via.placeholder.com/300x168' }}
                resizeMode="cover"
              />
              <CardTitle numberOfLines={1}>{item.title}</CardTitle>
            </ContentCard>
          )
        ))}
      </HorizontalScroll>
    </Section>
  );

  if (isLoading) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="large" color="#541011" />
      </LoadingContainer>
    );
  }

  return (
    <Container>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {homePageData.length > 0 && (
          <CarouselContainer>
            <Carousel
              loop
              width={windowWidth}
              height={windowWidth * 0.6}
              autoPlay={true}
              data={homePageData.slice(0, 5)}
              scrollAnimationDuration={1000}
              renderItem={renderBannerItem}
            />
          </CarouselContainer>
        )}

        {renderSection('Channels', homePageData.slice(10, 20), true)}
        {renderSection('New on Playmood', homePageData.slice(0, 10))}
        {renderSection('Recommended for you', homePageData.slice(5, 15))}
        {renderSection('Diaries', homePageData.slice(15, 25), true)}
      </ScrollView>

      <ContentPreviewModal
        visible={previewVisible}
        content={selectedPreview}
        onClose={() => setPreviewVisible(false)}
        onWatchNow={navigateToMovie}
      />
    </Container>
  );
};

const Container = styled(View)`
  flex: 1;
  background-color: #000;
`;

const LoadingContainer = styled(View)`
  flex: 1;
  background-color: #000;
  justify-content: center;
  align-items: center;
`;

const CarouselContainer = styled(View)`
  margin-bottom: 20px;
`;

const BannerItem = styled(View)`
  flex: 1;
  position: relative;
`;

const BannerImage = styled(Image)`
  width: 100%;
  height: 100%;
`;

const BannerOverlay = styled(View)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  background-color: rgba(0,0,0,0.4);
`;

const BannerTitle = styled(Text)`
  color: #fff;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const WatchNowButton = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  background-color: #541011;
  padding-horizontal: 15px;
  padding-vertical: 8px;
  border-radius: 4px;
  align-self: flex-start;
`;

const WatchNowText = styled(Text)`
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  margin-left: 5px;
`;

const Section = styled(View)`
  margin-vertical: 15px;
`;

const SectionTitle = styled(Text)`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  margin-left: 15px;
  margin-bottom: 10px;
`;

const HorizontalScroll = styled(ScrollView).attrs({
  contentContainerStyle: {
    paddingLeft: 15,
    paddingRight: 15,
  }
})``;

const ContentCard = styled(TouchableOpacity)`
  width: 160px;
  margin-right: 15px;
`;

const CardImage = styled(Image)`
  width: 160px;
  height: 90px;
  border-radius: 8px;
  margin-bottom: 5px;
`;

const CardTitle = styled(Text)`
  color: #ccc;
  font-size: 12px;
`;

export default Home;
