import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ChatProfileScreen = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hey! How are you?', sender: 'other' },
    { id: 2, text: 'I am good, how about you?', sender: 'me' },
    { id: 3, text: 'All good! What’s up?', sender: 'other' },
  ]);

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages([
        ...messages,
        { id: messages.length + 1, text: message, sender: 'me' },
      ]);
      setMessage('');
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Icon name="arrow-left" size={24} color="#000" />
        <View style={styles.headerCenter}>
          <Image
            style={styles.profileImage}
            source={{ uri: 'https://via.placeholder.com/100' }} // Replace with your image
          />
          <View>
            <Text style={styles.username}>John Doe</Text>
            <Text style={styles.status}>Online</Text>
          </View>
        </View>
        <Icon name="phone" size={24} color="#000" />
      </View>

      {/* Chat History */}
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <View
            style={[
              styles.message,
              item.sender === 'me' ? styles.sentMessage : styles.receivedMessage,
            ]}
          >
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        style={styles.messagesContainer}
      />

      {/* Message Input */}
      <View style={styles.messageInputContainer}>
        <TextInput
          style={styles.messageInput}
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message"
        />
        <TouchableOpacity onPress={handleSendMessage} style={styles.sendButton}>
          <Icon name="send" size={20} color="#fff" />
        </TouchableOpacity>
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
    padding: 10,
    backgroundColor: '#f1f1f1',
  },
  headerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    flex: 1,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 3,
  },
  status: {
    fontSize: 14,
    color: '#666',
  },
  messagesContainer: {
    padding: 10,
  },
  message: {
    maxWidth: '80%',
    marginBottom: 10,
    borderRadius: 15,
    padding: 10,
  },
  sentMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#0078ff',
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#ddd',
  },
  messageText: {
    color: '#fff',
  },
  messageInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  messageInput: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 15,
  },
  sendButton: {
    backgroundColor: '#0078ff',
    borderRadius: 20,
    padding: 10,
    marginLeft: 10,
  },
});

export default ChatProfileScreen;
