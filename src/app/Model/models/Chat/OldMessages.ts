export interface OldMessages {
    id: number,
    fromUserId: number,
    toUserId: number,
    message: any,
    messageType: number,
    isFromDb: boolean,
    status: string,
    createdOn: Date,
    updatedOn: Date,
    viewedOn: Date,
    contentLoaded: boolean
}