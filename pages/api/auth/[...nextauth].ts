import { getUsers, updateUser } from "@/lib/db";
import clientPromise from "@/lib/mongodbadapter";
import { User } from "@/lib/types";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { ObjectId } from "mongodb";
import NextAuth, { AuthOptions } from "next-auth"
import DiscordProvider from "next-auth/providers/discord";
import GitHubProvider from "next-auth/providers/github";

export const authOptions: AuthOptions = {
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        DiscordProvider({
            clientId: process.env.DISCORD_CLIENT_ID!,
            clientSecret: process.env.DISCORD_CLIENT_SECRET!
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!
        })
    ],
    callbacks: {
        async signIn({user, account, profile, email, credentials}) {
            console.log(user);
            let u = user as User;

            console.log("User signed in. User: " + u.name);

            u.dataVersion ??= 0;
            if(u.dataVersion != process.env.USER_DATA_VERSION as unknown as number) {
                try {
                    console.log("Updating user data from version: " + u.dataVersion + "...");
                    
                    u.dataVersion ??= 0;
                    u._id ??= new ObjectId(u.id);

                    //Initialize user data
                    updateUser(u, {
                        $set: {
                            _id: u._id,
                            posts: u.posts ?? [],
                            dataVersion: process.env.USER_DATA_VERSION as unknown as number
                        },
                    });
                }
                catch(e) {
                    console.error(e);
                }
            }

            return true;
        }
    }
}

const authHandler = NextAuth(authOptions);

export default async function handler(...params: any[]) {
    await authHandler(...params);
}