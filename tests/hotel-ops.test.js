// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Hotel Operations Management System', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('should allow admin to login and see dashboard', async ({ page }) => {
    // Test login functionality
    await page.fill('input#email', 'admin@example.com');
    await page.fill('input#password', 'admin123');
    await page.click('button[type="submit"]');
    
    // Verify successful login
    await expect(page).toHaveURL('http://localhost:3000/');
    await expect(page.locator('text=Hotel Operations')).toBeVisible();
    await expect(page.locator('text=Admin User')).toBeVisible();
    
    // Verify dashboard elements
    await expect(page.locator('text=Pending Requests')).toBeVisible();
    await expect(page.locator('text=Occupied Rooms')).toBeVisible();
    await expect(page.locator('text=Available Rooms')).toBeVisible();
    
    // Verify stats cards
    const pendingRequestsCard = page.locator('a[href="/requests"]');
    await expect(pendingRequestsCard).toBeVisible();
    
    const occupiedRoomsCard = page.locator('a[href="/rooms"]');
    await expect(occupiedRoomsCard).toBeVisible();
  });

  test('should allow navigation between main sections', async ({ page }) => {
    // Login first
    await page.fill('input#email', 'admin@example.com');
    await page.fill('input#password', 'admin123');
    await page.click('button[type="submit"]');
    
    // Navigate to Requests page
    await page.click('text=View Requests');
    await expect(page).toHaveURL('http://localhost:3000/requests');
    await expect(page.locator('text=Request Overview')).toBeVisible();
    
    // Navigate to Rooms page
    await page.goto('http://localhost:3000/');
    await page.click('text=Manage Rooms');
    await expect(page).toHaveURL('http://localhost:3000/rooms');
    await expect(page.locator('text=Room Status Overview')).toBeVisible();
    
    // Navigate to Analytics page
    await page.goto('http://localhost:3000/');
    await page.click('text=View Analytics');
    await expect(page).toHaveURL('http://localhost:3000/analytics');
    await expect(page.locator('text=Performance Metrics')).toBeVisible();
    
    // Navigate to Departments page
    await page.goto('http://localhost:3000/');
    await page.click('text=Department Coordination');
    await expect(page).toHaveURL('http://localhost:3000/departments');
    await expect(page.locator('text=Department Overview')).toBeVisible();
  });

  test('should manage room statuses', async ({ page }) => {
    // Login first
    await page.fill('input#email', 'admin@example.com');
    await page.fill('input#password', 'admin123');
    await page.click('button[type="submit"]');
    
    // Go to Rooms page
    await page.click('text=Manage Rooms');
    await expect(page).toHaveURL('http://localhost:3000/rooms');
    
    // Find a room and change its status
    const roomRow = page.locator('tr:has-text("101")');
    await expect(roomRow).toBeVisible();
    
    // Get current status
    const currentStatus = await roomRow.locator('span:has-text("CLEAN"), span:has-text("DIRTY"), span:has-text("INSPECTED"), span:has-text("OUT OF ORDER")').textContent();
    console.log('Current status:', currentStatus);
    
    // Change status
    await roomRow.locator('select').selectOption('DIRTY');
    
    // Verify status change
    await page.waitForTimeout(1000); // Wait for the change to be processed
    const updatedStatus = await roomRow.locator('span:has-text("DIRTY")').textContent();
    await expect(updatedStatus).toContain('DIRTY');
  });

  test('should manage guest requests', async ({ page }) => {
    // Login first
    await page.fill('input#email', 'admin@example.com');
    await page.fill('input#password', 'admin123');
    await page.click('button[type="submit"]');
    
    // Go to Requests page
    await page.click('text=View Requests');
    await expect(page).toHaveURL('http://localhost:3000/requests');
    
    // Find a request and change its status
    const requestRow = page.locator('tr:has-text("Extra Towels")');
    await expect(requestRow).toBeVisible();
    
    // Get current status
    const currentStatus = await requestRow.locator('span:has-text("PENDING"), span:has-text("IN PROGRESS"), span:has-text("COMPLETED")').textContent();
    console.log('Current request status:', currentStatus);
    
    // Change status
    await requestRow.locator('select').selectOption('IN_PROGRESS');
    
    // Verify status change
    await page.waitForTimeout(1000); // Wait for the change to be processed
    const updatedStatus = await requestRow.locator('span:has-text("IN PROGRESS")').textContent();
    await expect(updatedStatus).toContain('IN PROGRESS');
  });

  test('should show notifications', async ({ page }) => {
    // Login first
    await page.fill('input#email', 'admin@example.com');
    await page.fill('input#password', 'admin123');
    await page.click('button[type="submit"]');
    
    // Click on the notification bell
    await page.click('button:has(svg)');
    
    // Verify notifications panel opens
    await expect(page.locator('text=Notifications')).toBeVisible();
    
    // Check for notification items
    const notifications = page.locator('.p-4.border-b');
    if (await notifications.count() > 0) {
      const firstNotification = notifications.first();
      await expect(firstNotification).toBeVisible();
    }
  });

  test('should filter rooms by status', async ({ page }) => {
    // Login first
    await page.fill('input#email', 'admin@example.com');
    await page.fill('input#password', 'admin123');
    await page.click('button[type="submit"]');
    
    // Go to Rooms page
    await page.click('text=Manage Rooms');
    await expect(page).toHaveURL('http://localhost:3000/rooms');
    
    // Filter by Clean status
    await page.selectOption('select#statusFilter', 'CLEAN');
    
    // Verify only Clean rooms are shown
    const cleanRooms = page.locator('tr:has(span:has-text("CLEAN"))');
    const dirtyRooms = page.locator('tr:has(span:has-text("DIRTY"))');
    
    const cleanCount = await cleanRooms.count();
    const dirtyCount = await dirtyRooms.count();
    
    expect(cleanCount).toBeGreaterThan(0);
    expect(dirtyCount).toBe(0);
  });

  test('should filter requests by department', async ({ page }) => {
    // Login first
    await page.fill('input#email', 'admin@example.com');
    await page.fill('input#password', 'admin123');
    await page.click('button[type="submit"]');
    
    // Go to Requests page
    await page.click('text=View Requests');
    await expect(page).toHaveURL('http://localhost:3000/requests');
    
    // Filter by Housekeeping department
    await page.selectOption('select#departmentFilter', 'HOUSEKEEPING');
    
    // Verify only Housekeeping requests are shown
    const housekeepingRequests = page.locator('tr:has-text("HOUSEKEEPING")');
    const maintenanceRequests = page.locator('tr:has-text("MAINTENANCE")');
    
    const hkCount = await housekeepingRequests.count();
    const maintCount = await maintenanceRequests.count();
    
    expect(hkCount).toBeGreaterThan(0);
    expect(maintCount).toBe(0);
  });

  test('should show analytics data', async ({ page }) => {
    // Login first
    await page.fill('input#email', 'admin@example.com');
    await page.fill('input#password', 'admin123');
    await page.click('button[type="submit"]');
    
    // Go to Analytics page
    await page.click('text=View Analytics');
    await expect(page).toHaveURL('http://localhost:3000/analytics');
    
    // Verify analytics charts are visible
    await expect(page.locator('text=Average Response Time')).toBeVisible();
    await expect(page.locator('text=Department Performance')).toBeVisible();
    
    // Verify stats cards
    await expect(page.locator('text=Avg. Response Time')).toBeVisible();
    await expect(page.locator('text=Requests Today')).toBeVisible();
    await expect(page.locator('text=Completion Rate')).toBeVisible();
    await expect(page.locator('text=Staff Active')).toBeVisible();
  });

  test('should show department overview', async ({ page }) => {
    // Login first
    await page.fill('input#email', 'admin@example.com');
    await page.fill('input#password', 'admin123');
    await page.click('button[type="submit"]');
    
    // Go to Departments page
    await page.click('text=Department Coordination');
    await expect(page).toHaveURL('http://localhost:3000/departments');
    
    // Verify department cards
    await expect(page.locator('text=Housekeeping')).toBeVisible();
    await expect(page.locator('text=Maintenance')).toBeVisible();
    await expect(page.locator('text=Food & Beverage')).toBeVisible();
    
    // Verify department stats
    const housekeepingCard = page.locator('div:has-text("Housekeeping")');
    await expect(housekeepingCard.locator('text=Pending')).toBeVisible();
    await expect(housekeepingCard.locator('text=In Progress')).toBeVisible();
    await expect(housekeepingCard.locator('text=Completed')).toBeVisible();
  });

  test('should allow logout', async ({ page }) => {
    // Login first
    await page.fill('input#email', 'admin@example.com');
    await page.fill('input#password', 'admin123');
    await page.click('button[type="submit"]');
    
    // Verify login success
    await expect(page.locator('text=Admin User')).toBeVisible();
    
    // Logout
    await page.click('button:has-text("Logout")');
    
    // Verify logout success
    await expect(page).toHaveURL('http://localhost:3000/');
    await expect(page.locator('text=Hotel Operations Login')).toBeVisible();
  });
});