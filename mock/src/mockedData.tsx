export class MockedData {
  private data: string[][];
  private queries: Map<string, string[][]> = new Map();

  //i'm not sure if this is good or not, but it's gonna default to false
  private headers: boolean = false;

  public constructor(data: string[][]) {
    this.data = data;
  }

  registerQuery(query: string, response: string[][]) {
    this.queries.set(query, response);
  }

  search(query: string): string[][] {
    const response = this.queries.get(query);
    if (!response) {
      return [];
    } else {
      return response;
    }
  }

  view(): string[][] {
    return this.data;
  }

  setHeaders(headers : boolean) {
    this.headers = headers;
  }
}
