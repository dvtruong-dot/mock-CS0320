import { MockedData } from "../src/mockedData";

export const dataMap = new Map<string, MockedData>();

const file1_headers = new MockedData([
  ["header1", "header2", "header3"],
  ["1", "2", "3"],
  ["4", "5", "6"],
]);
file1_headers.registerQuery("header1 4", [["4", "5", "6"]]);
file1_headers.registerQuery("1 2", [["1", "2", "3"]]);
file1_headers.registerQuery("header3 3", [["1", "2", "3"]]);

//
const file1_noheaders = new MockedData([
  ["1", "2", "3"],
  ["4", "5,", "6"],
]);
file1_headers.registerQuery("1 1", [["1", "2", "3"]]);
file1_headers.registerQuery("2 6", [["4", "5", "6"]]);

//inconsistent column (not sure if this should be a case to have for this assignment)
const file_inconsistent_columns = new MockedData([
  ["header1", "header2", "header3"],
  ["1", "2", "3"],
  ["4", "5"],
]);

//set the map for all available datasets
dataMap.set("file1_headers", file1_headers);
dataMap.set("file1_noheaders", file1_noheaders);
dataMap.set("file_inconsistent_columns", file_inconsistent_columns);
