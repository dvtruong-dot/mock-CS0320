export class MockedData {
  private data: string[][];
  private queries: Map<string, string[][]> = new Map();

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
}
