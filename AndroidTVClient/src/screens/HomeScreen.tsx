import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import axios from 'axios';
import { EXPO_PUBLIC_API_URL } from '../config/apiConfig';
import CreatorSlider from '../components/CreatorSlider';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';


// --- Interfaces ---
interface Creator {
  _id: string;
  name: string;
  profileImage: string;
}

// --- Styled Components ---
const Container = styled.ScrollView`
  flex: 1;
  background-color: #000;
`;

const LoaderContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

// --- Component ---
const HomeScreen = ({ navigation }: { navigation: any }) => {
  const [creators, setCreators] = useState<Creator[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state: RootState) => state.auth);


  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const response = await axios.get(`${EXPO_PUBLIC_API_URL}/api/users/creators`);
        setCreators(response.data);
      } catch (error) {
        console.error('Failed to fetch creators:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCreators();
  }, []);

  const handleCreatorPress = (creator: Creator) => {
    navigation.navigate('Creator', { creatorId: creator._id });
  };

  if (loading) {
    return (
      <LoaderContainer>
        <ActivityIndicator size="large" color="#fff" />
      </LoaderContainer>
    );
  }

  return (
    <Container>
        {user && (
        <>
            <CreatorSlider title="Channels" data={creators} onPressItem={handleCreatorPress} />
            <CreatorSlider title="Diaries" data={creators} onPressItem={handleCreatorPress} />
            <CreatorSlider title="Spaces" data={creators} onPressItem={handleCreatorPress} />
        </>
        )}
    </Container>
  );
};

export default HomeScreen;