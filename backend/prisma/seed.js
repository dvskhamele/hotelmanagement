// Seed script to populate database with initial data
// This would be used with Prisma in a full implementation

async function seedDatabase() {
  console.log('Seeding database...');
  
  // In a full implementation, we would use Prisma to create:
  // 1. Default roles
  const roles = [
    { name: 'ADMIN' },
    { name: 'MANAGER' },
    { name: 'SUPERVISOR' },
    { name: 'STAFF' },
    { name: 'HOUSEKEEPING' },
    { name: 'MAINTENANCE' },
    { name: 'FOOD_AND_BEVERAGE' },
    { name: 'FRONT_OFFICE' }
  ];
  
  // 2. Room statuses
  const roomStatuses = [
    { name: 'CLEAN' },
    { name: 'DIRTY' },
    { name: 'INSPECTED' },
    { name: 'OUT_OF_ORDER' }
  ];
  
  // 3. Request statuses
  const requestStatuses = [
    { status: 'PENDING' },
    { status: 'IN_PROGRESS' },
    { status: 'COMPLETED' },
    { status: 'CANCELLED' }
  ];
  
  // 4. Task statuses
  const taskStatuses = [
    { status: 'PENDING' },
    { status: 'IN_PROGRESS' },
    { status: 'COMPLETED' },
    { status: 'CANCELLED' }
  ];
  
  // 5. Request priorities
  const priorities = [
    { level: 'LOW' },
    { level: 'MEDIUM' },
    { level: 'HIGH' },
    { level: 'URGENT' }
  ];
  
  // 6. Departments
  const departments = [
    { name: 'HOUSEKEEPING', description: 'Housekeeping department' },
    { name: 'MAINTENANCE', description: 'Maintenance department' },
    { name: 'FOOD_AND_BEVERAGE', description: 'Food and beverage department' },
    { name: 'FRONT_OFFICE', description: 'Front office department' },
    { name: 'MANAGEMENT', description: 'Hotel management' }
  ];
  
  // 7. Sample rooms
  const rooms = [
    { number: '101', type: 'Single' },
    { number: '102', type: 'Single' },
    { number: '103', type: 'Double' },
    { number: '104', type: 'Double' },
    { number: '105', type: 'Suite' },
    { number: '201', type: 'Single' },
    { number: '202', type: 'Double' },
    { number: '203', type: 'Double' },
    { number: '204', type: 'Suite' },
    { number: '205', type: 'Suite' }
  ];
  
  // 8. Sample users
  const users = [
    { email: 'admin@example.com', password: 'hashed_password_here', name: 'Admin User', role: 'ADMIN' },
    { email: 'manager@example.com', password: 'hashed_password_here', name: 'Hotel Manager', role: 'MANAGER' },
    { email: 'hk_supervisor@example.com', password: 'hashed_password_here', name: 'HK Supervisor', role: 'SUPERVISOR' },
    { email: 'hk_staff1@example.com', password: 'hashed_password_here', name: 'Housekeeper 1', role: 'HOUSEKEEPING' },
    { email: 'hk_staff2@example.com', password: 'hashed_password_here', name: 'Housekeeper 2', role: 'HOUSEKEEPING' },
    { email: 'maint_staff1@example.com', password: 'hashed_password_here', name: 'Maintenance 1', role: 'MAINTENANCE' },
    { email: 'fb_staff1@example.com', password: 'hashed_password_here', name: 'F&B Staff 1', role: 'FOOD_AND_BEVERAGE' },
    { email: 'front_desk1@example.com', password: 'hashed_password_here', name: 'Front Desk 1', role: 'FRONT_OFFICE' }
  ];
  
  console.log('Sample data created:');
  console.log('- Roles:', roles.length);
  console.log('- Room Statuses:', roomStatuses.length);
  console.log('- Request Statuses:', requestStatuses.length);
  console.log('- Task Statuses:', taskStatuses.length);
  console.log('- Priorities:', priorities.length);
  console.log('- Departments:', departments.length);
  console.log('- Rooms:', rooms.length);
  console.log('- Users:', users.length);
  
  console.log('Database seeding completed!');
}

// Run the seed function
seedDatabase().catch((error) => {
  console.error('Error seeding database:', error);
});