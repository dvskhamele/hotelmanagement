// Audit Service for AdvisorX CRM - Implements WORM (Write Once, Read Many) database
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// For production, we would use a proper database for audit logs
// For this prototype, we'll use JSON files to simulate WORM database behavior
class AuditService {
  constructor() {
    this.auditDir = path.join(__dirname, '../data/audit_logs');
    this.ensureAuditDirectory();
  }

  // Create audit directory if it doesn't exist
  ensureAuditDirectory() {
    if (!fs.existsSync(this.auditDir)) {
      fs.mkdirSync(this.auditDir, { recursive: true });
    }
  }

  // Log action to WORM database (write once, read many)
  async logAction(userId, userRole, actionType, actionDetails, clientId = null, ipAddress = null, userAgent = null) {
    try {
      const logEntry = {
        id: this.generateLogId(),
        timestamp: new Date().toISOString(),
        userId,
        userRole,
        clientId,
        actionType,
        actionDetails,
        ipAddress,
        userAgent,
        createdAt: new Date().toISOString()
      };

      // Write to daily log file to simulate WORM behavior
      const today = new Date().toISOString().split('T')[0];
      const logFilePath = path.join(this.auditDir, `audit_${today}.json`);
      
      // Append log entry to file (simulating WORM behavior)
      const logData = JSON.stringify(logEntry) + '\n';
      fs.appendFileSync(logFilePath, logData);
      
      console.log('Audit log entry created:', logEntry);

      return {
        success: true,
        logId: logEntry.id
      };
    } catch (error) {
      console.error('Error logging action:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Generate unique log ID
  generateLogId() {
    return Date.now() + Math.floor(Math.random() * 1000000);
  }

  // Retrieve audit logs (read-only)
  async getAuditLogs(filters = {}) {
    try {
      const { userId, clientId, actionType, dateFrom, dateTo, limit = 100 } = filters;
      
      // List all audit log files
      const files = fs.readdirSync(this.auditDir);
      const allLogs = [];
      
      for (const file of files) {
        if (file.startsWith('audit_') && file.endsWith('.json')) {
          const filePath = path.join(this.auditDir, file);
          const fileContent = fs.readFileSync(filePath, 'utf8');
          const lines = fileContent.trim().split('\n').filter(line => line);
          
          for (const line of lines) {
            try {
              const log = JSON.parse(line);
              
              // Apply filters
              let matches = true;
              
              if (userId && log.userId !== userId) matches = false;
              if (clientId && log.clientId !== clientId) matches = false;
              if (actionType && log.actionType !== actionType) matches = false;
              
              if (dateFrom) {
                const logDate = new Date(log.timestamp);
                const fromDate = new Date(dateFrom);
                if (logDate < fromDate) matches = false;
              }
              
              if (dateTo) {
                const logDate = new Date(log.timestamp);
                const toDate = new Date(dateTo);
                if (logDate > toDate) matches = false;
              }
              
              if (matches) {
                allLogs.push(log);
              }
            } catch (e) {
              console.error('Error parsing log line:', e);
            }
          }
        }
      }
      
      // Sort by timestamp (newest first) and apply limit
      const sortedLogs = allLogs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      return sortedLogs.slice(0, limit);
    } catch (error) {
      console.error('Error retrieving audit logs:', error);
      return [];
    }
  }

  // Generate SEBI compliance audit report
  async generateComplianceAuditReport(dateFrom, dateTo) {
    try {
      const logs = await this.getAuditLogs({ dateFrom, dateTo });
      
      // Group logs by client for report
      const groupedByClient = {};
      logs.forEach(log => {
        const clientId = log.clientId || 'system';
        if (!groupedByClient[clientId]) {
          groupedByClient[clientId] = [];
        }
        groupedByClient[clientId].push(log);
      });
      
      // Create report structure
      const report = {
        reportType: 'SEBI_COMPLIANCE_AUDIT',
        generationDate: new Date().toISOString(),
        period: { from: dateFrom, to: dateTo },
        totalActions: logs.length,
        clientsAffected: Object.keys(groupedByClient).length,
        actionCounts: this.getActionTypeCounts(logs),
        logsByClient: groupedByClient
      };
      
      return report;
    } catch (error) {
      console.error('Error generating compliance audit report:', error);
      throw error;
    }
  }

  // Get count of each action type
  getActionTypeCounts(logs) {
    const counts = {};
    logs.forEach(log => {
      counts[log.actionType] = (counts[log.actionType] || 0) + 1;
    });
    return counts;
  }

  // Log all the required actions as specified in the requirements
  async logUserLogin(userId, userRole, ipAddress, userAgent) {
    return this.logAction(userId, userRole, 'USER_LOGIN', 'User logged in to system', null, ipAddress, userAgent);
  }

  async logUserLogout(userId, userRole, ipAddress, userAgent) {
    return this.logAction(userId, userRole, 'USER_LOGOUT', 'User logged out of system', null, ipAddress, userAgent);
  }

  async logClientProfileView(userId, userRole, clientId, ipAddress, userAgent) {
    return this.logAction(userId, userRole, 'CLIENT_PROFILE_VIEW', `User viewed client profile`, clientId, ipAddress, userAgent);
  }

  async logClientDataImport(userId, userRole, clientId, ipAddress, userAgent) {
    return this.logAction(userId, userRole, 'CLIENT_DATA_IMPORT', `User imported client data`, clientId, ipAddress, userAgent);
  }

  async logCallInitiation(userId, userRole, clientId, ipAddress, userAgent) {
    return this.logAction(userId, userRole, 'CALL_INITIATION', `User initiated call to client`, clientId, ipAddress, userAgent);
  }

  async logCallDispositionUpdate(userId, userRole, clientId, disposition, ipAddress, userAgent) {
    return this.logAction(userId, userRole, 'CALL_DISPOSITION_UPDATE', `User updated call disposition to ${disposition}`, clientId, ipAddress, userAgent);
  }

  async logKYCCheck(userId, userRole, clientId, ipAddress, userAgent) {
    return this.logAction(userId, userRole, 'KYC_CHECK', `User performed KYC verification`, clientId, ipAddress, userAgent);
  }

  async logAgreementSent(userId, userRole, clientId, agreementType, ipAddress, userAgent) {
    return this.logAction(userId, userRole, 'AGREEMENT_SENT', `User sent ${agreementType} to client`, clientId, ipAddress, userAgent);
  }

  async logMessageSent(userId, userRole, clientId, messageType, templateName, ipAddress, userAgent) {
    return this.logAction(userId, userRole, 'MESSAGE_SENT', `User sent ${messageType} using template '${templateName}'`, clientId, ipAddress, userAgent);
  }

  async logTemplateCreation(userId, userRole, templateName, ipAddress, userAgent) {
    return this.logAction(userId, userRole, 'TEMPLATE_CREATED', `User created message template '${templateName}'`, null, ipAddress, userAgent);
  }

  async logTemplateModification(userId, userRole, templateName, ipAddress, userAgent) {
    return this.logAction(userId, userRole, 'TEMPLATE_MODIFIED', `User modified message template '${templateName}'`, null, ipAddress, userAgent);
  }

  async logReportGeneration(userId, userRole, reportType, dateRange, ipAddress, userAgent) {
    return this.logAction(userId, userRole, 'REPORT_GENERATED', `User generated ${reportType} report for ${dateRange}`, null, ipAddress, userAgent);
  }
}

// Export singleton instance
const auditService = new AuditService();
export default auditService;