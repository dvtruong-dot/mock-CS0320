/**
 * Class that holds how a CSV may be formatted when parsed through a CSV parser
 *
 * It also holds the functionality to access mock search queries and to view the CSV data
 */
export class mockedCSV {
  private data: string[][];
  private queries: Map<string, string[][]> = new Map();
  private headers: boolean = false;

  /**
   * The constructor for this class. It fills in the 'data' field of this class with inputted data into the argument
   * @param data the data of the CSV we're trying to mock in the form of a list of list of strings
   */
  public constructor(data: string[][]) {
    this.data = data;
  }

  /**
   * Adds queries into this mockedData class for access when mocking searches
   * @param query the query to mock for searching the data
   * @param response the response that the desired query should return
   */
  registerQuery(query: string, response: string[][]) {
    this.queries.set(query, response);
  }

  /**
   * Returns a mocked search results from the queries that exist within this mockedData object
   * @param query the desired query to search
   * @returns an empty string if the query doesn't exist, but otherwise the response within the queries HashMap
   */
  search(query: string): string[][] {
    const response = this.queries.get(query);
    if (!response) {
      return [];
    } else {
      return response;
    }
  }

  /**
   * Allows one to view the data within this object in a list of list of strings
   * @returns the data within this mockedData object
   */
  view(): string[][] {
    return this.data;
  }

  /**
   * A setter method for the headers field
   * @param headers the boolean to set the headers field in this class to
   */
  setHeaders(headers: boolean) {
    this.headers = headers;
  }
}
