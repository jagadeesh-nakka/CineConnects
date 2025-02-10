import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const App = () => {
  const menuItems = [
    { key: '1', name: 'Software', icon: 'movie' },
    { key: '2', name: 'creative and media', icon: 'music-note' },
    { key: '3', name: 'Event Management', icon: 'add' },
    { key: '4', name: 'Hotel Management', icon: 'book' },
    { key: '5', name: 'Enterpreneurship', icon: 'edit' },
    { key: '6', name: 'Cinematography', icon: 'camera-alt' },
    { key: '7', name: 'Production', icon: 'local-movies' },
    { key: '8', name: 'Editing', icon: 'scissors' },
    { key: '9', name: 'VFX', icon: 'brush' },
    { key: '10', name: 'Costume Design', icon: 'face' },
    { key: '11', name: 'Casting', icon: 'person' },
    { key: '12', name: 'Makeup', icon: 'palette' },
    { key: '13', name: 'Sound Design', icon: 'volume-up' },
    { key: '14', name: 'Lighting', icon: 'highlight' },
    { key: '15', name: 'Set Design', icon: 'home' },
    { key: '16', name: 'Location Scouting', icon: 'location-on' },
    { key: '17', name: 'Color Grading', icon: 'color-lens' },
    { key: '18', name: 'Script Supervision', icon: 'assignment' },
    { key: '19', name: 'Animation', icon: 'animation' },
    { key: '20', name: 'Props Management', icon: 'category' },
  ];

  const renderMenuItem = ({ item }) => (
    <TouchableOpacity style={styles.menuItem}>
      <Icon name={item.icon} size={30} color="#fff" />
      <Text style={styles.menuText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Text style={styles.greeting}>Good morning,</Text>
        <Text style={styles.profileName}>nakka Jagadeesh</Text>
      </View>

      {/* Menu Grid */}
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.key} // Use key instead of id
        renderItem={renderMenuItem}
        numColumns={3}
        contentContainerStyle={styles.menuContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c3e50', // Dark background
  },
  topBar: {
    padding: 20,
    backgroundColor: '#34495e',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  greeting: {
    color: '#fff',
    fontSize: 16,
  },
  profileName: {
    color: '#ff6347',
    fontSize: 18,
    fontWeight: 'bold',
  },
  menuContainer: {
    padding: 10,
    alignItems: 'center',
  },
  menuItem: {
    backgroundColor: '#34495e',
    borderRadius: 10,
    margin: 10,
    padding: 15,
    alignItems: 'center',
    width: 100,
    height: 100,
  },
  menuText: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 5,
  },
});

export default App;
