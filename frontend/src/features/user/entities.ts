export interface LoginResponse {
  expires: string
  expiresPrettyPrint: string
  token: string
}

export interface LoginErrorResponse {
  statusCode: number
  message: string
}

export interface LoginRequest {
  username: string
  password: string
}

export interface RegisterRequest {
  email: string
  username: string
  password: string
}

export interface RegisterErrorResponse {
  statusCode: number
  message: string[]
  error: string
}

export interface User {
  id: number
  username: string
  email: string
  avatar: string
}
