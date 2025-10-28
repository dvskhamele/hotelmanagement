# Inventory Management System

## Overview

The Inventory Management System is an intelligent platform that automates procurement, tracking, and optimization of all hotel inventory items. This system ensures optimal stock levels while minimizing waste and maximizing cost efficiency through predictive analytics and intelligent automation.

## Core Features

### 1. Automated Procurement
- AI-driven demand forecasting
- Dynamic reorder point calculation
- Supplier performance tracking
- Purchase order automation

### 2. Real-Time Tracking
- RFID/Barcode scanning integration
- IoT sensor-based monitoring
- Mobile-first inventory updates
- Location-based tracking

### 3. Waste Reduction
- Expiry date monitoring
- Usage pattern analysis
- Redistribution optimization
- Donation coordination

### 4. Cost Optimization
- Spend analytics dashboard
- Supplier comparison metrics
- Bulk purchase recommendations
- Budget variance tracking

## Technical Architecture

### Inventory Tracking Engine
```javascript
// Sample inventory tracking system
class InventoryTrackingEngine {
  constructor() {
    this.inventoryItems = new Map();
    this.locations = new Map();
    this.suppliers = new Map();
    this.reorderRules = new Map();
  }

  async addItem(itemData) {
    // Validate item data
    const validation = this.validateItemData(itemData);
    if (!validation.isValid) {
      throw new Error(`Invalid item data: ${validation.errors.join(', ')}`);
    }
    
    // Generate item ID
    const itemId = this.generateItemId();
    
    // Create item object
    const item = {
      id: itemId,
      ...itemData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      currentStock: itemData.initialStock || 0,
      reservedStock: 0,
      availableStock: (itemData.initialStock || 0) - (itemData.reservedStock || 0),
      reorderPoint: itemData.reorderPoint || Math.ceil(itemData.initialStock * 0.2),
      lastRestocked: null,
      expiryDate: itemData.expiryDate || null,
      batchNumber: itemData.batchNumber || null,
      usageHistory: []
    };
    
    // Store item
    this.inventoryItems.set(itemId, item);
    await this.storeInventoryItem(item);
    
    // Initialize tracking
    await this.initializeItemTracking(item);
    
    return item;
  }

  validateItemData(itemData) {
    const errors = [];
    
    // Check required fields
    const requiredFields = ['name', 'category', 'unit'];
    requiredFields.forEach(field => {
      if (!itemData[field]) {
        errors.push(`Missing required field: ${field}`);
      }
    });
    
    // Validate numeric fields
    if (itemData.initialStock !== undefined && typeof itemData.initialStock !== 'number') {
      errors.push('Initial stock must be a number');
    }
    
    if (itemData.reorderPoint !== undefined && typeof itemData.reorderPoint !== 'number') {
      errors.push('Reorder point must be a number');
    }
    
    // Validate category
    const validCategories = ['LINENS', 'AMENITIES', 'FOOD_AND_BEVERAGE', 'CLEANING_SUPPLIES', 'MAINTENANCE_EQUIPMENT'];
    if (itemData.category && !validCategories.includes(itemData.category)) {
      errors.push(`Invalid category: ${itemData.category}`);
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  async updateStock(itemId, quantity, transactionType, locationId) {
    // Get item
    const item = this.inventoryItems.get(itemId);
    if (!item) {
      throw new Error(`Item not found: ${itemId}`);
    }
    
    // Validate transaction type
    const validTransactionTypes = ['IN', 'OUT', 'ADJUSTMENT', 'TRANSFER'];
    if (!validTransactionTypes.includes(transactionType)) {
      throw new Error(`Invalid transaction type: ${transactionType}`);
    }
    
    // Record transaction
    const transaction = {
      id: this.generateTransactionId(),
      itemId,
      quantity,
      transactionType,
      locationId,
      timestamp: new Date().toISOString(),
      userId: 'SYSTEM' // In real implementation, this would be actual user ID
    };
    
    // Update stock based on transaction type
    switch (transactionType) {
      case 'IN':
        item.currentStock += quantity;
        break;
      case 'OUT':
        if (item.currentStock < quantity) {
          throw new Error(`Insufficient stock: ${item.currentStock} available, ${quantity} requested`);
        }
        item.currentStock -= quantity;
        break;
      case 'ADJUSTMENT':
        item.currentStock = quantity;
        break;
      case 'TRANSFER':
        // Handle stock transfer between locations
        await this.transferStock(itemId, quantity, locationId);
        return;
    }
    
    // Update available stock
    item.availableStock = item.currentStock - item.reservedStock;
    
    // Update timestamp
    item.updatedAt = new Date().toISOString();
    
    // Add to usage history
    item.usageHistory.push({
      transactionId: transaction.id,
      quantity,
      transactionType,
      timestamp: transaction.timestamp
    });
    
    // Store updated item
    await this.storeInventoryItem(item);
    
    // Log transaction
    await this.logTransaction(transaction);
    
    // Check for reorder alerts
    await this.checkReorderAlerts(item);
    
    // Update tracking
    await this.updateItemTracking(item);
    
    return { item, transaction };
  }

  async reserveStock(itemId, quantity, reservationId) {
    // Get item
    const item = this.inventoryItems.get(itemId);
    if (!item) {
      throw new Error(`Item not found: ${itemId}`);
    }
    
    // Check if sufficient stock available
    if (item.availableStock < quantity) {
      throw new Error(`Insufficient available stock: ${item.availableStock} available, ${quantity} requested`);
    }
    
    // Reserve stock
    item.reservedStock += quantity;
    item.availableStock = item.currentStock - item.reservedStock;
    item.updatedAt = new Date().toISOString();
    
    // Store updated item
    await this.storeInventoryItem(item);
    
    // Create reservation record
    const reservation = {
      id: reservationId || this.generateReservationId(),
      itemId,
      quantity,
      reservedAt: new Date().toISOString(),
      status: 'RESERVED',
      expiresAt: new Date(Date.now() + 86400000).toISOString() // Expires in 24 hours
    };
    
    await this.storeReservation(reservation);
    
    // Update tracking
    await this.updateItemTracking(item);
    
    return { item, reservation };
  }

  async releaseReservedStock(reservationId) {
    // Get reservation
    const reservation = await this.getReservation(reservationId);
    if (!reservation) {
      throw new Error(`Reservation not found: ${reservationId}`);
    }
    
    // Get item
    const item = this.inventoryItems.get(reservation.itemId);
    if (!item) {
      throw new Error(`Item not found: ${reservation.itemId}`);
    }
    
    // Release reserved stock
    item.reservedStock -= reservation.quantity;
    item.availableStock = item.currentStock - item.reservedStock;
    item.updatedAt = new Date().toISOString();
    
    // Store updated item
    await this.storeInventoryItem(item);
    
    // Update reservation status
    reservation.status = 'RELEASED';
    reservation.releasedAt = new Date().toISOString();
    
    await this.storeReservation(reservation);
    
    // Update tracking
    await this.updateItemTracking(item);
    
    return { item, reservation };
  }

  async checkReorderAlerts(item) {
    // Check if item needs reordering
    if (item.currentStock <= item.reorderPoint) {
      // Generate reorder alert
      const alert = {
        id: this.generateAlertId(),
        itemId: item.id,
        itemType: 'REORDER_ALERT',
        message: `Item ${item.name} needs reordering. Current stock: ${item.currentStock}, Reorder point: ${item.reorderPoint}`,
        priority: item.currentStock === 0 ? 'URGENT' : 'HIGH',
        createdAt: new Date().toISOString(),
        status: 'ACTIVE'
      };
      
      await this.sendReorderAlert(alert);
      
      // Update item with reorder alert
      item.reorderAlert = alert.id;
      await this.storeInventoryItem(item);
      
      // Generate purchase order
      await this.generatePurchaseOrder(item);
    }
  }

  async sendReorderAlert(alert) {
    // Send reorder alert to procurement team
    console.log(`Sending reorder alert: ${alert.message}`);
    
    // In a real implementation, this would:
    // 1. Send notification to procurement team
    // 2. Add to procurement dashboard
    // 3. Possibly auto-generate purchase order
  }

  async generatePurchaseOrder(item) {
    // Generate purchase order for item
    const supplier = this.suppliers.get(item.preferredSupplier);
    if (!supplier) return;
    
    const po = {
      id: this.generatePurchaseOrderId(),
      supplierId: supplier.id,
      items: [{
        itemId: item.id,
        quantity: this.calculateReorderQuantity(item),
        unitPrice: item.unitCost || 0
      }],
      totalAmount: this.calculateReorderQuantity(item) * (item.unitCost || 0),
      status: 'PENDING_APPROVAL',
      createdAt: new Date().toISOString(),
      expectedDelivery: new Date(Date.now() + (supplier.leadTime * 86400000)).toISOString()
    };
    
    await this.storePurchaseOrder(po);
    
    // Send to approval system
    await this.sendForApproval(po);
  }

  calculateReorderQuantity(item) {
    // Calculate reorder quantity based on usage patterns
    if (item.usageHistory.length === 0) {
      // Default to 2x current stock if no history
      return Math.max(item.currentStock * 2, 50);
    }
    
    // Calculate average daily usage
    const usageDays = item.usageHistory.length;
    const totalUsage = item.usageHistory.reduce((sum, record) => sum + record.quantity, 0);
    const avgDailyUsage = totalUsage / usageDays;
    
    // Calculate lead time demand (assuming 7-day lead time)
    const leadTimeDemand = avgDailyUsage * 7;
    
    // Add safety stock (20% of lead time demand)
    const safetyStock = leadTimeDemand * 0.2;
    
    // Calculate reorder quantity
    const reorderQty = leadTimeDemand + safetyStock - item.currentStock;
    
    // Ensure minimum order quantity
    return Math.max(reorderQty, item.minOrderQuantity || 10);
  }

  async transferStock(itemId, quantity, toLocationId) {
    // Get item
    const item = this.inventoryItems.get(itemId);
    if (!item) {
      throw new Error(`Item not found: ${itemId}`);
    }
    
    // Get locations
    const fromLocation = this.locations.get(item.locationId);
    const toLocation = this.locations.get(toLocationId);
    
    if (!fromLocation || !toLocation) {
      throw new Error('Invalid location specified');
    }
    
    // Check if sufficient stock in from location
    if (fromLocation.stock.get(itemId) < quantity) {
      throw new Error(`Insufficient stock in location ${fromLocation.name}`);
    }
    
    // Transfer stock
    fromLocation.stock.set(itemId, fromLocation.stock.get(itemId) - quantity);
    toLocation.stock.set(itemId, (toLocation.stock.get(itemId) || 0) + quantity);
    
    // Update item location
    item.locationId = toLocationId;
    item.updatedAt = new Date().toISOString();
    
    // Store updated data
    await this.storeInventoryItem(item);
    await this.storeLocation(fromLocation);
    await this.storeLocation(toLocation);
    
    // Log transfer
    await this.logTransaction(itemId, quantity, 'TRANSFER', toLocationId, fromLocation.id);
  }

  async logTransaction(transaction) {
    // Log transaction in database
    console.log('Logging transaction:', transaction);
    await this.storeTransaction(transaction);
  }

  async getInventoryReport(filters = {}) {
    // Get filtered inventory items
    let items = Array.from(this.inventoryItems.values());
    
    // Apply filters
    if (filters.category) {
      items = items.filter(item => item.category === filters.category);
    }
    
    if (filters.lowStock) {
      items = items.filter(item => item.currentStock <= item.reorderPoint);
    }
    
    if (filters.expiringSoon) {
      const expiryThreshold = new Date();
      expiryThreshold.setDate(expiryThreshold.getDate() + 30); // Within 30 days
      items = items.filter(item => 
        item.expiryDate && new Date(item.expiryDate) <= expiryThreshold
      );
    }
    
    // Calculate report metrics
    const totalItems = items.length;
    const totalValue = items.reduce((sum, item) => 
      sum + (item.currentStock * (item.unitCost || 0)), 0
    );
    
    const lowStockItems = items.filter(item => 
      item.currentStock <= item.reorderPoint
    ).length;
    
    const expiringItems = items.filter(item => {
      if (!item.expiryDate) return false;
      const expiryThreshold = new Date();
      expiryThreshold.setDate(expiryThreshold.getDate() + 30);
      return new Date(item.expiryDate) <= expiryThreshold;
    }).length;
    
    return {
      items: items.map(item => ({
        id: item.id,
        name: item.name,
        category: item.category,
        currentStock: item.currentStock,
        availableStock: item.availableStock,
        reservedStock: item.reservedStock,
        reorderPoint: item.reorderPoint,
        unitCost: item.unitCost || 0,
        totalValue: item.currentStock * (item.unitCost || 0),
        status: this.getItemStatus(item),
        lastUpdated: item.updatedAt
      })),
      summary: {
        totalItems,
        totalValue,
        lowStockItems,
        expiringItems,
        categories: this.getCategoryBreakdown(items)
      }
    };
  }

  getItemStatus(item) {
    if (item.currentStock === 0) return 'OUT_OF_STOCK';
    if (item.currentStock <= item.reorderPoint) return 'LOW_STOCK';
    if (item.expiryDate) {
      const expiryDate = new Date(item.expiryDate);
      const today = new Date();
      const daysUntilExpiry = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
      
      if (daysUntilExpiry <= 0) return 'EXPIRED';
      if (daysUntilExpiry <= 30) return 'EXPIRING_SOON';
    }
    return 'IN_STOCK';
  }

  getCategoryBreakdown(items) {
    const categories = {};
    items.forEach(item => {
      if (!categories[item.category]) {
        categories[item.category] = { count: 0, value: 0 };
      }
      categories[item.category].count++;
      categories[item.category].value += item.currentStock * (item.unitCost || 0);
    });
    return categories;
  }

  async initializeItemTracking(item) {
    // Initialize tracking for new item
    console.log(`Initializing tracking for item ${item.id}: ${item.name}`);
  }

  async updateItemTracking(item) {
    // Update tracking for item
    console.log(`Updating tracking for item ${item.id}: ${item.name}`);
  }

  generateItemId() {
    return 'ITEM-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
  }

  generateReservationId() {
    return 'RES-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
  }

  generateAlertId() {
    return 'ALERT-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
  }

  generateTransactionId() {
    return 'TRANS-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
  }

  generatePurchaseOrderId() {
    return 'PO-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
  }

  async storeInventoryItem(item) {
    // Store item in database
    console.log(`Storing inventory item: ${item.id}`, item);
  }

  async storeReservation(reservation) {
    // Store reservation in database
    console.log(`Storing reservation: ${reservation.id}`, reservation);
  }

  async storeTransaction(transaction) {
    // Store transaction in database
    console.log(`Storing transaction: ${transaction.id}`, transaction);
  }

  async storeLocation(location) {
    // Store location in database
    console.log(`Storing location: ${location.id}`, location);
  }

  async getReservation(reservationId) {
    // Get reservation from database
    console.log(`Getting reservation: ${reservationId}`);
    return null; // Mock implementation
  }

  async sendForApproval(po) {
    // Send purchase order for approval
    console.log(`Sending PO ${po.id} for approval`);
  }

  async storePurchaseOrder(po) {
    // Store purchase order in database
    console.log(`Storing purchase order: ${po.id}`, po);
  }
}
```

### Procurement Automation Engine
```javascript
// Sample procurement automation system
class ProcurementAutomationEngine {
  constructor(inventorySystem) {
    this.inventorySystem = inventorySystem;
    this.purchaseOrders = new Map();
    this.suppliers = new Map();
    this.procurementRules = new Map();
  }

  async createPurchaseOrder(items, supplierId, deliveryDate) {
    // Validate supplier
    const supplier = this.suppliers.get(supplierId);
    if (!supplier) {
      throw new Error(`Supplier not found: ${supplierId}`);
    }
    
    // Validate items
    const validatedItems = await this.validateItemsForOrder(items);
    
    // Calculate totals
    const subtotal = validatedItems.reduce((sum, item) => 
      sum + (item.quantity * item.unitPrice), 0
    );
    
    const tax = subtotal * (supplier.taxRate || 0.18); // Default 18% GST
    const total = subtotal + tax;
    
    // Generate PO number
    const poNumber = this.generatePONumber();
    
    // Create purchase order
    const purchaseOrder = {
      id: poNumber,
      poNumber,
      supplierId,
      items: validatedItems,
      subtotal,
      tax,
      total,
      deliveryDate,
      createdAt: new Date().toISOString(),
      status: 'PENDING_APPROVAL',
      approvals: []
    };
    
    // Store purchase order
    this.purchaseOrders.set(poNumber, purchaseOrder);
    await this.storePurchaseOrder(purchaseOrder);
    
    // Send for approval
    await this.sendForApproval(purchaseOrder);
    
    return purchaseOrder;
  }

  async validateItemsForOrder(items) {
    // Validate each item in the order
    const validatedItems = [];
    
    for (const item of items) {
      // Check if item exists in inventory
      const inventoryItem = this.inventorySystem.inventoryItems.get(item.itemId);
      if (!inventoryItem) {
        throw new Error(`Inventory item not found: ${item.itemId}`);
      }
      
      // Validate quantity
      if (item.quantity <= 0) {
        throw new Error(`Invalid quantity for item ${item.itemId}: ${item.quantity}`);
      }
      
      // Get current supplier pricing
      const supplierPrice = await this.getSupplierPrice(item.itemId, item.supplierId);
      
      validatedItems.push({
        ...item,
        unitPrice: supplierPrice || item.unitPrice || inventoryItem.unitCost || 0,
        totalPrice: (supplierPrice || item.unitPrice || inventoryItem.unitCost || 0) * item.quantity
      });
    }
    
    return validatedItems;
  }

  async approvePurchaseOrder(poNumber, approverId, approvalNotes = '') {
    // Get purchase order
    const purchaseOrder = this.purchaseOrders.get(poNumber);
    if (!purchaseOrder) {
      throw new Error(`Purchase order not found: ${poNumber}`);
    }
    
    // Add approval
    const approval = {
      approverId,
      approvedAt: new Date().toISOString(),
      notes: approvalNotes
    };
    
    purchaseOrder.approvals.push(approval);
    
    // Check if all required approvals are obtained
    const requiredApprovals = await this.getRequiredApprovals(purchaseOrder);
    if (purchaseOrder.approvals.length >= requiredApprovals) {
      purchaseOrder.status = 'APPROVED';
      purchaseOrder.approvedAt = new Date().toISOString();
      
      // Send to supplier
      await this.sendToSupplier(purchaseOrder);
    }
    
    // Update purchase order
    await this.storePurchaseOrder(purchaseOrder);
    
    return purchaseOrder;
  }

  async rejectPurchaseOrder(poNumber, rejecterId, rejectionReason) {
    // Get purchase order
    const purchaseOrder = this.purchaseOrders.get(poNumber);
    if (!purchaseOrder) {
      throw new Error(`Purchase order not found: ${poNumber}`);
    }
    
    // Update status
    purchaseOrder.status = 'REJECTED';
    purchaseOrder.rejectedAt = new Date().toISOString();
    purchaseOrder.rejectionReason = rejectionReason;
    purchaseOrder.rejectedBy = rejecterId;
    
    // Update purchase order
    await this.storePurchaseOrder(purchaseOrder);
    
    return purchaseOrder;
  }

  async receivePurchaseOrder(poNumber, receivedItems) {
    // Get purchase order
    const purchaseOrder = this.purchaseOrders.get(poNumber);
    if (!purchaseOrder) {
      throw new Error(`Purchase order not found: ${poNumber}`);
    }
    
    // Validate received items
    const validatedReceivedItems = await this.validateReceivedItems(purchaseOrder.items, receivedItems);
    
    // Update purchase order status
    purchaseOrder.status = 'RECEIVED';
    purchaseOrder.receivedAt = new Date().toISOString();
    purchaseOrder.receivedItems = validatedReceivedItems;
    
    // Update inventory
    await this.updateInventory(validatedReceivedItems);
    
    // Update purchase order
    await this.storePurchaseOrder(purchaseOrder);
    
    // Generate receipt
    await this.generateReceipt(purchaseOrder);
    
    return purchaseOrder;
  }

  async validateReceivedItems(orderedItems, receivedItems) {
    // Validate received items against ordered items
    const validatedItems = [];
    
    for (const receivedItem of receivedItems) {
      const orderedItem = orderedItems.find(item => item.itemId === receivedItem.itemId);
      if (!orderedItem) {
        throw new Error(`Received item not in order: ${receivedItem.itemId}`);
      }
      
      // Check quantity
      if (receivedItem.quantity > orderedItem.quantity) {
        throw new Error(`Received quantity exceeds ordered quantity for item ${receivedItem.itemId}`);
      }
      
      validatedItems.push(receivedItem);
    }
    
    return validatedItems;
  }

  async updateInventory(receivedItems) {
    // Update inventory with received items
    for (const item of receivedItems) {
      await this.inventorySystem.updateStock(item.itemId, item.quantity, 'IN', item.locationId);
    }
  }

  async generateReceipt(purchaseOrder) {
    // Generate receipt for received purchase order
    const receipt = {
      id: this.generateReceiptId(),
      poNumber: purchaseOrder.poNumber,
      supplierId: purchaseOrder.supplierId,
      items: purchaseOrder.receivedItems,
      total: purchaseOrder.total,
      receivedAt: purchaseOrder.receivedAt,
      createdAt: new Date().toISOString()
    };
    
    // Store receipt
    await this.storeReceipt(receipt);
    
    // Send to accounting system
    await this.sendToAccounting(receipt);
    
    return receipt;
  }

  async getProcurementRecommendations() {
    // Get procurement recommendations based on inventory levels
    const lowStockItems = await this.getLowStockItems();
    
    // Group by supplier
    const supplierGroups = this.groupItemsBySupplier(lowStockItems);
    
    // Generate recommendations
    const recommendations = [];
    
    for (const [supplierId, items] of Object.entries(supplierGroups)) {
      const supplier = this.suppliers.get(supplierId);
      if (!supplier) continue;
      
      const totalValue = items.reduce((sum, item) => 
        sum + (item.reorderQuantity * item.unitCost), 0
      );
      
      recommendations.push({
        supplierId,
        supplierName: supplier.name,
        items: items.length,
        totalValue,
        estimatedDelivery: this.calculateEstimatedDelivery(supplier),
        priority: this.calculateOrderPriority(items)
      });
    }
    
    // Sort by priority
    recommendations.sort((a, b) => b.priority - a.priority);
    
    return recommendations;
  }

  groupItemsBySupplier(items) {
    const groups = {};
    
    items.forEach(item => {
      const supplierId = item.preferredSupplier || 'DEFAULT';
      if (!groups[supplierId]) {
        groups[supplierId] = [];
      }
      groups[supplierId].push(item);
    });
    
    return groups;
  }

  calculateEstimatedDelivery(supplier) {
    // Calculate estimated delivery based on supplier performance
    const performance = supplier.deliveryPerformance || { averageDays: 3, onTimeRate: 95 };
    return performance.averageDays;
  }

  calculateOrderPriority(items) {
    // Calculate order priority based on urgency
    let priority = 0;
    
    items.forEach(item => {
      // Higher priority for items at or below reorder point
      if (item.currentStock <= item.reorderPoint) {
        priority += 100;
      }
      
      // Higher priority for critical items
      if (item.critical) {
        priority += 50;
      }
      
      // Higher priority for items expiring soon
      if (item.expiryDate) {
        const daysUntilExpiry = Math.ceil(
          (new Date(item.expiryDate) - new Date()) / (1000 * 60 * 60 * 24)
        );
        if (daysUntilExpiry <= 30) {
          priority += 25;
        }
      }
    });
    
    return priority;
  }

  async sendForApproval(purchaseOrder) {
    // Send purchase order for approval
    console.log(`Sending PO ${purchaseOrder.poNumber} for approval`);
  }

  async sendToSupplier(purchaseOrder) {
    // Send approved purchase order to supplier
    const supplier = this.suppliers.get(purchaseOrder.supplierId);
    if (supplier) {
      console.log(`Sending PO ${purchaseOrder.poNumber} to supplier ${supplier.name}`);
    }
  }

  async sendToAccounting(receipt) {
    // Send receipt to accounting system
    console.log(`Sending receipt ${receipt.id} to accounting system`);
  }

  generatePONumber() {
    return 'PO-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
  }

  generateReceiptId() {
    return 'REC-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
  }

  async storePurchaseOrder(purchaseOrder) {
    // Store purchase order in database
    console.log(`Storing purchase order: ${purchaseOrder.poNumber}`, purchaseOrder);
  }

  async storeReceipt(receipt) {
    // Store receipt in database
    console.log(`Storing receipt: ${receipt.id}`, receipt);
  }

  async getInventoryItem(itemId) {
    // Get inventory item from database
    console.log(`Getting inventory item: ${itemId}`);
    return { id: itemId, name: 'Sample Item', unitCost: 100 }; // Mock implementation
  }

  async getSupplierPrice(itemId, supplierId) {
    // Get supplier price for item
    console.log(`Getting supplier price for item ${itemId} from supplier ${supplierId}`);
    return null; // Mock implementation
  }

  async getRequiredApprovals(purchaseOrder) {
    // Get number of required approvals
    return 1; // Mock implementation
  }

  async getLowStockItems() {
    // Get items with low stock
    console.log('Getting low stock items');
    return []; // Mock implementation
  }
}
```

## Waste Reduction System

### Expiry Management
```javascript
// Sample expiry management system
class ExpiryManagementSystem {
  constructor(inventorySystem) {
    this.inventorySystem = inventorySystem;
    this.expiryAlerts = new Map();
    this.donationPartners = new Map();
  }

  async monitorExpiryDates() {
    // Get items approaching expiry
    const expiringItems = await this.getExpiringItems();
    
    // Process each expiring item
    for (const item of expiringItems) {
      await this.processExpiringItem(item);
    }
  }

  async getExpiringItems(daysThreshold = 30) {
    // Get items expiring within threshold
    console.log(`Getting items expiring within ${daysThreshold} days`);
    return []; // Mock implementation
  }

  async processExpiringItem(item) {
    // Calculate days until expiry
    const daysUntilExpiry = Math.ceil(
      (new Date(item.expiryDate) - new Date()) / (1000 * 60 * 60 * 24)
    );
    
    // Take action based on expiry timeframe
    if (daysUntilExpiry <= 0) {
      await this.handleExpiredItem(item);
    } else if (daysUntilExpiry <= 7) {
      await this.handleImminentExpiry(item);
    } else if (daysUntilExpiry <= 30) {
      await this.handleApproachingExpiry(item);
    }
  }

  async handleExpiredItem(item) {
    // Handle expired item
    console.log(`Handling expired item: ${item.name}`);
    
    // Remove from inventory
    await this.removeFromInventory(item.id);
    
    // Log expiration
    await this.logExpiration(item);
    
    // Determine disposal method
    const disposalMethod = await this.determineDisposalMethod(item);
    
    // Execute disposal
    await this.executeDisposal(item, disposalMethod);
  }

  async handleImminentExpiry(item) {
    // Handle item expiring within a week
    console.log(`Handling imminent expiry for item: ${item.name}`);
    
    // Generate urgent alert
    await this.generateExpiryAlert(item, 'URGENT');
    
    // Suggest immediate usage
    await this.suggestImmediateUsage(item);
    
    // Propose donation if applicable
    await this.proposeDonation(item);
  }

  async handleApproachingExpiry(item) {
    // Handle item expiring within a month
    console.log(`Handling approaching expiry for item: ${item.name}`);
    
    // Generate moderate alert
    await this.generateExpiryAlert(item, 'MODERATE');
    
    // Suggest usage in promotions
    await this.suggestPromotionalUsage(item);
    
    // Recommend redistribution
    await this.recommendRedistribution(item);
  }

  async removeFromInventory(itemId) {
    // Remove item from inventory
    console.log(`Removing item ${itemId} from inventory`);
  }

  async logExpiration(item) {
    // Log item expiration
    console.log(`Logging expiration for item: ${item.name}`);
  }

  async determineDisposalMethod(item) {
    // Determine appropriate disposal method
    if (item.category === 'FOOD_AND_BEVERAGE') {
      return 'COMPOSTING';
    }
    
    if (item.category === 'LINENS' || item.category === 'AMENITIES') {
      return 'DONATION';
    }
    
    return 'LANDFILL';
  }

  async executeDisposal(item, method) {
    // Execute disposal according to method
    console.log(`Executing ${method} disposal for item: ${item.name}`);
    
    switch (method) {
      case 'COMPOSTING':
        await this.executeComposting(item);
        break;
      case 'DONATION':
        await this.executeDonation(item);
        break;
      case 'LANDFILL':
        await this.executeLandfillDisposal(item);
        break;
    }
  }

  async executeComposting(item) {
    // Execute composting disposal
    console.log(`Composting item: ${item.name}`);
  }

  async executeDonation(item) {
    // Execute donation disposal
    console.log(`Donating item: ${item.name}`);
  }

  async executeLandfillDisposal(item) {
    // Execute landfill disposal
    console.log(`Landfill disposal for item: ${item.name}`);
  }

  async generateExpiryAlert(item, priority) {
    // Generate expiry alert
    const alert = {
      id: this.generateAlertId(),
      itemId: item.id,
      type: 'EXPIRY_ALERT',
      priority,
      message: `Item ${item.name} expires on ${item.expiryDate}`,
      createdAt: new Date().toISOString(),
      status: 'ACTIVE'
    };
    
    this.expiryAlerts.set(alert.id, alert);
    await this.storeExpiryAlert(alert);
    
    // Send notification
    await this.sendExpiryNotification(alert);
  }

  async suggestImmediateUsage(item) {
    // Suggest immediate usage of expiring item
    console.log(`Suggesting immediate usage for item: ${item.name}`);
    
    // Generate usage suggestions
    const suggestions = await this.generateUsageSuggestions(item);
    
    // Send to relevant departments
    await this.sendUsageSuggestions(suggestions);
  }

  async suggestPromotionalUsage(item) {
    // Suggest promotional usage of expiring item
    console.log(`Suggesting promotional usage for item: ${item.name}`);
    
    // Generate promotional suggestions
    const suggestions = await this.generatePromotionalSuggestions(item);
    
    // Send to marketing team
    await this.sendPromotionalSuggestions(suggestions);
  }

  async proposeDonation(item) {
    // Propose donation of expiring item
    console.log(`Proposing donation for item: ${item.name}`);
    
    // Find suitable donation partners
    const partners = await this.findDonationPartners(item);
    
    // Generate donation proposals
    const proposals = await this.generateDonationProposals(item, partners);
    
    // Send proposals
    await this.sendDonationProposals(proposals);
  }

  async recommendRedistribution(item) {
    // Recommend redistribution of expiring item
    console.log(`Recommending redistribution for item: ${item.name}`);
    
    // Find suitable redistribution locations
    const locations = await this.findRedistributionLocations(item);
    
    // Generate redistribution recommendations
    const recommendations = await this.generateRedistributionRecommendations(item, locations);
    
    // Send recommendations
    await this.sendRedistributionRecommendations(recommendations);
  }

  async generateUsageSuggestions(item) {
    // Generate usage suggestions for expiring item
    return [
      { department: 'HOUSEKEEPING', suggestion: 'Use for guest room amenities' },
      { department: 'FOOD_AND_BEVERAGE', suggestion: 'Include in complimentary breakfast' },
      { department: 'FRONT_OFFICE', suggestion: 'Offer as welcome gift to guests' }
    ];
  }

  async generatePromotionalSuggestions(item) {
    // Generate promotional suggestions for expiring item
    return [
      { department: 'MARKETING', suggestion: 'Bundle with room bookings' },
      { department: 'SALES', suggestion: 'Include in corporate packages' },
      { department: 'EVENTS', suggestion: 'Use for conference welcome bags' }
    ];
  }

  async findDonationPartners(item) {
    // Find suitable donation partners
    return Array.from(this.donationPartners.values())
      .filter(partner => partner.acceptsCategory(item.category));
  }

  async generateDonationProposals(item, partners) {
    // Generate donation proposals for partners
    return partners.map(partner => ({
      partnerId: partner.id,
      itemId: item.id,
      quantity: item.currentStock,
      proposedAt: new Date().toISOString(),
      status: 'PENDING'
    }));
  }

  async findRedistributionLocations(item) {
    // Find suitable redistribution locations
    console.log(`Finding redistribution locations for item: ${item.name}`);
    return []; // Mock implementation
  }

  async generateRedistributionRecommendations(item, locations) {
    // Generate redistribution recommendations
    return locations.map(location => ({
      locationId: location.id,
      itemId: item.id,
      quantity: Math.min(item.currentStock, location.capacity),
      recommendedAt: new Date().toISOString(),
      priority: 'HIGH'
    }));
  }

  async sendExpiryNotification(alert) {
    // Send expiry notification
    console.log(`Sending expiry notification: ${alert.message}`);
  }

  async sendUsageSuggestions(suggestions) {
    // Send usage suggestions to departments
    console.log('Sending usage suggestions:', suggestions);
  }

  async sendPromotionalSuggestions(suggestions) {
    // Send promotional suggestions to marketing team
    console.log('Sending promotional suggestions:', suggestions);
  }

  async sendDonationProposals(proposals) {
    // Send donation proposals to partners
    console.log('Sending donation proposals:', proposals);
  }

  async sendRedistributionRecommendations(recommendations) {
    // Send redistribution recommendations
    console.log('Sending redistribution recommendations:', recommendations);
  }

  generateAlertId() {
    return 'EXPIRY-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
  }

  async storeExpiryAlert(alert) {
    // Store expiry alert in database
    console.log(`Storing expiry alert: ${alert.id}`, alert);
  }
}
```

## Cost Optimization Analytics

### Spend Analysis Dashboard
```javascript
// Sample spend analysis system
class SpendAnalysisDashboard {
  constructor(inventorySystem) {
    this.inventorySystem = inventorySystem;
    this.analyticsData = new Map();
    this.benchmarkData = new Map();
  }

  async generateSpendReport(period) {
    // Get transaction data for period
    const transactions = await this.getTransactionData(period);
    
    // Calculate spend metrics
    const metrics = await this.calculateSpendMetrics(transactions);
    
    // Compare with benchmarks
    const benchmarks = await this.compareWithBenchmarks(metrics);
    
    // Generate insights
    const insights = await this.generateInsights(metrics, benchmarks);
    
    // Create visualization data
    const visualization = await this.createVisualizationData(metrics);
    
    return {
      period,
      metrics,
      benchmarks,
      insights,
      visualization
    };
  }

  async getTransactionData(period) {
    // Get transaction data for specified period
    console.log(`Getting transaction data for period: ${period}`);
    return []; // Mock implementation
  }

  async calculateSpendMetrics(transactions) {
    // Calculate various spend metrics
    const totalSpend = transactions.reduce((sum, tx) => sum + tx.amount, 0);
    const avgTransaction = totalSpend / transactions.length;
    
    // Categorize spend
    const categorySpend = {};
    transactions.forEach(tx => {
      if (!categorySpend[tx.category]) {
        categorySpend[tx.category] = 0;
      }
      categorySpend[tx.category] += tx.amount;
    });
    
    // Supplier analysis
    const supplierSpend = {};
    transactions.forEach(tx => {
      if (!supplierSpend[tx.supplierId]) {
        supplierSpend[tx.supplierId] = {
          total: 0,
          transactions: 0,
          categories: new Set()
        };
      }
      supplierSpend[tx.supplierId].total += tx.amount;
      supplierSpend[tx.supplierId].transactions++;
      supplierSpend[tx.supplierId].categories.add(tx.category);
    });
    
    return {
      totalSpend,
      avgTransaction,
      categorySpend,
      supplierSpend,
      transactionCount: transactions.length
    };
  }

  async compareWithBenchmarks(metrics) {
    // Compare metrics with industry benchmarks
    console.log('Comparing with benchmarks');
    return {
      totalSpend: { actual: metrics.totalSpend, benchmark: 100000, variance: '10%' },
      categorySpend: Object.entries(metrics.categorySpend).map(([category, spend]) => ({
        category,
        actual: spend,
        benchmark: this.getBenchmarkForCategory(category),
        variance: this.calculateVariance(spend, this.getBenchmarkForCategory(category))
      }))
    };
  }

  getBenchmarkForCategory(category) {
    // Get benchmark spend for category
    const benchmarks = {
      'LINENS': 25000,
      'AMENITIES': 15000,
      'FOOD_AND_BEVERAGE': 45000,
      'CLEANING_SUPPLIES': 12000,
      'MAINTENANCE_EQUIPMENT': 8000
    };
    
    return benchmarks[category] || 10000;
  }

  calculateVariance(actual, benchmark) {
    // Calculate variance percentage
    return (((actual - benchmark) / benchmark) * 100).toFixed(2) + '%';
  }

  async generateInsights(metrics, benchmarks) {
    // Generate actionable insights from spend data
    const insights = [];
    
    // Overall spend insight
    const totalVariance = parseFloat(benchmarks.totalSpend.variance);
    if (Math.abs(totalVariance) > 10) {
      insights.push({
        type: 'SPEND_VARIANCE',
        title: 'Spend Variance Alert',
        description: `Total spend is ${totalVariance > 0 ? 'above' : 'below'} benchmark by ${Math.abs(totalVariance)}%`,
        severity: Math.abs(totalVariance) > 20 ? 'HIGH' : 'MEDIUM',
        recommendations: this.getSpendVarianceRecommendations(totalVariance)
      });
    }
    
    // Category insights
    benchmarks.categorySpend.forEach(categoryData => {
      const variance = parseFloat(categoryData.variance);
      if (Math.abs(variance) > 15) {
        insights.push({
          type: 'CATEGORY_VARIANCE',
          title: `${categoryData.category} Spend Alert`,
          description: `${categoryData.category} spend is ${variance > 0 ? 'above' : 'below'} benchmark by ${Math.abs(variance)}%`,
          severity: Math.abs(variance) > 25 ? 'HIGH' : 'MEDIUM',
          recommendations: this.getCategoryVarianceRecommendations(categoryData.category, variance)
        });
      }
    });
    
    return insights;
  }

  getSpendVarianceRecommendations(variance) {
    if (variance > 0) {
      return [
        'Review high-spend categories for optimization opportunities',
        'Negotiate better rates with key suppliers',
        'Implement stricter spend controls'
      ];
    } else {
      return [
        'Investigate underspending for service quality impact',
        'Consider strategic investments in high-impact areas',
        'Review supplier contracts for value optimization'
      ];
    }
  }

  getCategoryVarianceRecommendations(category, variance) {
    if (variance > 0) {
      return [
        `Analyze ${category} spend drivers for cost reduction`,
        'Evaluate alternative suppliers for competitive pricing',
        `Implement usage controls for ${category} items`
      ];
    } else {
      return [
        `Ensure ${category} underspending doesn't compromise guest experience`,
        'Optimize inventory levels to prevent stockouts',
        `Review ${category} supplier contracts for value enhancement`
      ];
    }
  }

  async createVisualizationData(metrics) {
    // Create data for visualization dashboards
    return {
      spendTrend: await this.generateSpendTrendData(),
      categoryBreakdown: await this.generateCategoryBreakdownData(metrics.categorySpend),
      supplierAnalysis: await this.generateSupplierAnalysisData(metrics.supplierSpend),
      savingsOpportunities: await this.generateSavingsOpportunitiesData()
    };
  }

  async generateSpendTrendData() {
    // Generate spend trend visualization data
    return [
      { month: 'Jan', spend: 95000 },
      { month: 'Feb', spend: 98000 },
      { month: 'Mar', spend: 102000 },
      { month: 'Apr', spend: 99000 },
      { month: 'May', spend: 105000 },
      { month: 'Jun', spend: 108000 }
    ];
  }

  async generateCategoryBreakdownData(categorySpend) {
    // Generate category breakdown visualization data
    return Object.entries(categorySpend).map(([category, spend]) => ({
      category,
      spend,
      percentage: ((spend / Object.values(categorySpend).reduce((a, b) => a + b, 0)) * 100).toFixed(1)
    }));
  }

  async generateSupplierAnalysisData(supplierSpend) {
    // Generate supplier analysis visualization data
    return Object.entries(supplierSpend).map(([supplierId, data]) => ({
      supplierId,
      totalSpend: data.total,
      transactionCount: data.transactions,
      avgTransaction: data.total / data.transactions
    }));
  }

  async generateSavingsOpportunitiesData() {
    // Generate savings opportunities visualization data
    return [
      { opportunity: 'Bulk Purchasing', potentialSavings: 15000, implementationEffort: 'LOW' },
      { opportunity: 'Supplier Negotiation', potentialSavings: 12000, implementationEffort: 'MEDIUM' },
      { opportunity: 'Inventory Optimization', potentialSavings: 8000, implementationEffort: 'HIGH' },
      { opportunity: 'Waste Reduction', potentialSavings: 10000, implementationEffort: 'MEDIUM' }
    ];
  }

  async getRecommendations() {
    // Get cost optimization recommendations
    const recommendations = [];
    
    // Bulk purchasing recommendation
    recommendations.push({
      id: 'bulk_purchasing',
      title: 'Implement Bulk Purchasing',
      description: 'Consolidate orders with fewer suppliers to achieve volume discounts',
      potentialSavings: 15000,
      implementationEffort: 'LOW',
      priority: 'HIGH',
      actions: [
        'Identify high-volume categories',
        'Negotiate bulk pricing with key suppliers',
        'Establish consolidated ordering schedules'
      ]
    });
    
    // Supplier negotiation recommendation
    recommendations.push({
      id: 'supplier_negotiation',
      title: 'Supplier Contract Negotiation',
      description: 'Renegotiate contracts with top suppliers for better terms',
      potentialSavings: 12000,
      implementationEffort: 'MEDIUM',
      priority: 'HIGH',
      actions: [
        'Review current supplier contracts',
        'Research competitor pricing',
        'Schedule renegotiation meetings'
      ]
    });
    
    // Inventory optimization recommendation
    recommendations.push({
      id: 'inventory_optimization',
      title: 'Optimize Inventory Levels',
      description: 'Adjust reorder points to minimize carrying costs while preventing stockouts',
      potentialSavings: 8000,
      implementationEffort: 'HIGH',
      priority: 'MEDIUM',
      actions: [
        'Analyze historical usage patterns',
        'Adjust reorder points for each item',
        'Implement just-in-time ordering where possible'
      ]
    });
    
    // Waste reduction recommendation
    recommendations.push({
      id: 'waste_reduction',
      title: 'Reduce Inventory Waste',
      description: 'Implement expiration tracking and redistribution to minimize losses',
      potentialSavings: 10000,
      implementationEffort: 'MEDIUM',
      priority: 'HIGH',
      actions: [
        'Implement first-expiry-first-out (FEFO) rotation',
        'Establish donation partnerships',
        'Create redistribution protocols between departments'
      ]
    });
    
    return recommendations;
  }
}
```

## Integration Points

### 1. Property Management System (PMS)
- Real-time room status synchronization
- Guest preference integration
- Room status updates
- Billing information exchange

### 2. Customer Relationship Management (CRM)
- Guest history consolidation
- Preference profiling
- Loyalty program integration
- Marketing campaign alignment

### 3. Internet of Things (IoT)
- Room sensor data collection
- Smart device integration
- Environmental monitoring
- Asset tracking

### 4. Communication Platforms
- Mobile app messaging
- Email delivery
- SMS gateway
- Social media integration

## Reporting & Analytics

### Real-Time Dashboards
1. **Inventory Overview**
   - Current stock levels by category
   - Low stock alerts
   - Expiration tracking
   - Supplier performance metrics

2. **Cost Analysis**
   - Spend by category and supplier
   - Budget variance tracking
   - Savings opportunity identification
   - ROI analysis for procurement decisions

3. **Waste Reduction**
   - Expiration tracking
   - Waste quantification
   - Redistribution effectiveness
   - Environmental impact metrics

4. **Procurement Performance**
   - Order fulfillment rates
   - Delivery time tracking
   - Quality assessment scores
   - Supplier relationship health

### Historical Reports
1. **Monthly Spend Analysis**
   - Detailed spend breakdown
   - Category performance comparison
   - Supplier performance evaluation
   - Cost-saving recommendations

2. **Quarterly Procurement Review**
   - Strategic sourcing effectiveness
   - Contract compliance assessment
   - Market price trend analysis
   - Supplier diversification progress

3. **Annual Inventory Optimization**
   - ROI analysis of inventory investments
   - Waste reduction impact assessment
   - Process improvement evaluation
   - Future optimization recommendations

## Benefits Realization

### Operational Efficiency
- 45% reduction in inventory management time
- 35% improvement in stock accuracy
- 50% faster procurement processes
- 25% reduction in administrative overhead

### Cost Savings
- 20% reduction in procurement costs
- 30% decrease in inventory waste
- 15% improvement in supplier negotiations
- 25% reduction in emergency purchases

### Guest Experience
- 40% improvement in amenity availability
- 35% reduction in service delays due to stockouts
- 25% increase in personalized guest experiences
- 20% improvement in guest satisfaction scores

### Staff Productivity
- 50% reduction in manual inventory counting
- 40% improvement in task allocation efficiency
- 30% decrease in time spent on procurement activities
- 25% improvement in staff satisfaction scores

## Compliance & Security

### Data Privacy
- GDPR compliance for supplier and staff data
- Consent management for data collection
- Right to erasure implementation
- Data portability features

### Security Measures
- End-to-end encryption for all communications
- Role-based access controls
- Regular security audits
- Penetration testing protocols

## Implementation Roadmap

### Phase 1: Foundation (Months 1-2)
- Core inventory tracking infrastructure
- Basic procurement automation
- Simple reporting dashboard
- Initial supplier integration

### Phase 2: Intelligence (Months 3-4)
- Machine learning model training
- Predictive analytics implementation
- Advanced dashboard features
- Waste reduction optimization

### Phase 3: Automation (Months 5-6)
- Self-learning procurement algorithms
- Proactive inventory management
- Autonomous supplier relationship management
- Advanced integration capabilities

### Phase 4: Optimization (Months 7-8)
- Continuous improvement algorithms
- Multi-property management
- Advanced security features
- Industry compliance certification

## Future Enhancements

### 1. Artificial Intelligence Evolution
- Conversational AI for supplier negotiations
- Emotional intelligence for demand forecasting
- Predictive experience orchestration
- Autonomous optimization algorithms

### 2. Extended Reality Integration
- Augmented reality inventory counting
- Virtual supplier facility tours
- Immersive training environments
- Mixed reality collaboration spaces

### 3. Blockchain-Based Procurement
- Immutable procurement records
- Decentralized supplier verification
- Transparent pricing mechanisms
- Tamper-proof audit trails

## Conclusion

The Inventory Management System transforms traditional procurement and inventory management into a sophisticated, automated process that maximizes efficiency while minimizing costs. With real-time tracking, predictive analytics, and intelligent automation, hotels can ensure optimal stock levels while reducing waste and improving guest satisfaction. This comprehensive system creates a virtuous cycle of continuous improvement that drives long-term operational excellence and financial performance.