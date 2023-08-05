import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

type PostResponseData = {
    text: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<PostResponseData>) {
    const session = await getServerSession(req, res, authOptions);
    const data = JSON.parse(req.body) as { text: string };

    console.log(`New Post: ${data.text} by ${session?.user?.name}`);

    if(!session) {
        res.status(401).json({ text: "Not signed in." });
        return;
    } else {
        res.status(200).json({ text: "Posted!" });
        return;
    }
}