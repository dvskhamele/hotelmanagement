// Client Management Service for AdvisorX CRM - SEBI Compliant Client Onboarding and Management
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import auditService from './auditService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class ClientService {
  constructor() {
    this.dataDir = path.join(__dirname, '../data');
    this.clientsFile = path.join(this.dataDir, 'clients.json');
    this.ensureDataDirectory();
    this.loadClients();
  }

  // Create data directory if it doesn't exist
  ensureDataDirectory() {
    if (!fs.existsSync(this.dataDir)) {
      fs.mkdirSync(this.dataDir, { recursive: true });
    }
  }

  // Load clients from file
  loadClients() {
    if (!fs.existsSync(this.clientsFile)) {
      this.clients = [];
      this.saveClients();
    } else {
      const data = fs.readFileSync(this.clientsFile, 'utf8');
      this.clients = JSON.parse(data);
    }
  }

  // Save clients to file
  saveClients() {
    fs.writeFileSync(this.clientsFile, JSON.stringify(this.clients, null, 2));
  }

  // Generate unique client ID
  generateClientId() {
    const prefix = 'CLI';
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${prefix}${timestamp}${random}`;
  }

  // Create a new client prospect
  async createProspect(userData, createdByUserId, ipAddress = null, userAgent = null) {
    try {
      // Generate unique prospect ID
      const prospectId = this.generateClientId();
      
      const newClient = {
        id: this.clients.length > 0 ? Math.max(...this.clients.map(c => c.id)) + 1 : 1,
        prospectId,
        fullName: userData.fullName,
        mobileNumber: userData.mobileNumber,
        email: userData.email,
        panNumber: null,
        kycStatus: 'PENDING',
        kycVerificationDate: null,
        kycDetails: null,
        agreementStatus: 'PENDING',
        agreementSentAt: null,
        agreementSignedAt: null,
        agreementDocumentUrl: null,
        paymentStatus: 'PENDING',
        paymentCompletedAt: null,
        subscriptionPlan: null,
        subscriptionAmount: null,
        status: 'PROSPECT',
        source: userData.source || 'telecaller',
        notes: userData.notes || '',
        createdByUserId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      this.clients.push(newClient);
      this.saveClients();

      // Log the action
      await auditService.logAction(
        createdByUserId,
        'ONBOARDING_AGENT', // Assuming the creator is an onboarding agent
        'CLIENT_CREATED',
        `Created new prospect ${prospectId}`,
        newClient.id,
        ipAddress,
        userAgent
      );

      return {
        success: true,
        client: newClient
      };
    } catch (error) {
      console.error('Error creating prospect:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Get client by ID
  async getClientById(clientId) {
    const client = this.clients.find(c => c.id === clientId);
    if (!client) {
      return { success: false, error: 'Client not found' };
    }
    return { success: true, client };
  }

  // Get client by prospect ID
  async getClientByProspectId(prospectId) {
    const client = this.clients.find(c => c.prospectId === prospectId);
    if (!client) {
      return { success: false, error: 'Client not found' };
    }
    return { success: true, client };
  }

  // Update KYC status
  async updateKYCStatus(clientId, userId, status, verificationDate = null, kycDetails = null, ipAddress = null, userAgent = null) {
    try {
      const clientIndex = this.clients.findIndex(c => c.id === clientId);
      if (clientIndex === -1) {
        return { success: false, error: 'Client not found' };
      }

      // Update client KYC information
      this.clients[clientIndex].kycStatus = status;
      this.clients[clientIndex].kycVerificationDate = verificationDate || new Date().toISOString();
      this.clients[clientIndex].kycDetails = kycDetails;
      this.clients[clientIndex].status = this.calculateNextStatus(this.clients[clientIndex]);
      this.clients[clientIndex].updatedAt = new Date().toISOString();

      this.saveClients();

      // Log the action
      await auditService.logKYCCheck(userId, 'ONBOARDING_AGENT', clientId, ipAddress, userAgent);

      return {
        success: true,
        client: this.clients[clientIndex]
      };
    } catch (error) {
      console.error('Error updating KYC status:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Send agreement to client
  async sendAgreement(clientId, userId, agreementUrl, ipAddress = null, userAgent = null) {
    try {
      const clientIndex = this.clients.findIndex(c => c.id === clientId);
      if (clientIndex === -1) {
        return { success: false, error: 'Client not found' };
      }

      // Update agreement information
      this.clients[clientIndex].agreementStatus = 'SENT';
      this.clients[clientIndex].agreementDocumentUrl = agreementUrl;
      this.clients[clientIndex].agreementSentAt = new Date().toISOString();
      this.clients[clientIndex].status = this.calculateNextStatus(this.clients[clientIndex]);
      this.clients[clientIndex].updatedAt = new Date().toISOString();

      this.saveClients();

      // Log the action
      await auditService.logAgreementSent(userId, 'ONBOARDING_AGENT', clientId, 'Client Agreement', ipAddress, userAgent);

      return {
        success: true,
        client: this.clients[clientIndex]
      };
    } catch (error) {
      console.error('Error sending agreement:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Update agreement status to signed
  async updateAgreementStatus(clientId, userId, status, ipAddress = null, userAgent = null) {
    try {
      const clientIndex = this.clients.findIndex(c => c.id === clientId);
      if (clientIndex === -1) {
        return { success: false, error: 'Client not found' };
      }

      // Update agreement information
      this.clients[clientIndex].agreementStatus = status;
      if (status === 'SIGNED') {
        this.clients[clientIndex].agreementSignedAt = new Date().toISOString();
      }
      this.clients[clientIndex].status = this.calculateNextStatus(this.clients[clientIndex]);
      this.clients[clientIndex].updatedAt = new Date().toISOString();

      this.saveClients();

      // Log the action
      const actionType = status === 'SIGNED' ? 'AGREEMENT_SIGNED' : 'AGREEMENT_UPDATED';
      await auditService.logAction(
        userId,
        'ONBOARDING_AGENT',
        actionType,
        `Agreement ${status.toLowerCase()} for client`,
        clientId,
        ipAddress,
        userAgent
      );

      return {
        success: true,
        client: this.clients[clientIndex]
      };
    } catch (error) {
      console.error('Error updating agreement status:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Update payment status
  async updatePaymentStatus(clientId, userId, status, subscriptionPlan = null, amount = null, ipAddress = null, userAgent = null) {
    try {
      const clientIndex = this.clients.findIndex(c => c.id === clientId);
      if (clientIndex === -1) {
        return { success: false, error: 'Client not found' };
      }

      // Update payment information
      this.clients[clientIndex].paymentStatus = status;
      if (status === 'PAID') {
        this.clients[clientIndex].paymentCompletedAt = new Date().toISOString();
        this.clients[clientIndex].subscriptionPlan = subscriptionPlan;
        this.clients[clientIndex].subscriptionAmount = amount;
      }
      this.clients[clientIndex].status = this.calculateNextStatus(this.clients[clientIndex]);
      this.clients[clientIndex].updatedAt = new Date().toISOString();

      this.saveClients();

      // Log the action
      await auditService.logAction(
        userId,
        'ONBOARDING_AGENT',
        'PAYMENT_STATUS_UPDATE',
        `Payment status updated to ${status}`,
        clientId,
        ipAddress,
        userAgent
      );

      return {
        success: true,
        client: this.clients[clientIndex]
      };
    } catch (error) {
      console.error('Error updating payment status:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Calculate next client status based on current statuses
  calculateNextStatus(client) {
    if (client.kycStatus !== 'VERIFIED') {
      return 'KYC_PENDING';
    } else if (client.agreementStatus !== 'SIGNED') {
      return 'AGREEMENT_PENDING';
    } else if (client.paymentStatus !== 'PAID') {
      return 'PAYMENT_PENDING';
    } else {
      return 'ACTIVE_CLIENT';
    }
  }

  // Get clients by status for dashboard widgets
  getClientsByStatus() {
    const stats = {
      kycPending: 0,
      agreementPending: 0,
      paymentPending: 0,
      activeClients: 0
    };

    this.clients.forEach(client => {
      switch (client.status) {
        case 'KYC_PENDING':
          stats.kycPending++;
          break;
        case 'AGREEMENT_PENDING':
          stats.agreementPending++;
          break;
        case 'PAYMENT_PENDING':
          stats.paymentPending++;
          break;
        case 'ACTIVE_CLIENT':
          stats.activeClients++;
          break;
      }
    });

    return stats;
  }

  // Get all prospects for telecaller dashboard
  async getAllProspects() {
    return {
      success: true,
      prospects: this.clients.filter(client => client.status !== 'ACTIVE_CLIENT')
    };
  }

  // Get all clients
  async getAllClients() {
    return {
      success: true,
      clients: this.clients
    };
  }

  // Update client notes
  async updateClientNotes(clientId, userId, notes, ipAddress = null, userAgent = null) {
    try {
      const clientIndex = this.clients.findIndex(c => c.id === clientId);
      if (clientIndex === -1) {
        return { success: false, error: 'Client not found' };
      }

      this.clients[clientIndex].notes = notes;
      this.clients[clientIndex].updatedAt = new Date().toISOString();

      this.saveClients();

      // Log the action
      await auditService.logAction(
        userId,
        'ONBOARDING_AGENT',
        'CLIENT_NOTES_UPDATE',
        'Updated client notes',
        clientId,
        ipAddress,
        userAgent
      );

      return {
        success: true,
        client: this.clients[clientIndex]
      };
    } catch (error) {
      console.error('Error updating client notes:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
}

// Export singleton instance
const clientService = new ClientService();
export default clientService;