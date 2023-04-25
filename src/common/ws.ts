export enum ReturnCode {
  success = 0,
  fail = 1,
  error = 2,
}

export interface WsRes {
  code: number
  message: string
  data?: any
}

// 资源请求消息

export const helpResourceApplyMsgState = {
  PENDING: 0, // 待处理
  FULFILLED: 1, // 接收
  REJECTED: 2, // 拒绝
}

export type HelpResourceReqMsgStatus = typeof helpResourceApplyMsgState[keyof typeof helpResourceApplyMsgState]