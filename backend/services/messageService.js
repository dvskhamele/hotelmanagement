// Message Service for AdvisorX CRM - Handles advisory delivery and message templates
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import auditService from './auditService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class MessageService {
  constructor() {
    this.dataDir = path.join(__dirname, '../data');
    this.messagesFile = path.join(this.dataDir, 'messages.json');
    this.templatesFile = path.join(this.dataDir, 'templates.json');
    this.ensureDataDirectory();
    this.loadMessages();
    this.loadTemplates();
  }

  // Create data directory if it doesn't exist
  ensureDataDirectory() {
    if (!fs.existsSync(this.dataDir)) {
      fs.mkdirSync(this.dataDir, { recursive: true });
    }
  }

  // Load messages from file
  loadMessages() {
    if (!fs.existsSync(this.messagesFile)) {
      this.messages = [];
      this.saveMessages();
    } else {
      const data = fs.readFileSync(this.messagesFile, 'utf8');
      this.messages = JSON.parse(data);
    }
  }

  // Save messages to file
  saveMessages() {
    fs.writeFileSync(this.messagesFile, JSON.stringify(this.messages, null, 2));
  }

  // Load templates from file
  loadTemplates() {
    if (!fs.existsSync(this.templatesFile)) {
      this.templates = [];
      this.saveTemplates();
    } else {
      const data = fs.readFileSync(this.templatesFile, 'utf8');
      this.templates = JSON.parse(data);
    }
  }

  // Save templates to file
  saveTemplates() {
    fs.writeFileSync(this.templatesFile, JSON.stringify(this.templates, null, 2));
  }

  // Create a new message template
  async createTemplate(name, body, userId, ipAddress = null, userAgent = null) {
    try {
      // Extract placeholders from body (like {Stock_Name}, {Entry_Price}, etc.)
      const placeholders = this.extractPlaceholders(body);
      
      const newTemplate = {
        id: this.templates.length > 0 ? Math.max(...this.templates.map(t => t.id)) + 1 : 1,
        name,
        body,
        placeholders,
        createdBy: userId,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      this.templates.push(newTemplate);
      this.saveTemplates();

      // Log the action
      await auditService.logTemplateCreation(userId, 'RESEARCH_ANALYST', name, ipAddress, userAgent);

      return {
        success: true,
        template: newTemplate
      };
    } catch (error) {
      console.error('Error creating template:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Update a message template
  async updateTemplate(templateId, name, body, isActive, userId, ipAddress = null, userAgent = null) {
    try {
      const templateIndex = this.templates.findIndex(t => t.id === templateId);
      if (templateIndex === -1) {
        return { success: false, error: 'Template not found' };
      }

      // Extract placeholders from body
      const placeholders = this.extractPlaceholders(body);

      this.templates[templateIndex] = {
        ...this.templates[templateIndex],
        name,
        body,
        placeholders,
        isActive,
        updatedAt: new Date().toISOString()
      };

      this.saveTemplates();

      // Log the action
      await auditService.logTemplateModification(userId, 'RESEARCH_ANALYST', name, ipAddress, userAgent);

      return {
        success: true,
        template: this.templates[templateIndex]
      };
    } catch (error) {
      console.error('Error updating template:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Get all active templates
  async getActiveTemplates() {
    return {
      success: true,
      templates: this.templates.filter(t => t.isActive)
    };
  }

  // Get template by ID
  async getTemplateById(templateId) {
    const template = this.templates.find(t => t.id === templateId);
    if (!template) {
      return { success: false, error: 'Template not found' };
    }
    return { success: true, template };
  }

  // Extract placeholders from template body
  extractPlaceholders(body) {
    const regex = /\{([^}]+)\}/g;
    const matches = [];
    let match;
    
    while ((match = regex.exec(body)) !== null) {
      matches.push(match[1]);
    }
    
    return matches;
  }

  // Send advisory message using template
  async sendAdvisoryMessage(userId, clientId, templateId, templateData, messageType = 'WHATSAPP', ipAddress = null, userAgent = null) {
    try {
      // Get the template
      const templateResult = await this.getTemplateById(templateId);
      if (!templateResult.success) {
        return templateResult;
      }
      
      const template = templateResult.template;
      
      // Replace placeholders in template with provided data
      let messageText = template.body;
      for (const [key, value] of Object.entries(templateData)) {
        const placeholder = `{${key}}`;
        messageText = messageText.replace(new RegExp(placeholder, 'g'), value);
      }
      
      // Add SEBI-compliant disclosure footer
      messageText += this.getSEBIDisclosureFooter();
      
      const newMessage = {
        id: this.messages.length > 0 ? Math.max(...this.messages.map(m => m.id)) + 1 : 1,
        senderId: userId,
        clientId: clientId,
        messageType,
        templateId: template.id,
        messageText,
        status: 'PENDING',
        sentAt: new Date().toISOString(),
        deliveredAt: null,
        readAt: null,
        failureReason: null,
        createdAt: new Date().toISOString()
      };

      this.messages.push(newMessage);
      this.saveMessages();

      // Log the action
      await auditService.logMessageSent(
        userId,
        'RESEARCH_ANALYST',
        clientId,
        messageType,
        template.name,
        ipAddress,
        userAgent
      );

      return {
        success: true,
        message: newMessage
      };
    } catch (error) {
      console.error('Error sending advisory message:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Update message status
  async updateMessageStatus(messageId, status, deliveredAt = null, readAt = null, failureReason = null) {
    try {
      const messageIndex = this.messages.findIndex(m => m.id === messageId);
      if (messageIndex === -1) {
        return { success: false, error: 'Message not found' };
      }

      this.messages[messageIndex].status = status;
      if (deliveredAt) {
        this.messages[messageIndex].deliveredAt = deliveredAt;
      }
      if (readAt) {
        this.messages[messageIndex].readAt = readAt;
      }
      if (failureReason) {
        this.messages[messageIndex].failureReason = failureReason;
      }

      this.saveMessages();

      return {
        success: true,
        message: this.messages[messageIndex]
      };
    } catch (error) {
      console.error('Error updating message status:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Get messages for a specific client
  async getMessagesForClient(clientId) {
    const clientMessages = this.messages.filter(m => m.clientId === clientId);
    return {
      success: true,
      messages: clientMessages
    };
  }

  // Get messages sent by a specific user
  async getMessagesByUser(userId) {
    const userMessages = this.messages.filter(m => m.senderId === userId);
    return {
      success: true,
      messages: userMessages
    };
  }

  // Generate SEBI-compliant disclosure footer
  getSEBIDisclosureFooter() {
    return `
This is a research recommendation from Galaxy Research (SEBI RA Registration No: INM000012345). Please read the Risk Disclosure Document. Past performance does not guarantee future returns. This is not an offer to buy or sell securities. Consult your investment advisor before making investment decisions.`;
  }

  // Get all templates
  async getAllTemplates() {
    return {
      success: true,
      templates: this.templates
    };
  }

  // Get message statistics
  getMessageStats() {
    const stats = {
      totalMessages: this.messages.length,
      sent: 0,
      delivered: 0,
      read: 0,
      failed: 0
    };

    this.messages.forEach(message => {
      stats[message.status.toLowerCase()] = (stats[message.status.toLowerCase()] || 0) + 1;
    });

    return stats;
  }
}

// Export singleton instance
const messageService = new MessageService();
export default messageService;