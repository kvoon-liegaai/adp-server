export class CreateMessageDto {
  userId: number
  targetUserId?: number
  chatId?: number
  content: string
  messageType: 'text'
}
