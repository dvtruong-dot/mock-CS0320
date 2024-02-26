import '../styles/main.css';
import { Dispatch, SetStateAction, useState} from 'react';
import { ControlledInput } from './ControlledInput';

interface REPLInputProps{
  //history : string[];
  //setHistory: Dispatch<SetStateAction<string[]>>

  //new shit
  commandHistory : {command : string, result : string}[];
  setCommandHistory : Dispatch<SetStateAction<{command : string, result : string}[]>>;

  useBrief : boolean;
  setUseBrief : Dispatch<SetStateAction<boolean>>;
  // TODO: Fill this with desired props... Maybe something to keep track of the submitted commands
}
// You can use a custom interface or explicit fields or both! An alternative to the current function header might be:
// REPLInput(history: string[], setHistory: Dispatch<SetStateAction<string[]>>)
export function REPLInput(props : REPLInputProps) {
    // Remember: let React manage state in your webapp. 
    // Manages the contents of the input box
    const [commandString, setCommandString] = useState<string>('');
    //const [brief, setBrief] = useState<boolean>(true);
    // TODO WITH TA : add a count state
    
    // TODO WITH TA: build a handleSubmit function called in button onClick
    // TODO: Once it increments, try to make it push commands... Note that you can use the `...` spread syntax to copy what was there before
    // add to it with new commands.
    /**
     * We suggest breaking down this component into smaller components, think about the individual pieces 
     * of the REPL and how they connect to each other...
     */
    function handleSubmit(commandString : string) {
      
      const toAddCommand = {command : commandString, result : getOutput(commandString)};

      props.setCommandHistory([...props.commandHistory, toAddCommand]);

      setCommandString("");
    }

    function getOutput(command : string) : string {
      //maybe a placeholder until user story 6 where we'll have a dictionary that takes a command and maps 
      //it to a function (or class ???, idk im confused) that has the function it corresponds to. This 
      //function should also return a string

    if (command == "mode") {
      props.setUseBrief(!props.useBrief);
      if (props.useBrief) {
        return "mode set to verbose";
      } else {
        return "mode set to brief"
      }
    }
    return ""; //perhaps we can consider using the return of an enpty string as an error (not sure if we should 
    //consider a developer wantinng their command to be an empty string "")
    }

    return (
        <div className="repl-input">
            {/* This is a comment within the JSX. Notice that it's a TypeScript comment wrapped in
            braces, so that React knows it should be interpreted as TypeScript */}
            {/* I opted to use this HTML tag; you don't need to. It structures multiple input fields
            into a single unit, which makes it easier for screenreaders to navigate. */}
            <fieldset>
              <legend>Enter a command:</legend>
              <ControlledInput value={commandString} setValue={setCommandString} ariaLabel={"Command input"}/>
            </fieldset>
            {/* TODO WITH TA: Build a handleSubmit function that increments count and displays the text in the button */}
            {/* TODO: Currently this button just counts up, can we make it push the contents of the input box to the history?*/}
            <button onClick={() => handleSubmit(commandString)}>Submit</button>
        </div>
    );
  }