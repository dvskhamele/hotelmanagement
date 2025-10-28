import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Appbar, Card, Title, Paragraph, Button, Menu, Provider as PaperProvider, ActivityIndicator, HelperText } from 'react-native-paper';
import localStorageService from './localStorageService';

const RequestManagementScreen = ({ user }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [menuVisible, setMenuVisible] = useState({});
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      setError('');
      const requestData = localStorageService.getAllRequests();
      setRequests(requestData);
    } catch (error) {
      console.error('Error fetching requests:', error);
      setError('Failed to fetch requests');
    } finally {
      setLoading(false);
    }
  };

  const openMenu = (requestId) => {
    setMenuVisible({ ...menuVisible, [requestId]: true });
  };

  const closeMenu = (requestId) => {
    setMenuVisible({ ...menuVisible, [requestId]: false });
  };

  const updateRequestStatus = async (requestId, newStatus) => {
    try {
      // Check if user has permission to update request status
      if (!localStorageService.hasRole(user.role, ['ADMIN', 'MANAGER', 'SUPERVISOR'])) {
        setError('Insufficient permissions to update request status');
        return;
      }
      
      const result = localStorageService.updateRequestStatus(requestId, newStatus, user.id, user.role);
      if (result.success) {
        // Update local state
        setRequests(requests.map(request => 
          request.id === requestId 
            ? { ...request, status: newStatus } 
            : request
        ));
        setError('');
      } else {
        setError(result.error);
      }
    } catch (error) {
      console.error('Error updating request status:', error);
      setError('Failed to update request status');
    }
    closeMenu(requestId);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING':
        return '#FFC107';
      case 'IN_PROGRESS':
        return '#2196F3';
      case 'COMPLETED':
        return '#4CAF50';
      default:
        return '#9E9E9E';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'LOW':
        return '#9E9E9E';
      case 'MEDIUM':
        return '#FFC107';
      case 'HIGH':
        return '#F44336';
      case 'URGENT':
        return '#F44336';
      default:
        return '#9E9E9E';
    }
  };

  const filteredRequests = filter === 'All' 
    ? requests 
    : requests.filter(request => request.status === filter);

  const renderRequestItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.requestHeader}>
          <Title>{item.title}</Title>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
        </View>
        <Paragraph>Room: {item.roomNumber}</Paragraph>
        <Paragraph>Guest: {item.guestName}</Paragraph>
        <Paragraph>Department: {item.department}</Paragraph>
        <View style={styles.footer}>
          <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(item.priority) }]}>
            <Text style={styles.priorityText}>{item.priority}</Text>
          </View>
          <Text style={styles.timeText}>Created: {new Date(item.createdAt).toLocaleDateString()}</Text>
        </View>
      </Card.Content>
      <Card.Actions>
        {localStorageService.hasRole(user.role, ['ADMIN', 'MANAGER', 'SUPERVISOR']) ? (
          <Menu
            visible={menuVisible[item.id]}
            onDismiss={() => closeMenu(item.id)}
            anchor={
              <Button onPress={() => openMenu(item.id)}>
                Update Status
              </Button>
            }
          >
            <Menu.Item 
              onPress={() => updateRequestStatus(item.id, 'PENDING')} 
              title="Pending" 
            />
            <Menu.Item 
              onPress={() => updateRequestStatus(item.id, 'IN_PROGRESS')} 
              title="In Progress" 
            />
            <Menu.Item 
              onPress={() => updateRequestStatus(item.id, 'COMPLETED')} 
              title="Completed" 
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
            <Appbar.Content title="Request Management" />
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
          <Appbar.Content title="Request Management" />
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
            mode={filter === 'PENDING' ? 'contained' : 'outlined'} 
            onPress={() => setFilter('PENDING')}
            style={styles.filterButton}
          >
            Pending
          </Button>
          <Button 
            mode={filter === 'IN_PROGRESS' ? 'contained' : 'outlined'} 
            onPress={() => setFilter('IN_PROGRESS')}
            style={styles.filterButton}
          >
            In Progress
          </Button>
        </View>
        <FlatList
          data={filteredRequests}
          renderItem={renderRequestItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.listContainer}
          onRefresh={fetchRequests}
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
  requestHeader: {
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
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  priorityText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 10,
  },
  timeText: {
    fontSize: 12,
    color: '#666',
  },
});

export default RequestManagementScreen;