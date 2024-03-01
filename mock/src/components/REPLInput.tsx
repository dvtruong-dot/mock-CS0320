import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";
import { REPLFunction } from "./REPLFunction";
import { CommandProcessor } from "../command";

/**
 * The props for the REPLInput component of aite
 */
interface REPLInputProps {
  commandHistory: { command: string; result: string | string[][] }[];
  setCommandHistory: Dispatch<
    SetStateAction<{ command: string; result: string | string[][] }[]>
  >;

  useBrief: boolean;
  setUseBrief: Dispatch<SetStateAction<boolean>>;
  commandProcessor: CommandProcessor;
}

/**
 * Function that controls the input and submitt boxes in the site
 * @param props the props that are in the REPL input class: commandHistory, useBrief, 
 * and command processor as well as setCommandHistory and setUseBrief
 * @returns a Javascript componnent that is the input and submit boxes in the site
 */
export function REPLInput(props: REPLInputProps) {
  const [commandString, setCommandString] = useState<string>("");

  /**
   * A handler for the submit function. It basically saves what is written in the input box 
   * as well as its output in the 'history' of the site, which is also displayed on the site
   */
  function handleSubmit(commandString: string) {
    const toAddCommand = {
      command: commandString,
      result: getOutput(commandString),
    };

    props.setCommandHistory([...props.commandHistory, toAddCommand]);

    setCommandString("");
  }

  /**
   * gets the output of an inputted command string
   * @param command the command string of the desired function
   * @returns 
   */
  function getOutput(command: string): string | string[][] {
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
