export enum AlertType {
  ERROR = 'error',
  SUCCESS = 'success',
  WARNING = 'warning',
}

export interface IAlert {
  text: string
  type: AlertType
  id: number
  duration?: number
}
