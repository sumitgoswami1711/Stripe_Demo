import { OldMessages } from "./OldMessages";

export interface ChatPaginationResponse {
    chatMessageList: OldMessages[];
    totalCount: number;
}