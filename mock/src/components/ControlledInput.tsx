import "../styles/main.css";
import { Dispatch, SetStateAction } from "react";

interface ControlledInputProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  ariaLabel: string;
}

/**
 * An input box for our REPL
 * @param value the text input
 * @param setValue function to set text input
 * @param ariaLabel the name of the input box
 * @returns the input box
 */
export function ControlledInput({
  value,
  setValue,
  ariaLabel,
}: ControlledInputProps) {
  return (
    <input
      type="text"
      className="repl-command-box"
      value={value}
      placeholder="Enter command here!"
      onChange={(ev) => setValue(ev.target.value)}
      aria-label={ariaLabel}
    ></input>
  );
}
