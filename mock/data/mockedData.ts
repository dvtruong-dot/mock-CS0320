import { mockedCSV } from "../src/mockedCSV";

/**
 * This class holds all of the mocked data for front-end testing purposes.
 * It exports a map containing the data, which is stored in mockedCSV objects.
 */
export const dataMap = new Map<string, mockedCSV>();

//Normal file with headers
const file1_headers = new mockedCSV([
  ["header1", "header2", "header3"],
  ["1", "2", "3"],
  ["4", "5", "6"],
]);
file1_headers.registerQuery("header1 4", [["4", "5", "6"]]);
file1_headers.registerQuery("1 2", [["1", "2", "3"]]);
file1_headers.registerQuery("header3 3", [["1", "2", "3"]]);

//Normal file with no headers
const file1_noheaders = new mockedCSV([
  ["1", "2", "3"],
  ["4", "5,", "6"],
]);
file1_headers.registerQuery("1 1", [["1", "2", "3"]]);
file1_headers.registerQuery("2 6", [["4", "5", "6"]]);

//inconsistent column
const file_malformed = new mockedCSV([
  ["header1", "header2", "header3"],
  ["1", "2", "3"],
  ["4", "5"],
]);

//one column
const one_column = new mockedCSV([["1"], ["2"], ["3"]]);
one_column.registerQuery("0 3", [["3"]]);

//one row
const one_row = new mockedCSV([["1, 2, 3, 4, 5"]]);
one_row.registerQuery("3 4", [["1, 2, 3, 4, 5"]]);

//set the map for all available datasets
dataMap.set("file1_headers", file1_headers);
dataMap.set("file1_noheaders", file1_noheaders);
dataMap.set("file_malformed", file_malformed);
dataMap.set("file_one_column", one_column);
dataMap.set("file_one_row", one_row);
