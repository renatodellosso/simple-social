import { signIn, signOut } from "next-auth/react"

export default function SignIn({ session }) {
    if(!session) {
        return <button className="btn btn-primary" onClick={()=>signIn()}>
            Sign In
        </button>
    }
    else {
        return <button className="btn" onClick={()=>signOut()}>
            Sign Out
        </button>
    }
}