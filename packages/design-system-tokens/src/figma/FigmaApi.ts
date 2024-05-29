import axios from 'axios';
import {
  GetLocalVariablesResponse,
  PostVariablesRequestBody,
  PostVariablesResponse,
} from '@figma/rest-api-spec';

export default class FigmaApi {
  private baseUrl = 'https://api.figma.com';
  private token: string;

  constructor(token: string) {
    this.token = token;
  }

  async getLocalVariables(fileKey: string) {
    const resp = await axios.request<GetLocalVariablesResponse>({
      url: `${this.baseUrl}/v1/files/${fileKey}/variables/local`,
      headers: {
        Accept: '*/*',
        'X-Figma-Token': this.token,
      },
    });

    return resp.data;
  }

  async postVariables(fileKey: string, payload: PostVariablesRequestBody) {
    const resp = await axios.request<PostVariablesResponse>({
      url: `${this.baseUrl}/v1/files/${fileKey}/variables`,
      method: 'POST',
      headers: {
        Accept: '*/*',
        'X-Figma-Token': this.token,
      },
      data: payload,
    });

    return resp.data;
  }
}
