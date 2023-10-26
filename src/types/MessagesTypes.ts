export interface MessageObjType {
    id: number
    dateTime: string
    messageText: string
    fromUserName: string
    toUserName: string
}


export interface PostMessageObjType {
    messageText: string
    fromUserId: string
    toUserId: string
}
