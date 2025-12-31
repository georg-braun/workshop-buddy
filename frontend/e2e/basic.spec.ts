import { test, expect } from '@playwright/test';

test.describe('Workshop Buddy E2E Tests', () => {
  test('should display login page', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Workshop Buddy' })).toBeVisible();
    await expect(page.getByPlaceholder('Username')).toBeVisible();
    await expect(page.getByPlaceholder('Password')).toBeVisible();
  });

  test('should register and login', async ({ page }) => {
    await page.goto('/');
    
    // Register
    const username = `testuser${Date.now()}`;
    await page.getByPlaceholder('Username').fill(username);
    await page.getByPlaceholder('Password').fill('password123');
    await page.getByRole('button', { name: 'Register' }).click();
    
    // Should redirect to dashboard
    await expect(page).toHaveURL('/dashboard');
    await expect(page.getByText('Welcome to Workshop Buddy')).toBeVisible();
  });

  test('should create and manage materials', async ({ page }) => {
    await page.goto('/');
    
    // Register/Login
    const username = `testuser${Date.now()}`;
    await page.getByPlaceholder('Username').fill(username);
    await page.getByPlaceholder('Password').fill('password123');
    await page.getByRole('button', { name: 'Register' }).click();
    
    // Navigate to materials
    await page.getByRole('link', { name: 'Materials' }).click();
    await expect(page).toHaveURL('/materials');
    
    // Create material
    await page.getByRole('button', { name: 'Add Material' }).click();
    await page.getByPlaceholder('Material name').fill('Test Material');
    await page.getByPlaceholder('Description').fill('Test description');
    await page.locator('input[type="number"]').first().fill('100');
    await page.locator('input[type="number"]').nth(1).fill('20');
    await page.getByPlaceholder('Unit').fill('pieces');
    await page.getByRole('button', { name: 'Create' }).click();
    
    // Verify material was created
    await expect(page.getByText('Test Material')).toBeVisible();
    await expect(page.getByText('100')).toBeVisible();
  });
});
