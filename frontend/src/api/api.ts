/* eslint class-methods-use-this: ["error", { "exceptMethods": ["fetch"] }] */

import { Method } from 'axios'
import { ajax } from 'rxjs/ajax'

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

  profile(username: string) {
    return this.fetch(`profile/${username}`)
  }

  fetch(
    uri: string,
    payload?: { [index: string]: any },
    method: Method = 'GET'
  ) {
    return ajax({
      url: `${ENDPOINT}${uri}`,
      method,
      withCredentials: true,
      ...(payload ? { body: payload } : null),
    })
  }
}

export default new Api()
