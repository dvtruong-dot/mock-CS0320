import { resourceLimits } from 'worker_threads';
import '../styles/main.css';

interface REPLHistoryProps{
    // TODO: Fill with some shared state tracking all the pushed commands
    //history : string[];

    commandHistory : {command : string, result : string, brief : boolean}[];
    useBrief : boolean;
}
export function REPLHistory(props : REPLHistoryProps) {
    function returnHistory() {
        return props.commandHistory.map((command,index) => 
        {if (command["brief"]) {
            return <p>{command["result"]}</p>;
        } else {
            return <p><pre>{"command: " + command["command"] + "\n" + "result: " + command["result"]}</pre></p>;
        }});
    }
    return (
        <div className="repl-history">
            {/* This is where command history will go */}
            {/* TODO: To go through all the pushed commands... try the .map() function! */}
            {//props.history.map((command, index) => (<p> {command} </p>))
            returnHistory()}
        </div>
    );
}