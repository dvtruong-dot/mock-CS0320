import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";
import { REPLFunction } from "./REPLFunction";
import { CommandProcessor } from "../command";

interface REPLInputProps {
  //history : string[];
  //setHistory: Dispatch<SetStateAction<string[]>>

  //new shit
  commandHistory: { command: string; result: string }[];
  setCommandHistory: Dispatch<
    SetStateAction<{ command: string; result: string }[]>
  >;

  useBrief: boolean;
  setUseBrief: Dispatch<SetStateAction<boolean>>;
  commandProcessor: CommandProcessor;
  // TODO: Fill this with desired props... Maybe something to keep track of the submitted commands
}
// You can use a custom interface or explicit fields or both! An alternative to the current function header might be:
// REPLInput(history: string[], setHistory: Dispatch<SetStateAction<string[]>>)
export function REPLInput(props: REPLInputProps) {
  // Remember: let React manage state in your webapp.
  // Manages the contents of the input box
  const [commandString, setCommandString] = useState<string>("");
  //const [brief, setBrief] = useState<boolean>(true);

  /**
   * We suggest breaking down this component into smaller components, think about the individual pieces
   * of the REPL and how they connect to each other...
   */
  function handleSubmit(commandString: string) {
    const toAddCommand = {
      command: commandString,
      result: getOutput(commandString),
    };

    props.setCommandHistory([...props.commandHistory, toAddCommand]);

    setCommandString("");
  }

  function getOutput(command: string): string {
    //maybe a placeholder until user story 6 where we'll have a dictionary that takes a command and maps
    //it to a function (or class ???, idk im confused) that has the function it corresponds to. This
    //function should also return a string

    return props.commandProcessor.processCommand(command);
  }

  return (
    <div className="repl-input">
      {/* I opted to use this HTML tag; you don't need to. It structures multiple input fields
            into a single unit, which makes it easier for screenreaders to navigate. */}
      <fieldset>
        <legend>Enter a command:</legend>
        <ControlledInput
          value={commandString}
          setValue={setCommandString}
          ariaLabel={"Command input"}
        />
      </fieldset>
      <button onClick={() => handleSubmit(commandString)}>Submit</button>
    </div>
  );
}
