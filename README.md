> **GETTING STARTED:** You should likely start with the `/mock` folder from your solution code for the mock gearup.

# Project Details
## Mock
Team members: Derek Truong (dvtruong) and Raymond Kao (rmkao) \
Total time: 18 hours \
Repo link: https://github.com/cs0320-s24/mock-rmkao-dvtruong

# Design Choices
Our program is a web page that consists of two main parts - the REPL history and the REPL input. As the user enters commands into the REPL, they will be shown in the scrolling REPL history. Our highest level component is the REPL class, which displays both the history and the input box. It also registers REPL commands and keeps track of state. Each command is handled by a function which uses the REPLFunction interface. All of our mocked data is stored in mockedData.ts, which uses instances of our mockedCSV class to store data and mocked query responses. We use a map from filename to mockedCSV instance for convenience when accessing the mockedCSV object from user input. 

# Errors/Bugs
We are not aware of any bugs in our program. 

# Tests
Our testing suite extensively tests calling the 'load_file', 'view_file', and 'search_file' in various states and contexts. We also test the general app functionality like login and history. Finally, we have a unit test that tests the functionality of our 'command.tsx' class, which is registering and processing commands. 

# How to
First, cd into the 'mock' folder. Then, you can run the program using 'npm start' and run tests using 'npm run test'. 

# Collaboration
N/A
