export enum ReturnCode {
  success = 0,
  fail = 1,
  error = 2,
}

export interface WsRes {
  code: number
  message: string
}
