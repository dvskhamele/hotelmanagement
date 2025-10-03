import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Appbar, Card, Title, Paragraph, Button, Provider as PaperProvider, Badge, IconButton } from 'react-native-paper';
import localStorageService from './localStorageService';

const NotificationComponent = ({ user, onLogout }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    if (user) {
      fetchNotifications();
    }
  }, [user]);

  const fetchNotifications = async () => {
    try {
      const result = localStorageService.getUserNotifications(user.id);
      if (result.success) {
        setNotifications(result.notifications);
        const unread = result.notifications.filter(n => !n.isRead).length;
        setUnreadCount(unread);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const markAsRead = async (id) => {
    try {
      const result = localStorageService.markAsRead(id);
      if (result.success) {
        setNotifications(notifications.map(n => 
          n.id === id ? { ...n, isRead: true } : n
        ));
        setUnreadCount(unreadCount - 1);
      }
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      const result = localStorageService.markAllAsRead(user.id);
      if (result.success) {
        setNotifications(notifications.map(n => ({ ...n, isRead: true })));
        setUnreadCount(0);
      }
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  const deleteNotification = async (id) => {
    try {
      const result = localStorageService.deleteNotification(id);
      if (result.success) {
        setNotifications(notifications.filter(n => n.id !== id));
        if (notifications.find(n => n.id === id && !n.isRead)) {
          setUnreadCount(unreadCount - 1);
        }
      }
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'room_status':
        return '🛏️';
      case 'request_status':
        return '📋';
      case 'new_request':
        return '🆕';
      default:
        return '🔔';
    }
  };

  const renderNotificationItem = ({ item }) => (
    <Card style={styles.notificationCard}>
      <Card.Content>
        <View style={styles.notificationHeader}>
          <View style={styles.notificationTitleContainer}>
            <Text style={styles.notificationIcon}>{getNotificationIcon(item.type)}</Text>
            <Title style={styles.notificationTitle}>{item.title}</Title>
          </View>
          {!item.isRead && (
            <Badge style={styles.unreadBadge} size={10} />
          )}
        </View>
        <Paragraph style={styles.notificationMessage}>{item.message}</Paragraph>
        <Text style={styles.notificationTime}>
          {new Date(item.createdAt).toLocaleString()}
        </Text>
      </Card.Content>
      <Card.Actions style={styles.notificationActions}>
        {!item.isRead && (
          <Button 
            onPress={() => markAsRead(item.id)} 
            mode="text" 
            compact
            textColor="#2196F3"
          >
            Mark as Read
          </Button>
        )}
        <Button 
          onPress={() => deleteNotification(item.id)} 
          mode="text" 
          compact
          textColor="#F44336"
        >
          Delete
        </Button>
      </Card.Actions>
    </Card>
  );

  return (
    <PaperProvider>
      <View>
        <Appbar.Header>
          <Appbar.Content title="Hotel Operations" />
          <View style={styles.headerRight}>
            <TouchableOpacity onPress={() => setShowNotifications(!showNotifications)}>
              <View>
                <IconButton
                  icon="bell"
                  color="#fff"
                  size={24}
                />
                {unreadCount > 0 && (
                  <Badge 
                    style={styles.notificationBadge} 
                    size={16}
                  >
                    {unreadCount}
                  </Badge>
                )}
              </View>
            </TouchableOpacity>
            <IconButton
              icon="account"
              color="#fff"
              size={24}
              onPress={onLogout}
            />
          </View>
        </Appbar.Header>

        {showNotifications && (
          <View style={styles.notificationsContainer}>
            <View style={styles.notificationsHeader}>
              <Title style={styles.notificationsTitle}>Notifications</Title>
              {unreadCount > 0 && (
                <Button 
                  onPress={markAllAsRead} 
                  mode="text" 
                  compact
                  textColor="#2196F3"
                >
                  Mark All as Read
                </Button>
              )}
            </View>
            {notifications.length === 0 ? (
              <View style={styles.emptyNotifications}>
                <Text style={styles.emptyNotificationsText}>No notifications</Text>
              </View>
            ) : (
              <FlatList
                data={notifications}
                renderItem={renderNotificationItem}
                keyExtractor={item => item.id.toString()}
                style={styles.notificationsList}
              />
            )}
          </View>
        )}
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationBadge: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
  notificationsContainer: {
    backgroundColor: '#fff',
    maxHeight: 400,
    elevation: 4,
    zIndex: 100,
  },
  notificationsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  notificationsTitle: {
    fontSize: 18,
  },
  emptyNotifications: {
    padding: 20,
    alignItems: 'center',
  },
  emptyNotificationsText: {
    color: '#666',
    fontSize: 16,
  },
  notificationsList: {
    maxHeight: 300,
  },
  notificationCard: {
    margin: 8,
    elevation: 2,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  notificationTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  unreadBadge: {
    backgroundColor: '#2196F3',
  },
  notificationMessage: {
    fontSize: 14,
    color: '#666',
    marginVertical: 4,
  },
  notificationTime: {
    fontSize: 12,
    color: '#999',
  },
  notificationActions: {
    justifyContent: 'flex-end',
  },
});

export default NotificationComponent;