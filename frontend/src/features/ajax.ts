import { AjaxError } from 'rxjs/ajax'
import { catchError } from 'rxjs/operators'
import dlv from 'dlv'
import { Observable, of } from 'rxjs'
import { UserActions } from './user/actionTypes'
import { UserMsg } from './user/types'
import { AlertMsg } from './alerts/types'
import { AlertActions } from './alerts/actionTypes'
import { AlertType } from './alerts/alert.interface'
import { getAlertId } from './alerts'

export interface ActionShape<T extends string> {
  type: T
}
export interface ActionWithPayload<T extends string, P> extends ActionShape<T> {
  payload: P
}

function stripGenericAjax(input: string) {
  if (typeof input === 'string' && input.match(/ajax error (\d){3}/)) {
    return 'Ajax Error'
  }
  return input
}

function replaceMessage(message: string, params = []) {
  let index = 0
  return message.replace(/%(\d)/g, () => {
    const val = params[index]
    index += 1
    return val
  })
}

function replaceMessageObject(message: string, params: any = {}) {
  return Object.keys(params).reduce((acc, key) => {
    return acc.replace(new RegExp(`%${key}`, 'g'), params[key])
  }, message)
}

export function extractError(err: AjaxError): string {
  const message =
    dlv(err, 'response.message') || dlv(err, 'message', 'Rest API error')
  const params = dlv(err, 'response.parameters')
  let output = (() => {
    if (params) {
      if (Array.isArray(params)) {
        return replaceMessage(message, params as any)
      }
      return replaceMessageObject(message, params as any)
    }
    switch (message) {
      case 'ajax error':
        return 'Something went wrong, please try again'
      default:
        return message
    }
  })()

  const transforms = [stripGenericAjax]

  if (typeof output === 'object') {
    output = output.join(', ')
  }

  return transforms.reduce((acc, item) => item(acc), output)
}

export function catchable(fn: (...args: any) => ActionWithPayload<any, any>) {
  return catchError(
    (err: AjaxError): Observable<any> => {
      return of(fn(extractError(err)))
    }
  )
}

export function catchableAlert(
  fn: (...args: any) => ActionWithPayload<any, any>
) {
  return catchError(
    (err: AjaxError): Observable<any> => {
      return of(
        fn(extractError(err)),
        AlertMsg(AlertActions.SetAlert, {
          type: AlertType.ERROR,
          text: extractError(err),
          duration: 5000,
          id: getAlertId(),
        })
      )
    }
  )
}

export function catchableSignOut(
  fn: (...args: any) => ActionWithPayload<any, any>
) {
  return catchError(
    (err: AjaxError): Observable<any> => {
      const errorAsString = extractError(err)

      switch (err.status) {
        case 401: {
          return of(
            fn(errorAsString),
            UserMsg(UserActions.Logout),
            AlertMsg(AlertActions.SetAlert, {
              text: `You've been logged out`,
              type: AlertType.WARNING,
              id: getAlertId(),
            })
          )
        }
        default: {
          return of(fn(errorAsString))
        }
      }
    }
  )
}

export function catchableSignOutObservable(
  fn: (error: string, err: AjaxError) => Observable<ActionWithPayload<any, any>>
) {
  return catchError(
    (err: AjaxError): Observable<any> => {
      const errorAsString = extractError(err)

      switch (err.status) {
        case 401: {
          return of(fn(errorAsString, err), { type: UserActions.Logout })
        }
        default: {
          return fn(errorAsString, err)
        }
      }
    }
  )
}
