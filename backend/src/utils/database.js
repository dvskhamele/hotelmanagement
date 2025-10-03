// Database abstraction layer
const { createClient } = require('@supabase/supabase-js');

class DatabaseAdapter {
  constructor(config) {
    this.config = config;
    this.type = config.database.type;
    this.supabase = null;
  }

  // Initialize database connection
  async init() {
    switch (this.type) {
      case 'file':
        return this.initFileDB();
      case 'postgres':
        return this.initPostgres();
      case 'mysql':
        return this.initMySQL();
      case 'mongodb':
        return this.initMongoDB();
      case 'supabase':
        return this.initSupabase();
      default:
        return this.initFileDB();
    }
  }

  // File-based database (for development/mocking)
  async initFileDB() {
    const fs = require('fs');
    const path = require('path');
    
    this.dataFile = path.join(__dirname, '..', '..', 'data.json');
    
    // Load existing data or create new
    try {
      if (fs.existsSync(this.dataFile)) {
        const data = fs.readFileSync(this.dataFile, 'utf8');
        this.data = JSON.parse(data);
      } else {
        this.data = this.getDefaultData();
        this.saveData();
      }
    } catch (error) {
      console.error('Error initializing file database:', error);
      this.data = this.getDefaultData();
    }
  }

  // Save data to file
  async saveData() {
    if (this.type === 'file') {
      const fs = require('fs');
      try {
        fs.writeFileSync(this.dataFile, JSON.stringify(this.data, null, 2));
      } catch (error) {
        console.error('Error saving data to file:', error);
      }
    }
  }

  // Get data
  async getData() {
    return this.data;
  }

  // Update data
  async updateData(newData) {
    this.data = { ...this.data, ...newData };
    await this.saveData();
    return this.data;
  }

  // Default data structure
  getDefaultData() {
    return {
      users: [
        {
          id: 1,
          email: 'admin@hotelops.com',
          password: 'password123',
          name: 'Admin User',
          role: 'ADMIN'
        }
      ],
      rooms: [
        { id: 1, number: '101', floor: 1, type: 'Standard', status: 'CLEAN', updatedAt: new Date().toISOString() },
        { id: 2, number: '102', floor: 1, type: 'Standard', status: 'DIRTY', updatedAt: new Date(Date.now() - 3600000).toISOString() },
        { id: 3, number: '103', floor: 1, type: 'Deluxe', status: 'INSPECTED', updatedAt: new Date(Date.now() - 7200000).toISOString() },
        { id: 4, number: '104', floor: 1, type: 'Suite', status: 'OUT_OF_ORDER', updatedAt: new Date(Date.now() - 10800000).toISOString() },
        { id: 5, number: '201', floor: 2, type: 'Standard', status: 'CLEAN', updatedAt: new Date().toISOString() }
      ],
      staff: [
        { id: 1, name: 'Alice Johnson', department: 'Housekeeping', position: 'Supervisor', status: 'Active', email: 'alice.johnson@example.com', phone: '+1234567890', hireDate: '2022-01-15', performance: 92, schedule: '9:00 AM - 5:00 PM' }
      ],
      requests: [
        { id: 1, guestName: 'John Doe', roomNumber: '205', title: 'Extra towels', department: 'Housekeeping', priority: 'MEDIUM', status: 'PENDING', createdAt: new Date(Date.now() - 3600000).toISOString() }
      ],
      inventory: [
        { id: 1, name: 'Luxury Towels', category: 'Linens', quantity: 150, minStock: 100, supplier: 'Premium Linens Co.', price: 12.99, lastOrdered: '2023-08-15' }
      ],
      departments: [
        { id: 1, name: 'Housekeeping', head: 'Alice Johnson', staffCount: 5, performance: 92 }
      ],
      activity: [
        { id: 1, type: 'request', title: 'New guest request', description: 'John Doe - Extra towels (Room 205)', timestamp: new Date().toISOString(), status: 'PENDING' }
      ]
    };
  }

  // Initialize Supabase client
  async initSupabase() {
    if (this.config.database.url && this.config.database.key) {
      this.supabase = createClient(this.config.database.url, this.config.database.key);
      console.log('Supabase client initialized');
    } else {
      console.log('Supabase configuration missing, falling back to file database');
      return this.initFileDB();
    }
  }

  // Placeholder methods for other database types
  async initPostgres() {
    console.log('PostgreSQL initialization would go here');
    // In a real implementation, you would initialize a PostgreSQL connection
    this.data = this.getDefaultData();
  }

  async initMySQL() {
    console.log('MySQL initialization would go here');
    // In a real implementation, you would initialize a MySQL connection
    this.data = this.getDefaultData();
  }

  async initMongoDB() {
    console.log('MongoDB initialization would go here');
    // In a real implementation, you would initialize a MongoDB connection
    this.data = this.getDefaultData();
  }

  // CRUD operations that work across all database types
  async find(collection, query) {
    // If using Supabase
    if (this.type === 'supabase' && this.supabase) {
      let supabaseQuery = this.supabase.from(collection).select('*');
      
      // Apply filters if provided
      if (Object.keys(query).length > 0) {
        Object.keys(query).forEach(key => {
          supabaseQuery = supabaseQuery.eq(key, query[key]);
        });
      }
      
      const { data, error } = await supabaseQuery;
      if (error) {
        console.error('Supabase error:', error);
        // Fallback to file database on error
        return this.data && this.data[collection] ? this.data[collection].filter(item => {
          return Object.keys(query).every(key => item[key] === query[key]);
        }) : [];
      }
      return data;
    }
    
    // Fallback to file database
    if (!this.data || !this.data[collection]) return [];
    
    if (Object.keys(query).length === 0) {
      return this.data[collection];
    }
    
    return this.data[collection].filter(item => {
      return Object.keys(query).every(key => item[key] === query[key]);
    });
  }

  async findById(collection, id) {
    // If using Supabase
    if (this.type === 'supabase' && this.supabase) {
      const { data, error } = await this.supabase.from(collection).select('*').eq('id', id).single();
      if (error) {
        console.error('Supabase error:', error);
        // Fallback to file database on error
        return this.data && this.data[collection] ? this.data[collection].find(item => item.id === id) : null;
      }
      return data;
    }
    
    // Fallback to file database
    if (!this.data || !this.data[collection]) return null;
    
    return this.data[collection].find(item => item.id === id);
  }

  async create(collection, data) {
    // If using Supabase
    if (this.type === 'supabase' && this.supabase) {
      // Generate ID if not provided (Supabase will auto-generate if not specified)
      if (!data.id) {
        // For prototype, we'll let Supabase handle ID generation
      }
      
      const { data: result, error } = await this.supabase.from(collection).insert(data).select().single();
      if (error) {
        console.error('Supabase error:', error);
        // Fallback to file database on error
        return this.fallbackCreate(collection, data);
      }
      return result;
    }
    
    // Fallback to file database
    return this.fallbackCreate(collection, data);
  }

  // Helper method for file database create operation
  async fallbackCreate(collection, data) {
    if (!this.data[collection]) {
      this.data[collection] = [];
    }
    
    // Generate ID if not provided
    if (!data.id) {
      const maxId = this.data[collection].length > 0 
        ? Math.max(...this.data[collection].map(item => item.id)) 
        : 0;
      data.id = maxId + 1;
    }
    
    this.data[collection].push(data);
    await this.saveData();
    return data;
  }

  async update(collection, id, data) {
    // If using Supabase
    if (this.type === 'supabase' && this.supabase) {
      const { data: result, error } = await this.supabase.from(collection).update(data).eq('id', id).select().single();
      if (error) {
        console.error('Supabase error:', error);
        // Fallback to file database on error
        return this.fallbackUpdate(collection, id, data);
      }
      return result;
    }
    
    // Fallback to file database
    return this.fallbackUpdate(collection, id, data);
  }

  // Helper method for file database update operation
  async fallbackUpdate(collection, id, data) {
    if (!this.data[collection]) return null;
    
    const index = this.data[collection].findIndex(item => item.id === id);
    if (index === -1) return null;
    
    this.data[collection][index] = { ...this.data[collection][index], ...data };
    await this.saveData();
    return this.data[collection][index];
  }

  async delete(collection, id) {
    // If using Supabase
    if (this.type === 'supabase' && this.supabase) {
      const { error } = await this.supabase.from(collection).delete().eq('id', id);
      if (error) {
        console.error('Supabase error:', error);
        // Fallback to file database on error
        return this.fallbackDelete(collection, id);
      }
      return true;
    }
    
    // Fallback to file database
    return this.fallbackDelete(collection, id);
  }

  // Helper method for file database delete operation
  async fallbackDelete(collection, id) {
    if (!this.data[collection]) return false;
    
    const index = this.data[collection].findIndex(item => item.id === id);
    if (index === -1) return false;
    
    this.data[collection].splice(index, 1);
    await this.saveData();
    return true;
  }
}

module.exports = DatabaseAdapter;