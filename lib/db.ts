import { Collection, Db, ObjectId, UpdateFilter, WithId } from "mongodb";
import clientPromise from "./mongodbadapter";
import { DisplayedPost, Post, User } from "./types";
import { Session } from "next-auth";
import { getDisplayedPostFromPost } from "./utils";

async function getDB(): Promise<Db> {
    return (await clientPromise).db();
}

export async function getUsers(): Promise<Collection<User>> {
    return (await getDB()).collection("users");
}

export async function getPosts(): Promise<Collection<Post>> {
    return (await getDB()).collection("posts");
}

export async function getUserById(_id: ObjectId): Promise<WithId<User> | null> {
    const users = await getUsers();

    const user = await users.findOne({ _id });

    return user ?? null;
}

export async function getUserByEmail(email: string): Promise<WithId<User> | null> {
    const users = await getUsers();

    const user = await users.findOne({ email });

    return user ?? null;
}

export async function getUserBySession(session: Session) : Promise<WithId<User> | null> {
    return await getUserByEmail(session?.user?.email!);
}

export async function updateUser(user: User, update: UpdateFilter<User> | Partial<User>) {
    await getUsers().then(async users => {
        users.updateOne({ _id: user._id }, update);
    });
}

export async function addPost(post: Post) {
    await getPosts().then(async posts => {
        posts.insertOne(post);
    });
}

export async function getDisplayedPosts(): Promise<DisplayedPost[]> {
    const posts = await getPosts();

    const displayedPosts = await posts.find().sort({ time: -1 }).limit(20).toArray();
    const clientPosts: DisplayedPost[] = [];

    for(let i = 0; i < displayedPosts.length; i++) {
        clientPosts.push(getDisplayedPostFromPost(displayedPosts[i]));
    }

    return clientPosts;
}