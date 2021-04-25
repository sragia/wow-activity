/* eslint class-methods-use-this: ["error", { "exceptMethods": ["fetch"] }] */

import axios, { Method } from 'axios'

const ENDPOINT = process.env.REACT_APP_API_ENDPOINT

class Api {
  register(email: string, username: string, password: string) {
    return this.fetch(
      'auth/register',
      {
        email,
        username,
        password,
      },
      'POST'
    )
  }

  login(username: string, password: string) {
    return this.fetch(
      'auth/login',
      {
        username,
        password,
      },
      'POST'
    )
  }

  fetch(
    uri: string,
    payload: { [index: string]: any },
    method: Method = 'GET'
  ) {
    return axios({
      url: `${ENDPOINT}${uri}`,
      method,
      data: payload,
    })
  }
}

export default new Api()
