import { METRIC_ENDPOINT } from '../config/endpoints'

export default class AppFocusedService {

  server = process.env.SRV;

  postResource = async (query) => {
    const res = await fetch(`${this.server}${METRIC_ENDPOINT}`, {
      method: "POST",
      headers: {
        'Content-Type': 'text/plain;charset=UTF-8'
      },
      body: query,
    });

    if (!res.ok) {
      throw new Error(`Could not fetch ${this.server}${METRIC_ENDPOINT}, received ${res.status}`);
    }
    return await res.json();
  };

  getData = async (query) => {
    const res = await this.postResource(query);
    return res.results;
  };
}
