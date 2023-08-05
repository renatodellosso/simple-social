import SignIn from "./signin";

export default function Navbar({ session }) {
    return (
        <div className="navbar">
            <SignIn session={session}/>
        </div>
    )
}