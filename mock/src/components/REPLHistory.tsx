import { resourceLimits } from "worker_threads";
import "../styles/main.css";

interface REPLHistoryProps {
  // TODO: Fill with some shared state tracking all the pushed commands
  //history : string[];

  commandHistory: { command: string; result: string | string[][] }[];
  useBrief: boolean;
}

function constructTable(data: string[][]): JSX.Element {
  const rows = data.map((row: string[], rowIndex: number) => (
    <tr key={rowIndex}>
      {row.map((item: string, itemIndex: number) => (
        <td key={itemIndex}>{item}</td>
      ))}
    </tr>
  ));

  // Construct the HTML table
  return <table>{rows}</table>;
}

export function REPLHistory(props: REPLHistoryProps) {
  function returnHistory() {
    if (props.useBrief) {
      return props.commandHistory.map((command, index) =>
        typeof command["result"] === "string" ? (
          <p> {command["result"]}</p>
        ) : (
          constructTable(command["result"])
        )
      );
    } else {
      return props.commandHistory.map((command, index) =>
        typeof command["result"] === "string" ? (
          <p>
            <pre>
              {" "}
              {"command: " +
                command["command"] +
                "\n" +
                "result: " +
                command["result"]}
            </pre>{" "}
          </p>
        ) : (
          <p>
            <pre>
              {" "}
              {"command: " +
                command["command"] +
                "\n" +
                "result: "}
            </pre>{" "}
            {constructTable(command["result"])}
          </p>
        )
      );
    }
  }
  return (
    <div className="repl-history">
      {/* This is where command history will go */}
      {/* TODO: To go through all the pushed commands... try the .map() function! */}
      {
        //props.history.map((command, index) => (<p> {command} </p>))
        returnHistory()
      }
    </div>
  );
}
