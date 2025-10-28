// Environment configuration
const config = {
  // Development settings
  development: {
    port: process.env.PORT || 5001,
    database: {
      type: process.env.DB_TYPE || 'file', // file, postgres, mysql, mongodb, supabase
      url: process.env.DATABASE_URL || './data.json',
      key: process.env.SUPABASE_KEY || null // For Supabase
    },
    auth: {
      secret: process.env.JWT_SECRET || 'hotel-ops-secret-key',
      expiresIn: '24h'
    },
    cors: {
      origin: process.env.CORS_ORIGIN || 'http://localhost:3002'
    }
  },
  
  // Production settings
  production: {
    port: process.env.PORT || 3001,
    database: {
      type: process.env.DB_TYPE || 'supabase', // Default to Supabase for production
      url: process.env.DATABASE_URL,
      key: process.env.SUPABASE_KEY
    },
    auth: {
      secret: process.env.JWT_SECRET || 'hotel-ops-secret-key',
      expiresIn: '24h'
    },
    cors: {
      origin: process.env.CORS_ORIGIN || '*'
    }
  },
  
  // Serverless settings
  serverless: {
    port: process.env.PORT || 3001,
    database: {
      type: process.env.DB_TYPE || 'supabase', // Default to Supabase for serverless
      url: process.env.DATABASE_URL,
      key: process.env.SUPABASE_KEY
    },
    auth: {
      secret: process.env.JWT_SECRET || 'hotel-ops-secret-key',
      expiresIn: '24h'
    },
    cors: {
      origin: process.env.CORS_ORIGIN || '*'
    }
  }
};

// Get current environment
const env = process.env.NODE_ENV || 'development';

module.exports = {
  config: config[env],
  env
};