import { useState } from "react";
import "../styles/main.css";
import { REPLHistory } from "./REPLHistory";
import { REPLInput } from "./REPLInput";
import { CommandProcessor } from "../command";
import { MockedData } from "../mocked_data";

/* 
  You'll want to expand this component (and others) for the sprints! Remember 
  that you can pass "props" as function arguments. If you need to handle state 
  at a higher level, just move up the hooks and pass the state/setter as a prop.
  
  This is a great top level component for the REPL. It's a good idea to have organize all components in a component folder.
  You don't need to do that for this gearup.
*/

export default function REPL() {
  const mockedData = new Map<string, MockedData>();

  //Create instances of MockedData
  //
  const file1_headers = new MockedData([
    ["header1", "header2", "header3"],
    ["1", "2", "3"],
    ["4", "5", "6"],
  ]);
  file1_headers.registerQuery("header1 4", [["4", "5", "6"]]);
  file1_headers.registerQuery("1 2", [["1", "2", "3"]]);
  file1_headers.registerQuery("header3 3", [["1", "2", "3"]]);

  //
  const file1_noheaders = new MockedData([
    ["1", "2", "3"],
    ["4", "5,", "6"]
  ])
  file1_headers.registerQuery('1 1', [['1', '2', '3']]);
  file1_headers.registerQuery('2 6', [['4', '5', '6']]);

  //inconsistent column (not sure if this should be a case to have for this assignment)
  const file_inconsistent_columns = new MockedData([
    ['header1', 'header2', 'header3'],
    ['1', '2', '3'],
    ['4', '5']
  ])

  //set the map for all available datasets
  mockedData.set('file1_headers', file1_headers);
  mockedData.set('file1_noheaders', file1_noheaders);
  mockedData.set('file_inconsistent_columns', file_inconsistent_columns);

  //initialize state hooks
  const [commandHistory, setCommandHistory] = useState<
    { command: string; result: string | string[][] }[]
  >([]);
  const [loadedFile, setLoadedFile] = useState<MockedData>();
  const [useBrief, setUseBrief] = useState<boolean>(true);
  const commandProcessor = new CommandProcessor();

  //Command Registration
  commandProcessor.registerCommand("mode", () => {
    setUseBrief(!useBrief);
    if (useBrief) {
      return "mode set to verbose";
    } else {
      return "mode set to brief";
    }
  });

  commandProcessor.registerCommand("load_file", (args: string[]) => {
    //i changed this
    if (args.length < 2) {
      return "!Error! load_file command must be in format: load_file <file_name> <if_file_contains_headers>";
    }

    if (!(args[1] === "true") && !(args[1] === "false")) {
      return "!Error! <if_file_contains_headers> parameter must be of value 'true' or 'false'";
    }

    const data = mockedData.get(args[0]);
    if (data) {
      if (args[1] === "true") {
        data.setHeaders(true);
      } else {
        data.setHeaders(false);
      }
      setLoadedFile(data);
      return "file loaded successfully";
    } else {
      return "file could not be found";
    }
  });

  commandProcessor.registerCommand("view_file", () => {
    if (loadedFile) {
      return loadedFile.view();
    } else {
      return "No file has been loaded!";
    }
  });

  //implement our search
  commandProcessor.registerCommand("search_file", (args: string[]) => {
    if (!loadedFile) {
      return "No file has been loaded!";
    }
    
    
  })

  return (
    <div className="repl">
      {/*This is where your REPLHistory might go... You also may choose to add it within your REPLInput 
      component or somewhere else depending on your component organization. What are the pros and cons of each? */}
      {/* TODO: Update your REPLHistory and REPLInput to take in new shared state as props */}
      <REPLHistory commandHistory={commandHistory} useBrief={useBrief} />
      <hr></hr>
      <REPLInput
        commandHistory={commandHistory}
        setCommandHistory={setCommandHistory}
        useBrief={useBrief}
        setUseBrief={setUseBrief}
        commandProcessor={commandProcessor}
      />
    </div>
  );
}
