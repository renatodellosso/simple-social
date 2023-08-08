import Avatar from "./avatar";
import SignIn from "./signin";
import ThemeSelect from "./themeselect";

export default function Navbar({ session, theme }) {
    return (
        <div className="navbar">
            { session ? 
                <Avatar image={session.user.image} theme={theme}/>
                : ""
            }
            <SignIn session={session}/>
            <ThemeSelect/>
        </div>
    )
}