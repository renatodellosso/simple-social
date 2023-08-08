import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { isHTML } from "@/lib/utils";
import { Post, User } from "@/lib/types";
import { ObjectId } from 'mongodb';
import { addPost, getUserByEmail, getUserBySession, updateUser } from "@/lib/db";

type PostResponseData = {
    text: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<PostResponseData>) {
    const session = await getServerSession(req, res, authOptions);
    const data = JSON.parse(req.body) as { text: string };

    console.log(`Attempting post: ${data.text} by ${session?.user?.name}`);

    if(!session) {
        res.status(401).json({ text: "Not signed in." });
    } else {
        const user = await getUserBySession(session);
        if(user) {
            if(!isHTML(data.text)) {
                console.log(`Posting: ${data.text} by ${user.name}`);

                let post: Post = {
                    _id: new ObjectId(),
                    author: new ObjectId(user?.id),
                    authorName: user?.name!,
                    authorAvatar: user?.image!,
                    time: Date.now(),
                    text: data.text,
                };

                addPost(post);
                updateUser(user, {
                    $push: {
                        posts: post._id
                    }
                });

                res.status(200).json({ text: "Posted!" });
            } else {
                res.status(402).json({ text: "Unsafe input." });
            }
        } else {
            res.status(401).json({ text: "Not signed in." });
        }
    }

    return;
}