import {useState} from "react";
import SignInForm from "./components/SignInForm";
import SignUpForm from "./components/SignUpForm";

const Header = ({setToken, onLogout, token}) => {
    const [openForm, setOpenForm] = useState("");

    const openSignUpForm = () => {
        setOpenForm("signUp");
    }

    const openSignInForm = () => {
        setOpenForm("signIn");
    }

    const onClose = () => {
        setOpenForm(null);
    }

    return (
        <header>
            <h1>Башка</h1>
            <div className={"header_panel"}>
                {token && <button>Home</button>}
                {token && <button onClick={onLogout}>Logout</button>}
                {!token && <button onClick={openSignUpForm}>SignUp</button>}
                {!token && <button onClick={openSignInForm}>SignIn</button>}
            </div>
            {openForm === "signUp" && <SignUpForm onClose={onClose} />}
            {openForm === "signIn" && <SignInForm onClose={onClose} setToken={setToken}/>}
        </header>
    )
};

export default Header;