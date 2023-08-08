import { ObjectId, Document } from "mongodb";
import { DefaultUser } from "next-auth";

export interface User extends DefaultUser {
    _id: ObjectId
    dataVersion: number
    posts: ObjectId[] | null
}

export interface Post extends Document {
    author: ObjectId,
    authorName: string,
    authorAvatar: string,
    time: number,
    text: string
}

export interface DisplayedPost {
    authorName: string,
    authorAvatar: string,
    time: number,
    text: string
}