// Reporting service for medical request analytics and staff performance metrics
class ReportingService {
  // Calculate average response time for completed requests
  static calculateAverageResponseTime(requests) {
    const completedRequests = requests.filter(r => r.status === 'COMPLETED' && r.completedAt && r.createdAt);
    
    if (completedRequests.length === 0) return 0;
    
    const totalResponseTime = completedRequests.reduce((total, request) => {
      const createdAt = new Date(request.createdAt);
      const completedAt = new Date(request.completedAt);
      const responseTime = (completedAt - createdAt) / 60000; // Convert to minutes
      return total + responseTime;
    }, 0);
    
    return Math.round(totalResponseTime / completedRequests.length);
  }
  
  // Get request volume by department
  static getRequestVolumeByDepartment(requests) {
    const volume = {};
    
    requests.forEach(request => {
      if (!volume[request.department]) {
        volume[request.department] = 0;
      }
      volume[request.department]++;
    });
    
    return volume;
  }
  
  // Get request volume by status
  static getRequestVolumeByStatus(requests) {
    const volume = {
      'PENDING': 0,
      'IN_PROGRESS': 0,
      'COMPLETED': 0,
      'CANCELLED': 0
    };
    
    requests.forEach(request => {
      if (volume[request.status] !== undefined) {
        volume[request.status]++;
      }
    });
    
    return volume;
  }
  
  // Get staff performance metrics
  static getStaffPerformanceMetrics(staffList, requests) {
    return staffList.map(staff => {
      // Count requests assigned to this staff member
      const assignedRequests = requests.filter(r => r.assignedTo === staff.id);
      const completedRequests = assignedRequests.filter(r => r.status === 'COMPLETED');
      
      // Calculate completion rate
      const completionRate = assignedRequests.length > 0 
        ? Math.round((completedRequests.length / assignedRequests.length) * 100) 
        : 0;
      
      // Calculate average completion time
      let avgCompletionTime = 0;
      if (completedRequests.length > 0) {
        const totalCompletionTime = completedRequests.reduce((total, request) => {
          const createdAt = new Date(request.createdAt);
          const completedAt = new Date(request.completedAt);
          const completionTime = (completedAt - createdAt) / 60000; // Convert to minutes
          return total + completionTime;
        }, 0);
        
        avgCompletionTime = Math.round(totalCompletionTime / completedRequests.length);
      }
      
      return {
        id: staff.id,
        name: staff.name,
        department: staff.department,
        requestsAssigned: assignedRequests.length,
        requestsCompleted: completedRequests.length,
        completionRate: completionRate,
        avgCompletionTime: avgCompletionTime,
        performanceScore: staff.performance || 0
      };
    });
  }
  
  // Get peak request times
  static getRequestTrends(requests) {
    const hourlyRequests = Array(24).fill(0);
    
    requests.forEach(request => {
      const hour = new Date(request.createdAt).getHours();
      hourlyRequests[hour]++;
    });
    
    // Find peak hours (top 3)
    const hoursWithCounts = hourlyRequests.map((count, hour) => ({ hour, count }));
    hoursWithCounts.sort((a, b) => b.count - a.count);
    
    return hoursWithCounts.slice(0, 3).map(item => ({
      hour: item.hour,
      count: item.count
    }));
  }
}

module.exports = ReportingService;