import { REPLFunction } from "./components/REPLFunction";

/**
 * Class to process registering and handling commands.
 */
export class CommandProcessor {
  private commands: Map<string, REPLFunction> = new Map();

  /**
   * Registers a given command in the 'commands' map for future use
   * @param name the name of the command
   * @param func the command handler
   */
  registerCommand(name: string, func: REPLFunction) {
    this.commands.set(name, func);
  }

  /**
   * Finds the appropriate command handler and runs it
   * @param command the command to run
   * @returns The result of the command
   */
  processCommand(command: string): string | string[][] {
    const [commandName, ...args] = command.trim().split(" ");

    const commandFunc = this.commands.get(commandName);

    if (commandFunc) {
      return commandFunc(args);
    } else {
      return "Command '" + commandName + "' not found.";
    }
  }
}
