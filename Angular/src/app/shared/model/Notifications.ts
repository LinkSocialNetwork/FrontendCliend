export interface Notifications{
    id: number;
    triggeredId: number;
    targetId: number;
    postId: number;
    type: string;
    read: boolean;
    date: string;
}