import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Colors from '../constants/Colors';

interface AIChatProps {
  onBack: () => void;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export default function AIChat({ onBack }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "👋 Hi! I'm your CarbClean AI assistant, available 24/7. I can help you with:\n\n• Booking CARB tests\n• Compliance questions\n• Test locations & pricing\n• Schedule management\n• Fleet account info\n\nHow can I assist you today?",
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);

  const quickReplies = [
    '📅 Book a test',
    '📍 Find nearest tester',
    '💰 Pricing info',
    '⏰ Test hours',
    '🚛 Fleet account',
  ];

  useEffect(() => {
    // Auto-scroll to bottom when messages change
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const handleSend = (text?: string) => {
    const messageText = text || inputText.trim();
    if (!messageText) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = getAIResponse(messageText);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 800);
  };

  const getAIResponse = (userMessage: string): string => {
    const msg = userMessage.toLowerCase();

    if (msg.includes('book') || msg.includes('test') || msg.includes('schedule')) {
      return "🎯 I can help you book a CARB test right away!\n\nOur mobile testing service comes to you. Would you like to:\n\n1. Book for today/tomorrow (express)\n2. Schedule for later this week\n3. Set up recurring tests for your fleet\n\nJust let me know your preference, and I'll check available time slots in your area!";
    }

    if (msg.includes('price') || msg.includes('cost') || msg.includes('how much')) {
      return "💰 CARB Testing Pricing:\n\n• Single truck: $150\n• Express service (24hr): $200\n• Fleet discount (3+ trucks): $120/ea\n• Monthly subscription: $99/truck\n\nAll prices include:\n✓ Mobile service (we come to you)\n✓ Digital certificate\n✓ Compliance tracking\n✓ SMS reminders\n\nWant to book a test?";
    }

    if (msg.includes('location') || msg.includes('where') || msg.includes('find')) {
      return "📍 We serve all of Northern California!\n\nOur mobile testers cover:\n• Sacramento & surrounding areas\n• San Francisco Bay Area\n• San Joaquin Valley\n• Fresno region\n\nEnter your zip code and I'll find the nearest available tester and show you their schedule. What's your zip code?";
    }

    if (msg.includes('hours') || msg.includes('when') || msg.includes('time')) {
      return "⏰ Service Hours:\n\n• Monday-Friday: 6am - 8pm\n• Saturday: 8am - 6pm\n• Sunday: Emergency only\n\n🚨 24/7 Emergency Testing Available\n(for urgent compliance needs)\n\nWe're flexible! Most testers can accommodate early morning or evening appointments. What time works best for you?";
    }

    if (msg.includes('fleet') || msg.includes('multiple') || msg.includes('trucks')) {
      return "🚛 Fleet Management Services:\n\n✓ Volume discounts (save up to 30%)\n✓ Dedicated account manager\n✓ Automated compliance tracking\n✓ Priority scheduling\n✓ Bulk reporting for audits\n✓ Single invoice for all vehicles\n\nWe work with major fleets including Altec and regional carriers. How many vehicles do you need to manage?";
    }

    if (/\d{5}/.test(msg)) {
      // Zip code detected
      const zipCode = msg.match(/\d{5}/)?.[0];
      return `📍 Great! For zip code ${zipCode}:\n\n🏛️ County: Sacramento County\n\n📞 Available Testers:\n\n1. Mobile CARB Pro\n   ☎️ (916) 555-0142\n   ⭐ 4.9 stars | Next: Tomorrow 9am\n\n2. Quick Test Services\n   ☎️ (415) 555-0198\n   ⭐ 4.8 stars | Next: Today 3pm\n\n3. Valley Compliance\n   ☎️ (209) 555-0176\n   ⭐ 4.7 stars | Next: Friday 10am\n\nWould you like me to book with one of these testers?`;
    }

    // Default response
    return "I'm here to help! I can assist with:\n\n• 📅 Booking tests\n• 📍 Finding testers in your area\n• 💰 Pricing & payment options\n• ⏰ Scheduling & availability\n• 🚛 Fleet account setup\n• ✅ Compliance questions\n\nWhat would you like to know?";
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={0}
    >
      <StatusBar style="light" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>AI Support</Text>
          <View style={styles.onlineIndicator}>
            <View style={styles.onlineDot} />
            <Text style={styles.onlineText}>Online 24/7</Text>
          </View>
        </View>
        <View style={styles.placeholder} />
      </View>

      {/* Messages */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((message) => (
          <View
            key={message.id}
            style={[
              styles.messageBubble,
              message.sender === 'user' ? styles.userBubble : styles.aiBubble,
            ]}
          >
            {message.sender === 'ai' && (
              <View style={styles.aiAvatar}>
                <Text style={styles.aiAvatarText}>🤖</Text>
              </View>
            )}
            <View
              style={[
                styles.messageContent,
                message.sender === 'user'
                  ? styles.userMessageContent
                  : styles.aiMessageContent,
              ]}
            >
              <Text
                style={[
                  styles.messageText,
                  message.sender === 'user' && styles.userMessageText,
                ]}
              >
                {message.text}
              </Text>
              <Text
                style={[
                  styles.timestamp,
                  message.sender === 'user' && styles.userTimestamp,
                ]}
              >
                {message.timestamp.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Quick Replies */}
      <ScrollView
        horizontal
        style={styles.quickRepliesContainer}
        contentContainerStyle={styles.quickRepliesContent}
        showsHorizontalScrollIndicator={false}
      >
        {quickReplies.map((reply, index) => (
          <TouchableOpacity
            key={index}
            style={styles.quickReply}
            onPress={() => handleSend(reply)}
          >
            <Text style={styles.quickReplyText}>{reply}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type your message..."
          placeholderTextColor={Colors.text.muted}
          multiline
          maxLength={500}
        />
        <TouchableOpacity
          style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
          onPress={() => handleSend()}
          disabled={!inputText.trim()}
        >
          <Text style={styles.sendIcon}>→</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.darker,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.background.card,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 28,
    color: Colors.primary.green,
  },
  headerInfo: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: 4,
  },
  onlineIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.compliance.passed,
    marginRight: 6,
  },
  onlineText: {
    fontSize: 12,
    color: Colors.text.secondary,
  },
  placeholder: {
    width: 40,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  messageBubble: {
    flexDirection: 'row',
    marginBottom: 16,
    maxWidth: '85%',
  },
  userBubble: {
    alignSelf: 'flex-end',
  },
  aiBubble: {
    alignSelf: 'flex-start',
  },
  aiAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.primary.green + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  aiAvatarText: {
    fontSize: 20,
  },
  messageContent: {
    borderRadius: 16,
    padding: 14,
    maxWidth: '100%',
  },
  userMessageContent: {
    backgroundColor: Colors.primary.green,
    borderBottomRightRadius: 4,
  },
  aiMessageContent: {
    backgroundColor: Colors.background.card,
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 15,
    color: Colors.text.primary,
    lineHeight: 22,
    marginBottom: 4,
  },
  userMessageText: {
    color: Colors.text.onGreen,
  },
  timestamp: {
    fontSize: 11,
    color: Colors.text.muted,
    marginTop: 4,
  },
  userTimestamp: {
    color: Colors.background.darker,
    opacity: 0.7,
  },
  quickRepliesContainer: {
    maxHeight: 50,
    borderTopWidth: 1,
    borderTopColor: Colors.background.card,
  },
  quickRepliesContent: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 8,
  },
  quickReply: {
    backgroundColor: Colors.background.card,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: Colors.primary.green + '40',
  },
  quickReplyText: {
    fontSize: 13,
    color: Colors.text.primary,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.background.card,
    backgroundColor: Colors.background.darker,
  },
  input: {
    flex: 1,
    backgroundColor: Colors.background.card,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    color: Colors.text.primary,
    maxHeight: 100,
    marginRight: 12,
  },
  sendButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primary.green,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: Colors.background.card,
    opacity: 0.5,
  },
  sendIcon: {
    fontSize: 24,
    color: Colors.text.onGreen,
    fontWeight: '700',
  },
});
