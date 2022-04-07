import { HttpPostParams } from '@/data/protocols';
import axios from 'axios';

class AxiosHttpClient {
  async post(params: HttpPostParams<any>): Promise<void> {
    await axios(params.url);
  }
}

export { AxiosHttpClient };

