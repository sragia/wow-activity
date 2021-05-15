import msgCreator, { ActionHandler, ActionTypeMap } from 'action-typed'
import { UserActions } from './actionTypes'
import { LoginRequest, RegisterRequest, User } from './entities'

export const userMessages = {
  [UserActions.GetUser]: () => undefined,
  [UserActions.Init]: () => undefined,
  [UserActions.InitError]: (err: string) => err,
  [UserActions.Login]: (payload: LoginRequest) => payload,
  [UserActions.LoginError]: (err: string) => err,
  [UserActions.LoginSuccess]: (username: string) => username,
  [UserActions.Logout]: () => undefined,
  [UserActions.LogoutSuccess]: () => undefined,
  [UserActions.Register]: (payload: RegisterRequest) => payload,
  [UserActions.RegisterError]: (err: string) => err,
  [UserActions.RegisterSuccess]: () => undefined,
  [UserActions.SetUser]: (user: User) => user,
}

export const UserMsg = msgCreator(userMessages)
export type UserHandler = ActionHandler<typeof userMessages>
export type UserTypeMap = ActionTypeMap<typeof userMessages>

export interface SystemState {
  user: {
    user: User
  }
}
