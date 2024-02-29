import { expect, test } from "@playwright/test";


/**
  The general shapes of tests in Playwright Test are:
    1. Navigate to a URL
    2. Interact with the page
    3. Assert something about the page against your expectations
  Look for this pattern in the tests below!
 */

// If you needed to do something before every test case...
test.beforeEach(() => {
    // ... you'd put it here.
    // TODO: Is there something we need to do before every test case to avoid repeating code?
  })

/**
 * Don't worry about the "async" yet. We'll cover it in more detail
 * for the next sprint. For now, just think about "await" as something 
 * you put before parts of your test that might take time to run, 
 * like any interaction with the page.
 */
test('on page load, i see a login button', async ({ page }) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await page.goto('http://localhost:8000/');
  await expect(page.getByLabel('Login')).toBeVisible()
})

test('on page load, i dont see the input box until login', async ({ page }) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await page.goto('http://localhost:8000/');
  await expect(page.getByLabel('Sign Out')).not.toBeVisible()
  await expect(page.getByLabel('Command input')).not.toBeVisible()

  // click the login button
  await page.getByLabel('Login').click();
  await expect(page.getByLabel('Sign Out')).toBeVisible()
  await expect(page.getByLabel('Command input')).toBeVisible()
})

test('after I type into the input box, its text changes', async ({ page }) => {
  // Step 1: Navigate to a URL
  await page.goto('http://localhost:8000/');
  await page.getByLabel('Login').click();

  // Step 2: Interact with the page
  // Locate the element you are looking for
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('Awesome command');

  // Step 3: Assert something about the page
  // Assertions are done by using the expect() function
  const mock_input = `Awesome command`
  await expect(page.getByLabel('Command input')).toHaveValue(mock_input)
});

test('history updates correctly', async ( { page } ) => {
  await page.goto('http://localhost:8000/');
  await page.getByLabel('Login').click();

  //enter a few commands that don't exist
  await page.getByPlaceholder('Enter command here!').click();
  await page.getByPlaceholder('Enter command here!').fill('t');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByPlaceholder('Enter command here!').click();
  await page.getByPlaceholder('Enter command here!').fill('s');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByPlaceholder('Enter command here!').click();
  await page.getByPlaceholder('Enter command here!').fill('x');
  await page.getByRole('button', { name: 'Submit' }).click();

  //expect that they are in the correct order
  await page.getByText('Command t not found. Command').click();
  const firstHistory = await page.evaluate(() => {
    const currHistory = document.querySelector('.repl-history');
    return currHistory?.children[0].textContent;
  })

  const secondHistory = await page.evaluate(() => {
    const currHistory = document.querySelector('.repl-history');
    return currHistory?.children[1].textContent;
  })

  const thirdHistory = await page.evaluate(() => {
    const currHistory = document.querySelector('.repl-history');
    return currHistory?.children[2].textContent;
  })

  expect(firstHistory).toEqual(' Command t not found.');
  expect(secondHistory).toEqual(' Command s not found.');
  expect(thirdHistory).toEqual(' Command x not found.');
})