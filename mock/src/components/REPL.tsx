import { useState } from "react";
import "../styles/main.css";
import { REPLHistory } from "./REPLHistory";
import { REPLInput } from "./REPLInput";
import { CommandProcessor } from "../command";

/* 
  You'll want to expand this component (and others) for the sprints! Remember 
  that you can pass "props" as function arguments. If you need to handle state 
  at a higher level, just move up the hooks and pass the state/setter as a prop.
  
  This is a great top level component for the REPL. It's a good idea to have organize all components in a component folder.
  You don't need to do that for this gearup.
*/

export default function REPL() {
  const mockedData = new Map<string, string[][]>();
  mockedData.set("file1", [
    ["header1", "header2", "header3"],
    ["1", "2", "3"],
    ["4", "5", "6"],
  ]);
  // TODO: Add some kind of shared state that holds all the commands submitted.
  //const [history, setHistory] = useState<string[]>([]);

  //new schtuff
  const [commandHistory, setCommandHistory] = useState<
    { command: string; result: string }[]
  >([]);
  const [loadedFile, setLoadedFile] = useState<string[][]>();
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
    if (mockedData.get(args[0])) {
      setLoadedFile(mockedData.get(args[0]));
      return "file loaded successfully";
    } else {
      return "file could not be found";
    }
  });

  commandProcessor.registerCommand("view_file", () => {
    if (loadedFile) {
      return loadedFile;
    } else {
      return "No file has been loaded!";
    }
  });

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
