import { expect, test } from "@playwright/test";

/**
 * Test general functionality of website.
 */
test("on page load, i see a login button", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await expect(page.getByLabel("Login")).toBeVisible();
});

test("after I type into the input box, its text changes", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();

  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("Awesome command");

  const mock_input = `Awesome command`;
  await expect(page.getByLabel("Command input")).toHaveValue(mock_input);
});

/**
 * Tests 'login' button
 */
test("on page load, i dont see the input box until login", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await expect(page.getByLabel("Sign Out")).not.toBeVisible();
  await expect(page.getByLabel("Command input")).not.toBeVisible();

  // click the login button
  await page.getByLabel("Login").click();
  await expect(page.getByLabel("Sign Out")).toBeVisible();
  await expect(page.getByLabel("Command input")).toBeVisible();
});

/**
 * Tests that the history is updating correctly and as a result displaying in the correct order
 */
test("history updates correctly", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();

  //enter a few commands that don't exist
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("t");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("s");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("x");
  await page.getByRole("button", { name: "Submit" }).click();

  //expect that they are in the correct order
  
  const firstHistory = await page.evaluate(() => {
    const currHistory = document.querySelector(".repl-history");
    return currHistory?.children[0].textContent;
  });

  const secondHistory = await page.evaluate(() => {
    const currHistory = document.querySelector(".repl-history");
    return currHistory?.children[1].textContent;
  });

  const thirdHistory = await page.evaluate(() => {
    const currHistory = document.querySelector(".repl-history");
    return currHistory?.children[2].textContent;
  });

  expect(firstHistory).toEqual(" Command \'t\' not found.");
  expect(secondHistory).toEqual(" Command \'s\' not found.");
  expect(thirdHistory).toEqual(" Command \'x\' not found.");
});
