import { UserActions } from './actionTypes'
import {
  LoginErrorResponse,
  LoginRequest,
  LoginResponse,
  RegisterErrorResponse,
  RegisterRequest,
  User,
} from './entities'

interface LoginSuccessAction {
  type: typeof UserActions.LoginSuccess
  payload: LoginResponse
}

interface LoginAction {
  type: typeof UserActions.Login
  payload: LoginRequest
}

interface LoginErrorAction {
  type: typeof UserActions.LoginError
  payload: LoginErrorResponse
}

interface RegisterAction {
  type: typeof UserActions.Register
  payload: RegisterRequest
}

interface RegisterSuccessAction {
  type: typeof UserActions.RegisterSuccess
  payload: LoginResponse
}

interface RegisterErrorAction {
  type: typeof UserActions.RegisterError
  payload: RegisterErrorResponse
}

interface GetUserAction {
  type: typeof UserActions.GetUser
  payload: null
}

interface SetUserAction {
  type: typeof UserActions.SetUser
  payload: User
}

export type UserActionTypes =
  | LoginSuccessAction
  | LoginAction
  | LoginErrorAction
  | RegisterAction
  | RegisterErrorAction
  | RegisterSuccessAction
  | GetUserAction
  | SetUserAction

export interface SystemState {
  user: {
    user: User
  }
}
