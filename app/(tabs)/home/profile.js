import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const navigation = useNavigation();

  const handleLogout = () => {
    clearAuthToken();
    console.log('User logged out');
  };

  const clearAuthToken = async () => {
    try {
      await AsyncStorage.removeItem("authToken");
      const token = await AsyncStorage.getItem("authToken");
      if (!token) {
        console.log("auth token cleared");
        navigation.replace('/(authenticate)/login'); // Navigate to the Login screen
      } else {
        console.log("auth token not cleared");
      }
    } catch (error) {
      console.log("Error clearing auth token", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Icon name="lock" size={16} color="#000" style={{ marginRight: 5 }} />
        <Text style={styles.username}>jagadeesh_c31</Text>
        <Icon name="chevron-down" size={16} color="#000" style={{ marginLeft: 5 }} />
        <View style={styles.headerIcons}>
          <Icon name="circle" size={20} color="red" style={{ marginHorizontal: 15 }} />
          <Icon name="bars" size={20} color="#000" />
        </View>
      </View>

      {/* Profile Info */}
      <View style={styles.profileInfo}>
        <Image
          style={styles.profileImage}
          source={{ uri: 'https://media.licdn.com/dms/image/v2/C4D03AQGwx1msKINmVQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1660451966801?e=1741219200&v=beta&t=sBECGE2p10V6Q-bEeCZbecLMUQnXAzj2R_Qw9nKE3ZQ' }} // Replace with your image
        />
        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>13</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>419</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>731</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>
      </View>
      <Text style={styles.bio}>
        🎵manamm eduthunnam oka chemchadu bavasagaaralu..
      </Text>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Share Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      {/* Highlights Section */}
      <ScrollView horizontal style={styles.highlights}>
        {['piggy', 'street comic', 'A memorable...', 'projectexpo'].map(
          (highlight, index) => (
            <TouchableOpacity key={index} style={styles.highlight}>
              <Image
                style={styles.highlightImage}
                source={{ uri: 'https://media.licdn.com/dms/image/v2/C4D03AQGwx1msKINmVQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1660451966801?e=1741219200&v=beta&t=sBECGE2p10V6Q-bEeCZbecLMUQnXAzj2R_Qw9nKE3ZQ' }} // Replace with images
              />
              <Text style={styles.highlightLabel}>{highlight}</Text>
            </TouchableOpacity>
          )
        )}
      </ScrollView>

      {/* Tabs */}
      <View style={styles.tabs}>
        <Icon name="th-large" size={24} color="#000" />
        <Icon name="film" size={24} color="#999" />
        <Icon name="user-circle" size={24} color="#999" />
      </View>

      {/* Posts Grid */}
      <View style={styles.postsGrid}>
        {[...Array(9)].map((_, index) => (
          <Image
            key={index}
            style={styles.postImage}
            source={{ uri: 'https://imgs.search.brave.com/NaDDjSX3QXU-04z5jEIziIY6ww1QLwFnktJ5ZF8RI0A/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA5LzYwLzkyLzIz/LzM2MF9GXzk2MDky/MjMyNV9Renp0emlr/cXllU3dsQWxxUFd5/NkZjSzdpOTRiV2t2/bi5qcGc' }} // Replace with your images
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
    paddingHorizontal: 10,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  statsContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    color: '#888',
  },
  bio: {
    textAlign: 'left',
    paddingHorizontal: 15,
    fontSize: 14,
    marginBottom: 10,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#ddd',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#FF3B30', // Red color for logout
    paddingVertical: 12,
    marginHorizontal: 50,
    marginTop: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  highlights: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  highlight: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  highlightImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  highlightLabel: {
    fontSize: 12,
    marginTop: 5,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingVertical: 10,
  },
  postsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    marginTop: 10,
  },
  postImage: {
    width: '31%',
    height: 120,
    marginBottom: 5,
  },
});

export default ProfileScreen;
