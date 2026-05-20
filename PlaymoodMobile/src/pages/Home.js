import React, { useState, useEffect } from 'react';
import { Dimensions, ScrollView, ActivityIndicator, View, Text, Image, TouchableOpacity, Platform } from 'react-native';
import styled from 'styled-components/native';
import { isTV } from '../utils/platform';
import axios from 'axios';
import BASE_API_URL from '../apiConfig';
import Carousel from 'react-native-reanimated-carousel';
import { Ionicons } from '@expo/vector-icons';
import CircularContentCard from '../components/CircularContentCard';
import ContentPreviewModal from '../components/ContentPreviewModal';
import MobileBannerCard from '../components/MobileBannerCard';
import HighlightsHome from '../components/HighlightsHome';
import HighlightViewerModal from '../components/HighlightViewerModal';

const { width: windowWidth } = Dimensions.get('window');

const Home = ({ navigation }) => {
  const [homePageData, setHomePageData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPreview, setSelectedPreview] = useState(null);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [allHighlights, setAllHighlights] = useState([]);
  const [highlightStartIndex, setHighlightStartIndex] = useState(0);
  const [highlightVisible, setHighlightVisible] = useState(false);

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

  const openHighlight = (highlights, index) => {
    setAllHighlights(highlights);
    setHighlightStartIndex(index);
    setHighlightVisible(true);
  };

  const navigateToMovie = (item) => {
    navigation.navigate('MoviePlayer', { movie: item });
  };

  const navigateToCreator = (user) => {
    if (!user) return;
    setHighlightVisible(false);
    setPreviewVisible(false);
    const userId = user._id || user;
    navigation.navigate('CreatorChannel', { creatorId: userId });
  };

  const renderSection = (title, data, circular = false) => {
    if (!data || data.length === 0) return null;

    const carouselWidth = isTV ? (windowWidth - 260) : windowWidth;
    const itemWidth = isTV ? (circular ? 200 : 320) : (circular ? 135 : 175);
    const itemHeight = isTV ? (circular ? 250 : 220) : (circular ? 160 : 180);

    return (
      <Section isTV={isTV}>
        <SectionTitle isTV={isTV}>{title}</SectionTitle>
        <Carousel
          loop={false}
          width={itemWidth}
          height={itemHeight}
          style={{ width: carouselWidth }}
          data={data}
          scrollAnimationDuration={1000}
          renderItem={({ item }) => (
            circular ? (
              <CircularContentCard
                content={item}
                onPress={() => openPreview(item)}
                onMorePress={() => openPreview(item)}
              />
            ) : (
              <TVContentCard item={item} onPress={() => openPreview(item)} />
            )
          )}
        />
      </Section>
    );
  };

  if (isLoading) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="large" color="#541011" />
      </LoadingContainer>
    );
  }

  // Categories matching web app order
  const top10 = homePageData.slice(0, 10);
  const newOnPlaymood = homePageData.filter(i => i.isNew || i.category === 'New').slice(0, 10);
  const channels = homePageData.filter(i => i.category === 'Channel');
  const diaries = homePageData.filter(i => i.category === 'Diary');
  const spaces = homePageData.filter(i => i.category === 'Space');
  const recommended = homePageData.slice(5, 15);
  const interviews = homePageData.filter(i => i.category === 'Interview');
  const fashion = homePageData.filter(i => i.category === 'Fashion Show');
  const documentaries = homePageData.filter(i => i.category === 'Documentary');
  const camera = homePageData.filter(i => i.category === 'Behind the Cameras');
  const soon = homePageData.filter(i => i.category === 'Soon');
  const teen = homePageData.filter(i => i.category === 'Teen');
  const only = homePageData.filter(i => i.category === 'Only');
  const social = homePageData.filter(i => i.category === 'Social');

  return (
    <Container>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <MobileBannerCard
          homePageData={homePageData}
          onPlayNow={navigateToMovie}
        />

        {renderSection('Top 10', top10)}

        <HighlightsHome onSelect={openHighlight} />

        {renderSection('New on Playmood', newOnPlaymood.length > 0 ? newOnPlaymood : homePageData.slice(0, 10))}
        {renderSection('Channels', channels.length > 0 ? channels : homePageData.slice(10, 18), true)}
        {renderSection('Diaries', diaries.length > 0 ? diaries : homePageData.slice(18, 26), true)}
        {renderSection('Spaces', spaces.length > 0 ? spaces : homePageData.slice(0, 8), true)}
        {renderSection('Recommended for you', recommended)}
        {renderSection('Interviews', interviews)}
        {renderSection('Fashion Shows', fashion)}
        {renderSection('Social', social)}
        {renderSection('Documentaries and Reports', documentaries)}
        {renderSection('Behind the Cameras', camera)}
        {renderSection('Soon in Playmood', soon)}
        {renderSection('Teens', teen)}
        {renderSection('Only in Playmood', only)}
      </ScrollView>

      <ContentPreviewModal
        visible={previewVisible}
        content={selectedPreview}
        onClose={() => setPreviewVisible(false)}
        onWatchNow={navigateToMovie}
        onProfilePress={navigateToCreator}
      />

      <HighlightViewerModal
        visible={highlightVisible}
        highlights={allHighlights}
        initialIndex={highlightStartIndex}
        onClose={() => setHighlightVisible(false)}
        onProfilePress={navigateToCreator}
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

const Section = styled(View)`
  margin-vertical: ${props => props.isTV ? '30px' : '15px'};
`;

const SectionTitle = styled(Text)`
  color: #fff;
  font-size: ${props => props.isTV ? '24px' : '18px'};
  font-weight: bold;
  margin-left: 15px;
  margin-bottom: 15px;
`;

const ContentCard = styled(TouchableOpacity)`
  width: ${isTV ? '300px' : '160px'};
  margin-left: 15px;
  transform: ${props => props.isFocused ? 'scale(1.1)' : 'scale(1)'};
  border-width: ${props => props.isFocused ? '4px' : '0px'};
  border-color: #8c0734;
  border-radius: 8px;
  overflow: hidden;
`;

const TVContentCard = ({ item, onPress }) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <ContentCard
      onPress={onPress}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      isFocused={isFocused}
    >
      <CardImage
        source={{ uri: item.thumbnail || 'https://via.placeholder.com/300x168' }}
        resizeMode="cover"
      />
      {!isFocused && <CardTitle numberOfLines={1}>{item.title}</CardTitle>}
    </ContentCard>
  );
};

const CardImage = styled(Image)`
  width: 100%;
  height: ${isTV ? '168px' : '90px'};
  border-radius: 8px;
`;

const CardTitle = styled(Text)`
  color: #ccc;
  font-size: 12px;
  margin-top: 5px;
`;

export default Home;
