// Notification Service - Handles sending notifications to users
import fs from 'fs';
import path from 'path';

const __dirname = path.dirname(new URL(import.meta.url).href);

class NotificationService {
  constructor() {
    this.dataDir = path.join(__dirname, '../data');
    this.notificationsFile = path.join(this.dataDir, 'notifications.json');
    this.ensureDataDirectory();
    // Initialize with default notifications if not exists
    this.initializeNotifications();
  }

  // Create data directory if it doesn't exist
  ensureDataDirectory() {
    if (!fs.existsSync(this.dataDir)) {
      fs.mkdirSync(this.dataDir, { recursive: true });
    }
  }

  // Initialize default notifications in file system
  initializeNotifications() {
    // Check if we already have notifications
    if (!fs.existsSync(this.notificationsFile)) {
      const initialNotifications = [];
      fs.writeFileSync(this.notificationsFile, JSON.stringify(initialNotifications, null, 2));
    }
  }

  // Get all notifications from file system
  getNotifications() {
    if (!fs.existsSync(this.notificationsFile)) {
      return [];
    }
    const notifications = fs.readFileSync(this.notificationsFile, 'utf8');
    return notifications ? JSON.parse(notifications) : [];
  }

  // Save notifications to file system
  saveNotifications(notifications) {
    fs.writeFileSync(this.notificationsFile, JSON.stringify(notifications, null, 2));
  }

  // Create a new notification
  createNotification(userId, type, title, message, relatedId = null) {
    try {
      const notifications = this.getNotifications();
      
      // Generate new ID
      const newId = notifications.length > 0 ? Math.max(...notifications.map(n => n.id)) + 1 : 1;
      
      // Create new notification
      const newNotification = {
        id: newId,
        userId,
        type,
        title,
        message,
        relatedId,
        isRead: false,
        createdAt: new Date().toISOString()
      };
      
      // Add to notifications array
      notifications.push(newNotification);
      
      // Save notifications
      this.saveNotifications(notifications);
      
      return {
        success: true,
        notification: newNotification
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to create notification'
      };
    }
  }

  // Get notifications for a specific user
  getUserNotifications(userId) {
    try {
      const notifications = this.getNotifications();
      const userNotifications = notifications.filter(n => n.userId === userId);
      return {
        success: true,
        notifications: userNotifications
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to fetch notifications'
      };
    }
  }

  // Mark notification as read
  markAsRead(notificationId) {
    try {
      const notifications = this.getNotifications();
      const notificationIndex = notifications.findIndex(n => n.id === notificationId);
      
      if (notificationIndex !== -1) {
        notifications[notificationIndex].isRead = true;
        
        // Save notifications
        this.saveNotifications(notifications);
        
        return {
          success: true,
          notification: notifications[notificationIndex]
        };
      }
      
      return {
        success: false,
        error: 'Notification not found'
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to mark notification as read'
      };
    }
  }

  // Mark all notifications as read for a user
  markAllAsRead(userId) {
    try {
      const notifications = this.getNotifications();
      const userNotifications = notifications.filter(n => n.userId === userId);
      
      userNotifications.forEach(notification => {
        const index = notifications.findIndex(n => n.id === notification.id);
        if (index !== -1) {
          notifications[index].isRead = true;
        }
      });
      
      // Save notifications
      this.saveNotifications(notifications);
      
      return {
        success: true,
        count: userNotifications.length
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to mark all notifications as read'
      };
    }
  }

  // Delete a notification
  deleteNotification(notificationId) {
    try {
      const notifications = this.getNotifications();
      const filteredNotifications = notifications.filter(n => n.id !== notificationId);
      
      // Save notifications
      this.saveNotifications(filteredNotifications);
      
      return {
        success: true
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to delete notification'
      };
    }
  }

  // Create room status change notification
  createRoomStatusNotification(userId, roomId, newStatus) {
    const title = 'Room Status Updated';
    const message = `Room ${roomId} has been marked as ${newStatus}`;
    return this.createNotification(userId, 'room_status', title, message, roomId);
  }

  // Create request status change notification
  createRequestStatusNotification(userId, requestId, newStatus) {
    const title = 'Request Status Updated';
    const message = `Request ${requestId} has been marked as ${newStatus}`;
    return this.createNotification(userId, 'request_status', title, message, requestId);
  }

  // Create new request notification
  createNewRequestNotification(userId, requestId, requestTitle) {
    const title = 'New Request Created';
    const message = `A new request has been created: ${requestTitle}`;
    return this.createNotification(userId, 'new_request', title, message, requestId);
  }
}

// Export as a singleton
const notificationService = new NotificationService();
export default notificationService;