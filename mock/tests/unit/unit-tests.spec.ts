/*
  Unit tests for our program
*/

import { expect, test } from "vitest";
import { CommandProcessor } from "../../src/command";

test("test command register and process", () => {
  const commandProcessor = new CommandProcessor();
  commandProcessor.registerCommand("thingy", () => {
    return "mabob";
  });
  expect(commandProcessor.processCommand("thingy")).toBe("mabob");
});

test("test processing unknown command", () => {
  const commandProcessor = new CommandProcessor();
  commandProcessor.registerCommand("thingy", () => {
    return "mabob";
  });
  expect(commandProcessor.processCommand("bingbong")).toBe(
    "Command 'bingbong' not found."
  );
});
