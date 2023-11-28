export interface Notifications {
    id: number;
    fromUserId: number;
    toUserId: number;
    notificationType: number;
    status: number;
    message: string;
    channelName: string;
    isLiveStream: boolean;
    coachName: string;
    coachProfilePhoto: string;
    timeStamp: Date;
}