import { expect, test } from "@playwright/test";

const url = "http://localhost:8000";

/**
 * Test entering nothing into the command bar
 */
test("empty command", async ({ page }) => {
  await page.goto(url);
  await page.getByLabel("Login").click();

  //click submit without typing anything into the command
  await page.getByRole("button", { name: "Submit" }).click();

  //the command should not be found and the portionn where the command inputted
  //goes should be empty
  await expect(page.getByText("Command \'\' not found.")).toBeVisible();

  //click submit when we replace with spaces
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("      ");
  await page.getByRole("button", { name: "Submit" }).click();

  //same thing should happen as above
  await expect(page.getByText("Command \'\' not found.").nth(1)).toBeVisible();

  //it should show empty commands in verbose mode
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("mode");
  await page.getByRole("button", { name: "Submit" }).click();

  await expect(
    page.getByText("command: result: Command \'\' not found.").first()
  ).toBeVisible();
  await expect(
    page.getByText("command: result: Command \'\' not found.").nth(1)
  ).toBeVisible();
  await expect(page.getByText("command: mode result: mode set to verbose")).toBeVisible();
});

/**
 * Test entering a command that doesn't exist
 */
test("command doesn't exist", async ({ page }) => {
  await page.goto(url);
  await page.getByLabel("Login").click();

  //enter first command that doesn't exist
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("t");
  await page.getByRole("button", { name: "Submit" }).click();

  //it should display "Command t not found" in the history
  await expect(page.getByText("Command \'t\' not found.")).toBeVisible();

  //enter second command that doesn't exist
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("s");
  await page.getByRole("button", { name: "Submit" }).click();

  //it should display that the command doesn't exist in the history
  await expect(page.getByText("Command \'s\' not found.")).toBeVisible();
});

/**
 * Test the 'mode' command
 */
test("mode command", async ({ page }) => {
  await page.goto(url);
  await page.getByLabel("Login").click();

  //enter a command that doesn't exist to check that the default is brief
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("yoo");
  await page.getByRole("button", { name: "Submit" }).click();

  await expect(page.getByText("Command \'yoo\' not found.")).toBeVisible();

  //enter mode to change to verbose
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("mode");
  await page.getByRole("button", { name: "Submit" }).click();

  //check that all entries in the history are in verbose
  await expect(page.getByText("command: yoo result: Command \'yoo\' not found.")).toBeVisible();
  await expect(page.getByText("command: mode result: mode set to verbose")).toBeVisible();

  //enter mode again to change to brief
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("mode");
  await page.getByRole("button", { name: "Submit" }).click();

  //check that all entires in the history are now brief
  await expect(
    page.getByText("command: yoo result: Command \'yoo\' not found.")
  ).not.toBeVisible();
  await expect(page.getByText("command: mode result: mode set to verbose")).not.toBeVisible();
  await expect(page.getByText("Command \'yoo\' not found.")).toBeVisible();
  await expect(page.getByText("mode set to brief")).toBeVisible();
  await expect(page.getByText("mode set to verbose")).toBeVisible();
});

/**
 * Test loading a legitimate file, view it, then do the same for another file
 */
test("load legitimate file and view -> load another legitimate file and view", async ({
  page,
}) => {
  await page.goto(url);
  await page.getByLabel("Login").click();

  //load the first file
  await page.getByPlaceholder("Enter command here!").click();
  await page
    .getByPlaceholder("Enter command here!")
    .fill("load_file file1_headers true");
  await page.getByRole("button", { name: "Submit" }).click();

  //success message should appear
  await expect(page.getByText("file loaded successfully")).toBeVisible();

  //display the file using view
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("view_file");
  await page.getByRole("button", { name: "Submit" }).click();

  //expect that the table should be displayed
  await expect(page.getByText("header1header2header3123456")).toBeVisible();

  //loading another file
  await page.getByPlaceholder("Enter command here!").click();
  await page
    .getByPlaceholder("Enter command here!")
    .fill("load_file file1_noheaders false");
  await page.getByRole("button", { name: "Submit" }).click();

  //success message should also display
  await expect(page.getByText("file loaded successfully").nth(1)).toBeVisible();

  //display the new file using view again
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("view_file");
  await page.getByRole("button", { name: "Submit" }).click();

  //expect that the table should be displayed
  await expect(page.getByText("12345,6")).toBeVisible();

  //load in the old file
  await page.getByPlaceholder("Enter command here!").click();
  await page
    .getByPlaceholder("Enter command here!")
    .fill("load_file file1_headers true");
  await page.getByRole("button", { name: "Submit" }).click();

  //a success message should display again
  await expect(page.getByText("file loaded successfully").nth(2)).toBeVisible();

  //display the old file again using view
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("view_file");
  await page.getByRole("button", { name: "Submit" }).click();

  //the table should display in the history again
  await expect(
    page.getByText("header1header2header3123456").nth(1)
  ).toBeVisible();
});

/**
 * Test loading a file that doesn't exist
 */
test("load file not found", async ({ page }) => {
  await page.goto(url);
  await page.getByLabel("Login").click();

  //try to load a file that doesn't exist within our mock
  await page.getByPlaceholder("Enter command here!").click();
  await page
    .getByPlaceholder("Enter command here!")
    .fill("load_file file false");
  await page.getByRole("button", { name: "Submit" }).click();

  //it should be unsuccessful and the following message should display
  await expect(page.getByText("file \'file\' could not be found")).toBeVisible();

  //therefore viewing a file should be unsuccessful
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("view_file");
  await page.getByRole("button", { name: "Submit" }).click();

  await expect(page.getByText("No file has been loaded!")).toBeVisible();
});

/**
 * Test loading a file that doesn't exist after loading a legitimate file
 */
test("load file that doesn't exist after loading a legitimate file", async ({
  page,
}) => {
  await page.goto(url);
  await page.getByLabel("Login").click();

  //loading a legitimate file and viewing to ensure that it displays correctly
  await page.getByPlaceholder("Enter command here!").click();
  await page
    .getByPlaceholder("Enter command here!")
    .fill("load_file file1_headers true");
  await page.getByRole("button", { name: "Submit" }).click();

  await expect(page.getByText("file loaded successfully")).toBeVisible();

  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("view_file");
  await page.getByRole("button", { name: "Submit" }).click();

  await expect(page.getByText("header1header2header3123456")).toBeVisible();

  //loading a nonexistent file
  await page.getByPlaceholder("Enter command here!").click();
  await page
    .getByPlaceholder("Enter command here!")
    .fill("load_file nonexistent true");
  await page.getByRole("button", { name: "Submit" }).click();

  //should be unsuccessful
  await expect(page.getByText("file \'nonexistent\' could not be found")).toBeVisible();

  //trying to view should return the file that was most recently loaded, which, in this case, is
  //file1_headers
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("view_file");
  await page.getByRole("button", { name: "Submit" }).click();

  await expect(
    page.getByText("header1header2header3123456").nth(1)
  ).toBeVisible();
});

/**
 * Test the 'search' command
 */
test("test search", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();

  //try searching when no file has been loaded
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("search_file z a");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("No file has been loaded!")).toBeVisible();

  //load normal file
  await page.getByPlaceholder("Enter command here!").click();
  await page
    .getByPlaceholder("Enter command here!")
    .fill("load_file file1_headers true");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("file loaded successfully")).toBeVisible();

  //search the file
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("search_file 1 2");
  await page.getByRole("button", { name: "Submit" }).click();

  //verify that the search result is correct
  await expect(page.getByRole("table")).toBeVisible();
  await expect(page.getByRole("cell", { name: "1" })).toBeVisible();
  await expect(page.getByRole("cell", { name: "2" })).toBeVisible();
  await expect(page.getByRole("cell", { name: "3" })).toBeVisible();

  //search for something that doesn't exist in the file
  await page.getByPlaceholder("Enter command here!").click();
  await page
    .getByPlaceholder("Enter command here!")
    .fill("search_file bippity boppity");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("Could not find 'boppity' in column 'bippity'")).toBeVisible();

  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("mode");
  await page.getByRole("button", { name: "Submit" }).click();

  await expect(page.getByText("command: search_file 1 2")).toBeVisible();
  await expect(page.getByText("command: search_file bippity boppity result: Could not find 'boppity' in column 'bippity'")).toBeVisible();
});

/**
 * Test the 'search' command on strange files
 */
test("test search strange", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();

  //load file with one column
  await page.getByPlaceholder("Enter command here!").click();
  await page
    .getByPlaceholder("Enter command here!")
    .fill("load_file file_one_column false");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(
    page.getByText("file loaded successfully").first()
  ).toBeVisible();

  //search the file
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("search_file 0 3");
  await page.getByRole("button", { name: "Submit" }).click();

  //verify that the search result is correct
  await expect(page.getByRole("table")).toBeVisible();
  await expect(page.getByRole("cell", { name: "3" })).toBeVisible();

  //load file with one row
  await page.getByPlaceholder("Enter command here!").click();
  await page
    .getByPlaceholder("Enter command here!")
    .fill("load_file file_one_row false");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("file loaded successfully").nth(1)).toBeVisible();

  //search the file
  await page.getByPlaceholder("Enter command here!").click();
  await page.getByPlaceholder("Enter command here!").fill("search_file 3 4");
  await page.getByRole("button", { name: "Submit" }).click();

  //verify that the search result is correct
  await expect(page.getByRole("cell", { name: "2, 3, 4, 5" })).toBeVisible();
});

/**
 * Test loading a malformed CSV
 */
test("test load malformed", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();

  //load file with one column
  await page.getByPlaceholder("Enter command here!").click();
  await page
    .getByPlaceholder("Enter command here!")
    .fill("load_file file_malformed true");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("!Error! CSV is malformed!")).toBeVisible();
});
