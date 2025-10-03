'use client'

import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert, StatusBar } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Ionicons } from '@expo/vector-icons'

export default function StaffMobileApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [tasks, setTasks] = useState([])
  const [notifications, setNotifications] = useState([])
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    checkAuthStatus()
    loadMockData()
  }, [])

  const checkAuthStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('token')
      if (token) {
        // In a real app, we would decode the token to get user info
        // For now, we'll just set a default user
        setUser({ name: 'Staff User', role: 'HOUSEKEEPING' })
        setIsLoggedIn(true)
      }
    } catch (error) {
      console.error('Error checking auth status:', error)
    }
  }

  const loadMockData = () => {
    // Mock data for prototype
    setTasks([
      {
        id: 1,
        title: 'Clean Room 205',
        description: 'Standard cleaning of occupied room',
        priority: 'HIGH',
        status: 'PENDING',
        assignedTo: 'Staff User',
        dueDate: new Date(Date.now() + 86400000).toISOString(),
        location: '2nd Floor'
      },
      {
        id: 2,
        title: 'Inspect Room 108',
        description: 'Final inspection before guest arrival',
        priority: 'MEDIUM',
        status: 'IN_PROGRESS',
        assignedTo: 'Staff User',
        dueDate: new Date(Date.now() + 172800000).toISOString(),
        location: '1st Floor'
      },
      {
        id: 3,
        title: 'Replace towels in Room 302',
        description: 'Guest requested fresh towels',
        priority: 'URGENT',
        status: 'PENDING',
        assignedTo: 'Staff User',
        dueDate: new Date(Date.now() + 3600000).toISOString(),
        location: '3rd Floor'
      },
      {
        id: 4,
        title: 'Deep clean Room 104',
        description: 'Thorough cleaning after extended stay',
        priority: 'LOW',
        status: 'PENDING',
        assignedTo: 'Staff User',
        dueDate: new Date(Date.now() + 259200000).toISOString(),
        location: '1st Floor'
      }
    ])

    setNotifications([
      {
        id: 1,
        title: 'New Task Assigned',
        message: 'Clean Room 302 has been assigned to you',
        timestamp: new Date().toISOString(),
        read: false,
        type: 'task'
      },
      {
        id: 2,
        title: 'Room Status Update',
        message: 'Room 205 marked as Clean',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        read: true,
        type: 'room'
      },
      {
        id: 3,
        title: 'Maintenance Request',
        message: 'Leaky faucet in Room 210 requires attention',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        read: false,
        type: 'maintenance'
      }
    ])
  }

  const handleLogin = async () => {
    try {
      // Mock login for prototype
      if (email === 'staff@example.com' && password === 'staff123') {
        await AsyncStorage.setItem('token', 'mock-token')
        setUser({ name: 'Staff User', role: 'HOUSEKEEPING' })
        setIsLoggedIn(true)
      } else {
        Alert.alert('Login Failed', 'Invalid credentials')
      }
    } catch (error) {
      console.error('Login error:', error)
      Alert.alert('Error', 'Login failed')
    }
  }

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token')
      setUser(null)
      setIsLoggedIn(false)
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      setTasks(tasks.map(task => 
        task.id === taskId ? { ...task, status: newStatus } : task
      ))
      
      // Add notification for status update
      const updatedTask = tasks.find(t => t.id === taskId)
      if (updatedTask) {
        setNotifications([
          {
            id: notifications.length + 1,
            title: 'Task Status Updated',
            message: `${updatedTask.title} marked as ${newStatus}`,
            timestamp: new Date().toISOString(),
            read: false,
            type: 'task'
          },
          ...notifications
        ])
      }
      
      Alert.alert('Success', `Task marked as ${newStatus}`)
    } catch (error) {
      console.error('Error updating task status:', error)
      Alert.alert('Error', 'Failed to update task status')
    }
  }

  const markNotificationAsRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ))
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'LOW':
        return '#94a3b8'
      case 'MEDIUM':
        return '#f59e0b'
      case 'HIGH':
        return '#ef4444'
      case 'URGENT':
        return '#dc2626'
      default:
        return '#64748b'
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING':
        return '#f59e0b'
      case 'IN_PROGRESS':
        return '#3b82f6'
      case 'COMPLETED':
        return '#10b981'
      default:
        return '#64748b'
    }
  }

  if (!isLoggedIn) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.loginContainer}>
          <Text style={styles.loginTitle}>HotelOps Staff Login</Text>
          <Text style={styles.loginSubtitle}>Sign in to access your dashboard</Text>
          
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={20} color="#64748b" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color="#64748b" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>
          
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
          
          <Text style={styles.demoCredentials}>
            Demo credentials: staff@example.com / staff123
          </Text>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>HotelOps</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={() => setActiveTab('notifications')}>
            <Ionicons name="notifications-outline" size={24} color="#1e293b" />
            {notifications.filter(n => !n.read).length > 0 && (
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationBadgeText}>
                  {notifications.filter(n => !n.read).length}
                </Text>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Ionicons name="log-out-outline" size={24} color="#1e293b" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.content}>
        {activeTab === 'dashboard' && (
          <View>
            <Text style={styles.welcomeText}>Good morning, {user?.name}</Text>
            <Text style={styles.subtitleText}>Here's what's happening today</Text>
            
            {/* Stats Cards */}
            <View style={styles.statsContainer}>
              <View style={[styles.statCard, { backgroundColor: '#dbeafe' }]}>
                <Text style={styles.statNumber}>12</Text>
                <Text style={styles.statLabel}>Pending Tasks</Text>
              </View>
              <View style={[styles.statCard, { backgroundColor: '#fef3c7' }]}>
                <Text style={styles.statNumber}>3</Text>
                <Text style={styles.statLabel}>In Progress</Text>
              </View>
              <View style={[styles.statCard, { backgroundColor: '#d1fae5' }]}>
                <Text style={styles.statNumber}>8</Text>
                <Text style={styles.statLabel}>Completed</Text>
              </View>
            </View>
            
            {/* Quick Actions */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Quick Actions</Text>
              <View style={styles.quickActionsContainer}>
                <TouchableOpacity 
                  style={[styles.quickAction, { backgroundColor: '#dbeafe' }]}
                  onPress={() => setActiveTab('tasks')}
                >
                  <Ionicons name="list-outline" size={24} color="#2563eb" />
                  <Text style={styles.quickActionText}>View Tasks</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.quickAction, { backgroundColor: '#fef3c7' }]}
                  onPress={() => setActiveTab('rooms')}
                >
                  <Ionicons name="bed-outline" size={24} color="#d97706" />
                  <Text style={styles.quickActionText}>Room Status</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.quickAction, { backgroundColor: '#d1fae5' }]}
                  onPress={() => setActiveTab('requests')}
                >
                  <Ionicons name="chatbox-ellipses-outline" size={24} color="#059669" />
                  <Text style={styles.quickActionText}>Requests</Text>
                </TouchableOpacity>
              </View>
            </View>
            
            {/* Today's Tasks */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Today's Tasks</Text>
                <TouchableOpacity onPress={() => setActiveTab('tasks')}>
                  <Text style={styles.viewAllText}>View All</Text>
                </TouchableOpacity>
              </View>
              {tasks.filter(task => new Date(task.dueDate) < new Date(Date.now() + 86400000)).map((task) => (
                <View key={task.id} style={styles.taskCard}>
                  <View style={styles.taskHeader}>
                    <Text style={styles.taskTitle}>{task.title}</Text>
                    <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(task.priority) }]}>
                      <Text style={styles.priorityText}>{task.priority}</Text>
                    </View>
                  </View>
                  <Text style={styles.taskDescription}>{task.description}</Text>
                  <Text style={styles.taskLocation}>{task.location}</Text>
                  <View style={styles.taskFooter}>
                    <Text style={styles.taskDueDate}>
                      Due: {new Date(task.dueDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </Text>
                    <View style={[styles.statusBadge, { backgroundColor: getStatusColor(task.status) }]}>
                      <Text style={styles.statusText}>{task.status}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}
        
        {activeTab === 'tasks' && (
          <View>
            <Text style={styles.pageTitle}>My Tasks</Text>
            <View style={styles.filterContainer}>
              <TouchableOpacity style={styles.filterButton}>
                <Text style={styles.filterButtonText}>All</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.filterButton}>
                <Text style={styles.filterButtonText}>Pending</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.filterButton}>
                <Text style={styles.filterButtonText}>In Progress</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.filterButton}>
                <Text style={styles.filterButtonText}>Completed</Text>
              </TouchableOpacity>
            </View>
            {tasks.map((task) => (
              <View key={task.id} style={styles.taskCard}>
                <View style={styles.taskHeader}>
                  <Text style={styles.taskTitle}>{task.title}</Text>
                  <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(task.priority) }]}>
                    <Text style={styles.priorityText}>{task.priority}</Text>
                  </View>
                </View>
                <Text style={styles.taskDescription}>{task.description}</Text>
                <Text style={styles.taskLocation}>{task.location}</Text>
                <View style={styles.taskFooter}>
                  <Text style={styles.taskDueDate}>
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </Text>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(task.status) }]}>
                    <Text style={styles.statusText}>{task.status}</Text>
                  </View>
                </View>
                <View style={styles.taskActions}>
                  {task.status === 'PENDING' && (
                    <TouchableOpacity 
                      style={styles.actionButton}
                      onPress={() => updateTaskStatus(task.id, 'IN_PROGRESS')}
                    >
                      <Text style={styles.actionButtonText}>Start Task</Text>
                    </TouchableOpacity>
                  )}
                  {task.status === 'IN_PROGRESS' && (
                    <TouchableOpacity 
                      style={[styles.actionButton, { backgroundColor: '#10b981' }]}
                      onPress={() => updateTaskStatus(task.id, 'COMPLETED')}
                    >
                      <Text style={styles.actionButtonText}>Complete Task</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            ))}
          </View>
        )}
        
        {activeTab === 'notifications' && (
          <View>
            <Text style={styles.pageTitle}>Notifications</Text>
            <View style={styles.notificationActions}>
              <TouchableOpacity>
                <Text style={styles.markAllText}>Mark All as Read</Text>
              </TouchableOpacity>
            </View>
            {notifications.map((notification) => (
              <TouchableOpacity 
                key={notification.id} 
                style={[
                  styles.notificationCard, 
                  !notification.read && styles.unreadNotification
                ]}
                onPress={() => markNotificationAsRead(notification.id)}
              >
                <View style={styles.notificationHeader}>
                  <Text style={styles.notificationTitle}>{notification.title}</Text>
                  {!notification.read && (
                    <View style={styles.unreadIndicator} />
                  )}
                </View>
                <Text style={styles.notificationMessage}>{notification.message}</Text>
                <Text style={styles.notificationTime}>
                  {new Date(notification.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        
        {activeTab === 'rooms' && (
          <View>
            <Text style={styles.pageTitle}>Room Status</Text>
            <View style={styles.filterContainer}>
              <TouchableOpacity style={styles.filterButton}>
                <Text style={styles.filterButtonText}>All Rooms</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.filterButton}>
                <Text style={styles.filterButtonText}>Clean</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.filterButton}>
                <Text style={styles.filterButtonText}>Dirty</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.filterButton}>
                <Text style={styles.filterButtonText}>Out of Order</Text>
              </TouchableOpacity>
            </View>
            {/* Mock room data */}
            {[
              { id: 1, number: '101', status: 'CLEAN', floor: 1 },
              { id: 2, number: '102', status: 'DIRTY', floor: 1 },
              { id: 3, number: '103', status: 'INSPECTED', floor: 1 },
              { id: 4, number: '104', status: 'OUT_OF_ORDER', floor: 1 },
              { id: 5, number: '201', status: 'CLEAN', floor: 2 },
              { id: 6, number: '202', status: 'DIRTY', floor: 2 },
              { id: 7, number: '203', status: 'CLEAN', floor: 2 },
              { id: 8, number: '204', status: 'DIRTY', floor: 2 }
            ].map((room) => (
              <View key={room.id} style={styles.roomCard}>
                <View style={styles.roomHeader}>
                  <Text style={styles.roomNumber}>Room {room.number}</Text>
                  <View style={[
                    styles.roomStatusBadge, 
                    { 
                      backgroundColor: 
                        room.status === 'CLEAN' ? '#10b981' : 
                        room.status === 'DIRTY' ? '#f59e0b' : 
                        room.status === 'INSPECTED' ? '#3b82f6' : '#ef4444'
                    }
                  ]}>
                    <Text style={styles.roomStatusText}>{room.status}</Text>
                  </View>
                </View>
                <Text style={styles.roomFloor}>Floor {room.floor}</Text>
                <View style={styles.roomActions}>
                  <TouchableOpacity style={styles.roomActionButton}>
                    <Text style={styles.roomActionText}>Update Status</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={[styles.navItem, activeTab === 'dashboard' && styles.activeNavItem]}
          onPress={() => setActiveTab('dashboard')}
        >
          <Ionicons 
            name="home-outline" 
            size={24} 
            color={activeTab === 'dashboard' ? '#0d9488' : '#64748b'} 
          />
          <Text style={[styles.navText, activeTab === 'dashboard' && styles.activeNavText]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.navItem, activeTab === 'tasks' && styles.activeNavItem]}
          onPress={() => setActiveTab('tasks')}
        >
          <Ionicons 
            name="list-outline" 
            size={24} 
            color={activeTab === 'tasks' ? '#0d9488' : '#64748b'} 
          />
          <Text style={[styles.navText, activeTab === 'tasks' && styles.activeNavText]}>Tasks</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.navItem, activeTab === 'notifications' && styles.activeNavItem]}
          onPress={() => setActiveTab('notifications')}
        >
          <Ionicons 
            name="notifications-outline" 
            size={24} 
            color={activeTab === 'notifications' ? '#0d9488' : '#64748b'} 
          />
          <Text style={[styles.navText, activeTab === 'notifications' && styles.activeNavText]}>
            Notifications
          </Text>
          {notifications.filter(n => !n.read).length > 0 && (
            <View style={styles.bottomNavBadge}>
              <Text style={styles.bottomNavBadgeText}>
                {notifications.filter(n => !n.read).length}
              </Text>
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.navItem, activeTab === 'rooms' && styles.activeNavItem]}
          onPress={() => setActiveTab('rooms')}
        >
          <Ionicons 
            name="bed-outline" 
            size={24} 
            color={activeTab === 'rooms' ? '#0d9488' : '#64748b'} 
          />
          <Text style={[styles.navText, activeTab === 'rooms' && styles.activeNavText]}>Rooms</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc'
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8fafc'
  },
  loginTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 8
  },
  loginSubtitle: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 32
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    maxWidth: 320,
    marginBottom: 16,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  inputIcon: {
    marginRight: 12
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#1e293b'
  },
  loginButton: {
    backgroundColor: '#0d9488',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 32,
    width: '100%',
    maxWidth: 320,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600'
  },
  demoCredentials: {
    marginTop: 24,
    fontSize: 14,
    color: '#94a3b8',
    textAlign: 'center'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0f172a'
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  logoutButton: {
    marginLeft: 20
  },
  notificationBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#ef4444',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  notificationBadgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold'
  },
  content: {
    flex: 1,
    padding: 20
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 4
  },
  subtitleText: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 24
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24
  },
  statCard: {
    flex: 1,
    marginHorizontal: 4,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 4
  },
  statLabel: {
    fontSize: 14,
    color: '#64748b'
  },
  section: {
    marginBottom: 24
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0f172a'
  },
  viewAllText: {
    fontSize: 14,
    color: '#0d9488',
    fontWeight: '600'
  },
  quickActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  quickAction: {
    flex: 1,
    marginHorizontal: 4,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  quickActionText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#0f172a'
  },
  taskCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
    flex: 1
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12
  },
  priorityText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#ffffff'
  },
  taskDescription: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 8
  },
  taskLocation: {
    fontSize: 12,
    color: '#94a3b8',
    marginBottom: 12
  },
  taskFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  taskDueDate: {
    fontSize: 12,
    color: '#94a3b8'
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#ffffff'
  },
  taskActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 12
  },
  actionButton: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600'
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 16
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16
  },
  filterButton: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderColor: '#cbd5e1',
    borderWidth: 1
  },
  filterButtonText: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '600'
  },
  notificationActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 16
  },
  markAllText: {
    fontSize: 14,
    color: '#0d9488',
    fontWeight: '600'
  },
  notificationCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  unreadNotification: {
    borderLeftWidth: 4,
    borderLeftColor: '#0d9488'
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a'
  },
  unreadIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#0d9488'
  },
  notificationMessage: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 8
  },
  notificationTime: {
    fontSize: 12,
    color: '#94a3b8'
  },
  roomCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  roomHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8
  },
  roomNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a'
  },
  roomStatusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12
  },
  roomStatusText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#ffffff'
  },
  roomFloor: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 12
  },
  roomActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  roomActionButton: {
    backgroundColor: '#0d9488',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8
  },
  roomActionText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600'
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    position: 'relative'
  },
  activeNavItem: {
    borderTopWidth: 2,
    borderTopColor: '#0d9488'
  },
  navText: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 4
  },
  activeNavText: {
    color: '#0d9488',
    fontWeight: '600'
  },
  bottomNavBadge: {
    position: 'absolute',
    top: 8,
    right: 20,
    backgroundColor: '#ef4444',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomNavBadgeText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold'
  }
})

export default StaffMobileApp