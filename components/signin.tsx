import { signIn, signOut } from "next-auth/react"

export default function SignIn({ session }) {
    if(!session) {
        return <button onClick={()=>signIn()}>
            Sign In
        </button>
    }
    else {
        return <button onClick={()=>signOut()}>
            Sign Out
        </button>
    }
}