import { REPLFunction } from "./components/REPLFunction";

export class CommandProcessor {
  private commands: Map<string, REPLFunction> = new Map();

  registerCommand(name: string, func: REPLFunction) {
    this.commands.set(name, func);
  }

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
