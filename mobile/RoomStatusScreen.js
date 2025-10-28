import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Appbar, Card, Title, Paragraph, Button, Menu, Provider as PaperProvider, ActivityIndicator, HelperText } from 'react-native-paper';
import localStorageService from './localStorageService';

const RoomStatusScreen = ({ user }) => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [menuVisible, setMenuVisible] = useState({});
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      setLoading(true);
      setError('');
      const roomData = localStorageService.getAllRooms();
      setRooms(roomData);
    } catch (error) {
      console.error('Error fetching rooms:', error);
      setError('Failed to fetch rooms');
    } finally {
      setLoading(false);
    }
  };

  const openMenu = (roomId) => {
    setMenuVisible({ ...menuVisible, [roomId]: true });
  };

  const closeMenu = (roomId) => {
    setMenuVisible({ ...menuVisible, [roomId]: false });
  };

  const updateRoomStatus = async (roomId, newStatus) => {
    try {
      // Check if user has permission to update room status
      if (!localStorageService.hasRole(user.role, ['ADMIN', 'MANAGER', 'SUPERVISOR', 'HOUSEKEEPING'])) {
        setError('Insufficient permissions to update room status');
        return;
      }
      
      const result = localStorageService.updateRoomStatus(roomId, newStatus, user.id, user.role);
      if (result.success) {
        // Update local state
        setRooms(rooms.map(room => 
          room.id === roomId 
            ? { ...room, status: newStatus, updatedAt: new Date().toISOString() } 
            : room
        ));
        setError('');
      } else {
        setError(result.error);
      }
    } catch (error) {
      console.error('Error updating room status:', error);
      setError('Failed to update room status');
    }
    closeMenu(roomId);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'CLEAN':
        return '#4CAF50';
      case 'DIRTY':
        return '#FFC107';
      case 'INSPECTED':
        return '#2196F3';
      case 'OUT_OF_ORDER':
        return '#F44336';
      default:
        return '#9E9E9E';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'CLEAN':
        return 'Clean';
      case 'DIRTY':
        return 'Dirty';
      case 'INSPECTED':
        return 'Inspected';
      case 'OUT_OF_ORDER':
        return 'Out of Order';
      default:
        return status;
    }
  };

  const filteredRooms = filter === 'All' 
    ? rooms 
    : rooms.filter(room => room.status === filter);

  const renderRoomItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.roomHeader}>
          <Title>Room {item.number}</Title>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
            <Text style={styles.statusText}>{getStatusText(item.status)}</Text>
          </View>
        </View>
        <Paragraph>Last Updated: {item.updatedAt ? new Date(item.updatedAt).toLocaleDateString() : 'N/A'}</Paragraph>
      </Card.Content>
      <Card.Actions>
        {localStorageService.hasRole(user.role, ['ADMIN', 'MANAGER', 'SUPERVISOR', 'HOUSEKEEPING']) ? (
          <Menu
            visible={menuVisible[item.id]}
            onDismiss={() => closeMenu(item.id)}
            anchor={
              <Button onPress={() => openMenu(item.id)}>
                Change Status
              </Button>
            }
          >
            <Menu.Item 
              onPress={() => updateRoomStatus(item.id, 'CLEAN')} 
              title="Clean" 
            />
            <Menu.Item 
              onPress={() => updateRoomStatus(item.id, 'DIRTY')} 
              title="Dirty" 
            />
            <Menu.Item 
              onPress={() => updateRoomStatus(item.id, 'INSPECTED')} 
              title="Inspected" 
            />
            <Menu.Item 
              onPress={() => updateRoomStatus(item.id, 'OUT_OF_ORDER')} 
              title="Out of Order" 
            />
          </Menu>
        ) : (
          <Button disabled>View Only</Button>
        )}
      </Card.Actions>
    </Card>
  );

  if (loading) {
    return (
      <PaperProvider>
        <View style={styles.container}>
          <Appbar.Header>
            <Appbar.Content title="Room Status" />
          </Appbar.Header>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" animating={true} />
          </View>
        </View>
      </PaperProvider>
    );
  }

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Appbar.Header>
          <Appbar.Content title="Room Status" />
        </Appbar.Header>
        {error ? (
          <HelperText type="error" visible={true} style={styles.errorText}>
            {error}
          </HelperText>
        ) : null}
        <View style={styles.filterContainer}>
          <Button 
            mode={filter === 'All' ? 'contained' : 'outlined'} 
            onPress={() => setFilter('All')}
            style={styles.filterButton}
          >
            All
          </Button>
          <Button 
            mode={filter === 'CLEAN' ? 'contained' : 'outlined'} 
            onPress={() => setFilter('CLEAN')}
            style={styles.filterButton}
          >
            Clean
          </Button>
          <Button 
            mode={filter === 'DIRTY' ? 'contained' : 'outlined'} 
            onPress={() => setFilter('DIRTY')}
            style={styles.filterButton}
          >
            Dirty
          </Button>
        </View>
        <FlatList
          data={filteredRooms}
          renderItem={renderRoomItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.listContainer}
          onRefresh={fetchRooms}
          refreshing={loading}
        />
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    marginHorizontal: 15,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#fff',
  },
  filterButton: {
    flex: 1,
    marginHorizontal: 5,
  },
  listContainer: {
    padding: 15,
  },
  card: {
    marginBottom: 10,
  },
  roomHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export default RoomStatusScreen;