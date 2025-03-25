import { test, expect } from '@playwright/test';

test('smoke test', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  // Expect the start button to be present
  const startButton = page.locator('button:text("Start new game")')
  await expect(startButton).toBeVisible()

  //click the start button
  await startButton.click()

  //expect first card to be visible after loading api data and then click it
  const firstCard = page.getByTestId('card-1')
  await firstCard.waitFor();
  await firstCard.click();

  const areYouSureButton = page.getByTestId('are_you_sure')
  await expect(areYouSureButton).toBeVisible()
  
});
