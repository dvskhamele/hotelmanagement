// Calling Service for AdvisorX CRM - Handles telephony integration and call logging
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import auditService from './auditService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class CallingService {
  constructor() {
    this.dataDir = path.join(__dirname, '../data');
    this.callsFile = path.join(this.dataDir, 'calls.json');
    this.ensureDataDirectory();
    this.loadCalls();
  }

  // Create data directory if it doesn't exist
  ensureDataDirectory() {
    if (!fs.existsSync(this.dataDir)) {
      fs.mkdirSync(this.dataDir, { recursive: true });
    }
  }

  // Load calls from file
  loadCalls() {
    if (!fs.existsSync(this.callsFile)) {
      this.calls = [];
      this.saveCalls();
    } else {
      const data = fs.readFileSync(this.callsFile, 'utf8');
      this.calls = JSON.parse(data);
    }
  }

  // Save calls to file
  saveCalls() {
    fs.writeFileSync(this.callsFile, JSON.stringify(this.calls, null, 2));
  }

  // Initiate a call
  async initiateCall(userId, clientId, ipAddress = null, userAgent = null) {
    try {
      const newCall = {
        id: this.calls.length > 0 ? Math.max(...this.calls.map(c => c.id)) + 1 : 1,
        callerId: userId,
        clientId: clientId,
        callStatus: 'INITIATED',
        disposition: null,
        recordingUrl: null,
        callStartedAt: new Date().toISOString(),
        callEndedAt: null,
        duration: null,
        notes: '',
        createdAt: new Date().toISOString()
      };

      this.calls.push(newCall);
      this.saveCalls();

      // Log the action
      await auditService.logCallInitiation(userId, 'ONBOARDING_AGENT', clientId, ipAddress, userAgent);

      return {
        success: true,
        call: newCall
      };
    } catch (error) {
      console.error('Error initiating call:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Update call disposition
  async updateCallDisposition(callId, userId, disposition, clientId, notes = '', ipAddress = null, userAgent = null) {
    try {
      const callIndex = this.calls.findIndex(c => c.id === callId);
      if (callIndex === -1) {
        return { success: false, error: 'Call not found' };
      }

      this.calls[callIndex].disposition = disposition;
      this.calls[callIndex].notes = notes;
      this.calls[callIndex].callStatus = disposition === 'INTERESTED' ? 'COMPLETED' : 'COMPLETED';
      this.calls[callIndex].callEndedAt = new Date().toISOString();
      this.calls[callIndex].duration = this.calculateCallDuration(this.calls[callIndex].callStartedAt, new Date().toISOString());

      this.saveCalls();

      // Log the action
      await auditService.logCallDispositionUpdate(userId, 'ONBOARDING_AGENT', clientId, disposition, ipAddress, userAgent);

      return {
        success: true,
        call: this.calls[callIndex]
      };
    } catch (error) {
      console.error('Error updating call disposition:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Calculate call duration in seconds
  calculateCallDuration(start, end) {
    const startDate = new Date(start);
    const endDate = new Date(end);
    return Math.floor((endDate - startDate) / 1000);
  }

  // Get calls for a specific client
  async getCallsForClient(clientId) {
    const clientCalls = this.calls.filter(c => c.clientId === clientId);
    return {
      success: true,
      calls: clientCalls
    };
  }

  // Get calls for a specific user
  async getCallsForUser(userId) {
    const userCalls = this.calls.filter(c => c.callerId === userId);
    return {
      success: true,
      calls: userCalls
    };
  }

  // Get all calls
  async getAllCalls() {
    return {
      success: true,
      calls: this.calls
    };
  }

  // Update call recording URL (for integration with cloud telephony)
  async updateCallRecording(callId, recordingUrl) {
    try {
      const callIndex = this.calls.findIndex(c => c.id === callId);
      if (callIndex === -1) {
        return { success: false, error: 'Call not found' };
      }

      this.calls[callIndex].recordingUrl = recordingUrl;
      this.saveCalls();

      return {
        success: true,
        call: this.calls[callIndex]
      };
    } catch (error) {
      console.error('Error updating call recording:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Get call dispositions summary
  getCallDispositionsSummary() {
    const summary = {
      INTERESTED: 0,
      NOT_INTERESTED: 0,
      FOLLOW_UP: 0,
      WRONG_NUMBER: 0
    };

    this.calls.forEach(call => {
      if (call.disposition) {
        summary[call.disposition] = (summary[call.disposition] || 0) + 1;
      }
    });

    return summary;
  }
}

// Export singleton instance
const callingService = new CallingService();
export default callingService;