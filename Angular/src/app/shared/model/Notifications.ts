export interface Notifications{
     noteId: number;
    triggeredId: number;
    targetId: number;
    postId: number;
    type: string;
    read: boolean;
    date: Date;
}