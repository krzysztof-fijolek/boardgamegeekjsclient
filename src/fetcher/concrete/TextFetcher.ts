import { IFetcher } from '../interface';
import fetch from 'isomorphic-unfetch';

export class TextFetcher implements IFetcher<string, string> {
  apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async doFetch(query: string): Promise<string> {
    let response = await this.internalFetch(query);

    while (response.status === 202) {
      await this.delay(6000);

      response = await this.internalFetch(query);
    }

    return response.text();
  }

  async internalFetch(query: string): Promise<any> {
    const response = await fetch(query, {
      headers: {
        Authorization: 'Bearer ' + this.apiKey,
      },
    });

    return response;
  }
  async delay(waitFor: number): Promise<any> {
    return new Promise((resolve) => {
      setTimeout(resolve, waitFor);
    });
  }
}
