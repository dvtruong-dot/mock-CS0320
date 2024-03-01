import { resourceLimits } from "worker_threads";
import "../styles/main.css";

/**
 * The props of the REPL history. It includes the command history (along with their respective
 * results) and a boolean that indicates whether to display command information briefly or more
 * verbosely.
 */
interface REPLHistoryProps {
  commandHistory: { command: string; result: string | string[][] }[];
  useBrief: boolean;
}

/**
 * Helper function for REPLHistory that converts a list of list of strings into 
 * an HTML table to be displayed
 * @param data the data that we want to be display in the form of a list of list 
 * of strings
 * @returns a Javascript element that is in the form of an HTML table
 */
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

/**
 * A function that controls what is displayed in the history portion of the site
 * @param props the props of REPL History. Read REPLHistoryProps in this class for more information
 * @returns a Javascript element that controls what is displayed in the history portionn of the site 
 */
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
      {
        returnHistory()
      }
    </div>
  );
}
