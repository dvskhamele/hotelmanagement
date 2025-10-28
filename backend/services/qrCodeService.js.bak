// QR Code Service
const QRCode = require('qrcode');

class QRCodeService {
  constructor() {
    // Configuration options for QR codes
    this.qrOptions = {
      errorCorrectionLevel: 'H',
      type: 'image/png',
      quality: 0.92,
      margin: 1,
      width: 300
    };
  }

  // Generate QR code for room request portal
  async generateRoomQRCode(roomNumber) {
    try {
      const url = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/guest-request?room=${roomNumber}`;
      const qrCode = await QRCode.toDataURL(url, this.qrOptions);
      
      return {
        success: true,
        qrCode,
        url
      };
    } catch (error) {
      console.error('Error generating QR code:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Generate QR code for general guest request portal
  async generateGeneralQRCode() {
    try {
      const url = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/guest-request`;
      const qrCode = await QRCode.toDataURL(url, this.qrOptions);
      
      return {
        success: true,
        qrCode,
        url
      };
    } catch (error) {
      console.error('Error generating QR code:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Generate QR code for specific request type
  async generateRequestTypeQRCode(requestType) {
    try {
      const url = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/guest-request?type=${requestType}`;
      const qrCode = await QRCode.toDataURL(url, this.qrOptions);
      
      return {
        success: true,
        qrCode,
        url
      };
    } catch (error) {
      console.error('Error generating QR code:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
}

module.exports = QRCodeService;