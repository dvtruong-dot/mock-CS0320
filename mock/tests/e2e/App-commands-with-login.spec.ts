import {expect, test} from "@playwright/test";

const url = 'http://localhost:8000'

test("empty command", async ({ page }) => {
    await page.goto(url);
    await page.getByLabel('Login').click();

    //click submit without typing anything into the command
    await page.getByRole('button', { name: 'Submit' }).click();

    //the command should not be found and the portionn where the command inputted 
    //goes should be empty
    await expect(page.getByText('Command not found.')).toBeVisible();

    //click submit when we replace with spaces
    await page.getByPlaceholder('Enter command here!').click();
    await page.getByPlaceholder('Enter command here!').fill('      ');
    await page.getByRole('button', { name: 'Submit' }).click();

    //same thing should happen as above
    await expect(page.getByText('Command not found.').nth(1)).toBeVisible();
    
    //it should show empty commands in verbose mode
    await page.getByPlaceholder('Enter command here!').click();
    await page.getByPlaceholder('Enter command here!').fill('mode');
    await page.getByRole('button', { name: 'Submit' }).click();

    await expect(page.getByText('command: result: Command not').first()).toBeVisible();
    await expect(page.getByText('command: result: Command not').nth(1)).toBeVisible();
    await expect(page.getByText('command: mode result: mode')).toBeVisible();
})

test("command doesn't exist", async ({ page }) => {
    await page.goto(url);
    await page.getByLabel('Login').click();

    //enter first command that doesn't exist
    await page.getByPlaceholder('Enter command here!').click();
    await page.getByPlaceholder('Enter command here!').fill('t');
    await page.getByRole('button', { name: 'Submit' }).click();

    //it should display "Command t not found" in the history
    await expect(page.getByText('Command t not found.')).toBeVisible();

    //enter second command that doesn't exist
    await page.getByPlaceholder('Enter command here!').click();
    await page.getByPlaceholder('Enter command here!').fill('s');
    await page.getByRole('button', { name: 'Submit' }).click();

    //it should display that the command doesn't exist in the history
    await expect(page.getByText('Command s not found.')).toBeVisible();
})

test('mode command', async ({ page }) => {
    await page.goto(url);
    await page.getByLabel('Login').click();

    //enter a command that doesn't exist to check that the default is brief
    await page.getByPlaceholder('Enter command here!').click();
    await page.getByPlaceholder('Enter command here!').fill('yoo');
    await page.getByRole('button', { name: 'Submit' }).click();

    await expect(page.getByText('Command yoo not found.')).toBeVisible();
    
    //enter mode to change to verbose
    await page.getByPlaceholder('Enter command here!').click();
    await page.getByPlaceholder('Enter command here!').fill('mode');
    await page.getByRole('button', { name: 'Submit' }).click();

    //check that all entries in the history are in verbose
    await expect(page.getByText('Command yoo nnot found.')).not.toBeVisible();
    await expect(page.getByText('command: yoo result: Command')).toBeVisible();
    await expect(page.getByText('command: mode result: mode')).toBeVisible();
    
    //enter mode again to change to brief
    await page.getByPlaceholder('Enter command here!').click();
    await page.getByPlaceholder('Enter command here!').fill('mode');
    await page.getByRole('button', { name: 'Submit' }).click();

    //check that all entires in the history are now brief
    await expect(page.getByText('command: yoo result: Command')).not.toBeVisible();
    await expect(page.getByText('command: mode result: mode')).not.toBeVisible();
    await expect(page.getByText('Command yoo not found.')).toBeVisible();
    await expect(page.getByText('mode set to verbose')).toBeVisible();
    await expect(page.getByText('mode set to brief')).toBeVisible();
})

test('load legitimate file and view -> load another legitimate file and view', async ({ page }) => {
    await page.goto(url);
    await page.getByLabel('Login').click();

    //load the first file
    await page.getByPlaceholder('Enter command here!').click();
    await page.getByPlaceholder('Enter command here!').fill('load_file file1_headers');
    await page.getByRole('button', { name: 'Submit' }).click();

    //success message should appear
    await expect(page.getByText('file loaded successfully')).toBeVisible();

    //display the file using view
    await page.getByPlaceholder('Enter command here!').click();
    await page.getByPlaceholder('Enter command here!').fill('view_file');
    await page.getByRole('button', { name: 'Submit' }).click();

    //expect that the table should be displayed
    await expect(page.getByText('header1header2header3123456')).toBeVisible();

    //loading another file
    await page.getByPlaceholder('Enter command here!').click();
    await page.getByPlaceholder('Enter command here!').fill('load_file file1_noheaders');
    await page.getByRole('button', { name: 'Submit' }).click();

    //success message should also display
    await expect(page.getByText('file loaded successfully').nth(1)).toBeVisible();

    //display the new file using view again
    await page.getByPlaceholder('Enter command here!').click();
    await page.getByPlaceholder('Enter command here!').fill('view_file');
    await page.getByRole('button', { name: 'Submit' }).click();

    //expect that the table should be displayed
    await expect(page.getByText('12345,6')).toBeVisible();

    //load in the old file
    await page.getByPlaceholder('Enter command here!').click();
    await page.getByPlaceholder('Enter command here!').fill('load_file file1_headers');
    await page.getByRole('button', { name: 'Submit' }).click();

    //a success message should display again
    await expect(page.getByText('file loaded successfully').nth(2)).toBeVisible();

    //display the old file again using view
    await page.getByPlaceholder('Enter command here!').click();
    await page.getByPlaceholder('Enter command here!').fill('view_file');
    await page.getByRole('button', { name: 'Submit' }).click();

    //the table should display in the history again
    await expect(page.getByText('header1header2header3123456').nth(1)).toBeVisible();


    //TODO: for later, add when you load a file that doesn't exist, it doesn't change the file in the REPL currently
})

test('load file not found', async ( { page } ) => {
    await page.goto(url);
    await page.getByLabel('Login').click();

    //try to load a file that doesn't exist within our mock
    await page.getByPlaceholder('Enter command here!').click();
    await page.getByPlaceholder('Enter command here!').fill('load_file file');
    await page.getByRole('button', { name: 'Submit' }).click();

    //it should be unsuccessful and the following message should display
    await expect(page.getByText('file could not be found')).toBeVisible();

    //TODO: check that there is no file loaded into the REPL somehow
})