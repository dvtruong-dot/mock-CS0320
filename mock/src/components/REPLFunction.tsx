/**
 * Interface representing the structure of a function handling any command
 * from the REPL. It takes in a list of strings and returns either a string
 * or list of list of strings.
 */
export interface REPLFunction {
  (args: string[]): string | string[][];
}
