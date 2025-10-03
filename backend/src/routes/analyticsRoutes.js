const express = require('express');
const router = express.Router();
const AnalyticsService = require('../services/analyticsService');

// Initialize analytics service
let analyticsService;

// Middleware to initialize analytics service
router.use((req, res, next) => {
  if (!analyticsService) {
    analyticsService = new AnalyticsService();
  }
  next();
});

// Get response time statistics
router.get('/response-times', async (req, res) => {
  try {
    const result = await analyticsService.getResponseTimeStats();
    
    if (result.success) {
      res.json({ 
        success: true, 
        stats: result.stats
      });
    } else {
      res.status(500).json({ 
        success: false, 
        error: result.error 
      });
    }
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Get staff productivity statistics
router.get('/productivity', async (req, res) => {
  try {
    const result = await analyticsService.getStaffProductivityStats();
    
    if (result.success) {
      res.json({ 
        success: true, 
        stats: result.stats
      });
    } else {
      res.status(500).json({ 
        success: false, 
        error: result.error 
      });
    }
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Get request trends
router.get('/trends', async (req, res) => {
  try {
    const result = await analyticsService.getRequestTrends();
    
    if (result.success) {
      res.json({ 
        success: true, 
        trends: result.trends
      });
    } else {
      res.status(500).json({ 
        success: false, 
        error: result.error 
      });
    }
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Generate comprehensive report
router.get('/report', async (req, res) => {
  try {
    const result = await analyticsService.generateReport();
    
    if (result.success) {
      res.json({ 
        success: true, 
        report: result.report
      });
    } else {
      res.status(500).json({ 
        success: false, 
        error: result.error 
      });
    }
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Export report as CSV
router.get('/report/export', async (req, res) => {
  try {
    const result = await analyticsService.generateReport();
    
    if (result.success) {
      // In a real implementation, we would generate a CSV file
      // For prototype, we'll just return a mock CSV
      const csvContent = `Generated At,Period,Total Requests,Completed Requests,Average Response Time,Overall Productivity
${result.report.generatedAt},${result.report.period},${result.report.summary.totalRequests},${result.report.summary.completedRequests},${result.report.summary.averageResponseTime},${result.report.summary.overallProductivity}`;
      
      res.header('Content-Type', 'text/csv');
      res.attachment('analytics-report.csv');
      res.send(csvContent);
    } else {
      res.status(500).json({ 
        success: false, 
        error: result.error 
      });
    }
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

module.exports = router;