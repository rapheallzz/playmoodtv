import React from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import FocusableTouchableOpacity from './FocusableTouchableOpacity';

const Slider = ({ data, title, navigation }: any) => {
  const renderItem = ({ item }: any) => (
    <FocusableCard onPress={() => navigation.navigate('Movie', { contentId: item._id })}>
      <CardImage source={{ uri: item.thumbnail }} />
      <CardContent>
          <Gradient colors={['transparent', 'rgba(0,0,0,0.8)', 'rgba(0,0,0,1)']} />
        <CardTitle>{item.title}</CardTitle>
      </CardContent>
    </FocusableCard>
  );

  return (
    <Container>
      <Title>{title}</Title>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </Container>
  );
};

const Container = styled.View`
  margin-bottom: 20px;
`;

const Title = styled.Text`
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  margin-left: 20px;
  margin-bottom: 10px;
`;

const FocusableCard = styled(FocusableTouchableOpacity)`
  width: 180px;
  height: 250px;
  margin-right: 10px;
  border-radius: 5px;
  overflow: hidden;
`;

const CardImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const CardContent = styled.View`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 10px;
`;

const CardTitle = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;

const Gradient = styled(LinearGradient)`
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
`;

export default Slider;
