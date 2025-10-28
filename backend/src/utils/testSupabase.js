// Test Supabase integration
const { config } = require('./src/config');
const DatabaseAdapter = require('./src/utils/database');

async function testSupabase() {
  console.log('Testing Supabase integration...');
  
  // Configure for Supabase
  const testConfig = {
    ...config,
    database: {
      type: 'supabase',
      url: process.env.SUPABASE_URL || 'https://your-project.supabase.co',
      key: process.env.SUPABASE_KEY || 'your-anon-key'
    }
  };
  
  const db = new DatabaseAdapter(testConfig);
  
  try {
    await db.init();
    console.log('Supabase initialization successful');
    
    // Test a simple query
    const users = await db.find('users', {});
    console.log('Users query successful:', users.length, 'users found');
    
  } catch (error) {
    console.error('Supabase test failed:', error.message);
    console.log('This is expected if you havent set up Supabase yet.');
  }
}

// Run test if this file is executed directly
if (require.main === module) {
  testSupabase();
}

module.exports = { testSupabase };