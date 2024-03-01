import { useState } from "react";
import "../styles/main.css";
import { REPLHistory } from "./REPLHistory";
import { REPLInput } from "./REPLInput";
import { CommandProcessor } from "../command";
import { mockedCSV } from "../mockedCSV";
import { dataMap } from "../../data/mockedData";

/**
 * Top level component for the REPL. Registers all possible commands.
 * @returns A component displaying the REPL history and input bar.
 */
export default function REPL() {
  //initialize state hooks
  const [commandHistory, setCommandHistory] = useState<
    { command: string; result: string | string[][] }[]
  >([]);
  const [loadedFile, setLoadedFile] = useState<mockedCSV>();
  const [useBrief, setUseBrief] = useState<boolean>(true);
  const commandProcessor = new CommandProcessor();

  //Command Registration

  //register mode
  commandProcessor.registerCommand("mode", () => {
    setUseBrief(!useBrief);
    if (useBrief) {
      return "mode set to verbose";
    } else {
      return "mode set to brief";
    }
  });

  //register load
  commandProcessor.registerCommand("load_file", (args: string[]) => {
    if (args.length < 2) {
      return "!Error! load_file command must be in format: load_file <file_name> <if_file_contains_headers>";
    }

    if (!(args[1] === "true") && !(args[1] === "false")) {
      return "!Error! <if_file_contains_headers> parameter must be of value 'true' or 'false'";
    }

    //SIMULATED MALFORMED CSV
    if (args[0] == "file_malformed") {
      return "!Error! CSV is malformed!";
    }

    //get mocked data object from map using file
    const data = dataMap.get(args[0]);
    if (data) {
      if (args[1] === "true") {
        data.setHeaders(true);
      } else {
        data.setHeaders(false);
      }
      setLoadedFile(data);
      return "file loaded successfully";
    } else {
      return "file '" + args[0] + "' could not be found";
    }
  });

  //register view
  commandProcessor.registerCommand("view_file", () => {
    if (loadedFile) {
      return loadedFile.view();
    } else {
      return "No file has been loaded!";
    }
  });

  //register search
  commandProcessor.registerCommand("search_file", (args: string[]) => {
    if (!loadedFile) {
      return "No file has been loaded!";
    } else {
      const response = loadedFile.search(args[0] + " " + args[1]);
      if (response.length == 0) {
        return "Could not find '" + args[1] + "' in column '" + args[0] + "'";
      } else {
        return response;
      }
    }
  });

  return (
    <div className="repl">
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
