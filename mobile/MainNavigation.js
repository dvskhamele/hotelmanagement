import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { BottomNavigation } from 'react-native-paper';
import RoomStatusScreen from './RoomStatusScreen';
import RequestManagementScreen from './RequestManagementScreen';
import NotificationComponent from './NotificationComponent';

const MainNavigation = ({ user, onLogout }) => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'dashboard', title: 'Dashboard', icon: 'view-dashboard' },
    { key: 'rooms', title: 'Rooms', icon: 'bed' },
    { key: 'requests', title: 'Requests', icon: 'clipboard-list' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    dashboard: () => <RoomStatusScreen user={user} />,
    rooms: () => <RoomStatusScreen user={user} />,
    requests: () => <RequestManagementScreen user={user} />,
  });

  return (
    <View style={styles.container}>
      <NotificationComponent user={user} onLogout={onLogout} />
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        barStyle={styles.bottomNav}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  bottomNav: {
    backgroundColor: '#fff',
  },
});

export default MainNavigation;