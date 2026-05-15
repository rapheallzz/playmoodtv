import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import BASE_API_URL from '../apiConfig';
import { Video } from 'expo-av';

const Schedule = ({ navigation }) => {
  const [schedule, setSchedule] = useState({ liveProgram: null, upcomingPrograms: [] });
  const [loading, setLoading] = useState(true);

  const fetchSchedule = async () => {
    try {
      const response = await axios.get(`${BASE_API_URL}/api/live-programs/today`);
      setSchedule(response.data);
    } catch (error) {
      console.error('Error fetching schedule:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedule();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#541011" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.brandPlaymood}>PLAYMOOD</Text>
        <Text style={styles.brandTV}>TV</Text>
      </View>

      {schedule.liveProgram ? (
        <View style={styles.liveSection}>
          <Video
            source={{ uri: schedule.liveProgram.contentId?.video }}
            style={styles.liveVideo}
            useNativeControls
            resizeMode="cover"
            shouldPlay={false}
          />
          <View style={styles.liveBadge}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>LIVE NOW</Text>
          </View>
          <View style={styles.programInfo}>
            <Text style={styles.programTitle}>{schedule.liveProgram.contentId?.title}</Text>
            <Text style={styles.programDesc}>{schedule.liveProgram.contentId?.description}</Text>
          </View>
        </View>
      ) : (
        <View style={styles.noLive}>
          <Ionicons name="alert-circle-outline" size={64} color="#541011" />
          <Text style={styles.noLiveTitle}>STAY TUNED</Text>
          <Text style={styles.noLiveDesc}>No program is currently on air.</Text>
        </View>
      )}

      <View style={styles.guideContainer}>
        <Text style={styles.guideTitle}>TV Guide</Text>
        <Text style={styles.todayLabel}>Today's Schedule</Text>

        {schedule.liveProgram && (
          <View style={[styles.guideItem, styles.activeGuideItem]}>
            <View style={styles.timeCol}>
              <Text style={styles.activeTime}>{schedule.liveProgram.startTime}</Text>
              <Text style={styles.onAirText}>ON AIR</Text>
            </View>
            <View style={styles.contentCol}>
              <Text style={styles.activeTitle}>{schedule.liveProgram.contentId?.title}</Text>
              <Text style={styles.activeCategory}>{schedule.liveProgram.contentId?.category}</Text>
            </View>
          </View>
        )}

        {schedule.upcomingPrograms.map((program) => (
          <TouchableOpacity
            key={program._id}
            style={styles.guideItem}
            onPress={() => navigation.navigate('MoviePlayer', { movie: program.contentId })}
          >
            <View style={styles.timeCol}>
              <Text style={styles.time}>{program.startTime}</Text>
            </View>
            <View style={styles.contentCol}>
              <Text style={styles.title}>{program.contentId?.title}</Text>
              <Text style={styles.category}>{program.contentId?.category}</Text>
            </View>
          </TouchableOpacity>
        ))}

        {schedule.upcomingPrograms.length === 0 && !schedule.liveProgram && (
           <Text style={styles.noPrograms}>No programs scheduled for today.</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandPlaymood: {
    color: '#b51315',
    fontSize: 24,
    fontWeight: '900',
  },
  brandTV: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '900',
  },
  liveSection: {
    position: 'relative',
    marginBottom: 20,
  },
  liveVideo: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: '#111',
  },
  liveBadge: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: '#541011',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    gap: 6,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  liveText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  programInfo: {
    padding: 20,
  },
  programTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  programDesc: {
    color: '#888',
    fontSize: 14,
    lineHeight: 20,
  },
  noLive: {
    padding: 60,
    alignItems: 'center',
    backgroundColor: '#111',
    margin: 20,
    borderRadius: 15,
  },
  noLiveTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 15,
  },
  noLiveDesc: {
    color: '#666',
    marginTop: 5,
  },
  guideContainer: {
    backgroundColor: '#111',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 25,
    minHeight: 400,
  },
  guideTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  todayLabel: {
    color: '#666',
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginTop: 5,
    marginBottom: 20,
  },
  guideItem: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    gap: 15,
  },
  activeGuideItem: {
    borderWidth: 1,
    borderColor: '#541011',
    backgroundColor: 'rgba(84, 16, 17, 0.1)',
  },
  timeCol: {
    width: 60,
  },
  time: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  activeTime: {
    color: '#541011',
    fontSize: 14,
    fontWeight: 'bold',
  },
  onAirText: {
    color: '#541011',
    fontSize: 10,
    fontWeight: 'bold',
    marginTop: 2,
  },
  contentCol: {
    flex: 1,
  },
  title: {
    color: '#ccc',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  activeTitle: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  category: {
    color: '#555',
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  activeCategory: {
    color: '#541011',
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  noPrograms: {
    color: '#555',
    textAlign: 'center',
    marginTop: 40,
    fontStyle: 'italic',
  }
});

export default Schedule;
