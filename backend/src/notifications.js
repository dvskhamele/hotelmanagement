// Notification service for sending push notifications to staff
class NotificationService {
  // Send push notification to staff member
  static sendPushNotification(staffMember, message) {
    // In a real implementation, this would integrate with a push notification service
    // For this prototype, we'll just log the notification
    console.log(`[PUSH NOTIFICATION] To: ${staffMember.name} (${staffMember.department}) - Message: ${message}`);
    
    // Add notification to activity log
    return {
      id: Date.now(),
      type: 'notification',
      title: 'Staff Notification Sent',
      description: `Notification sent to ${staffMember.name}: ${message}`,
      timestamp: new Date().toISOString(),
      status: 'SENT'
    };
  }
  
  // Send notifications to all staff in a department
  static notifyDepartment(department, staffList, message) {
    const departmentStaff = staffList.filter(staff => staff.department === department);
    const notifications = [];
    
    departmentStaff.forEach(staff => {
      const notification = this.sendPushNotification(staff, message);
      notifications.push(notification);
    });
    
    return notifications;
  }
  
  // Send notification to specific staff member by ID
  static notifyStaffById(staffId, staffList, message) {
    const staffMember = staffList.find(staff => staff.id === staffId);
    if (staffMember) {
      return this.sendPushNotification(staffMember, message);
    }
    return null;
  }
}

module.exports = NotificationService;