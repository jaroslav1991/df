import {useState} from "react";
import SignInForm from "./components/SignInForm";
import SignUpForm from "./components/SignUpForm";
import "./styles/header.css"

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
            <div className={"header_panel"}>
                <div className="button_header">
                    {token && <button className="btn_auth" onClick={onLogout}>Logout</button>}
                    {!token && <button className="btn_auth" onClick={openSignUpForm}>SignUp</button>}
                    {!token && <button className="btn_auth" onClick={openSignInForm}>SignIn</button>}
                </div>
            </div>
            {openForm === "signUp" && <SignUpForm onClose={onClose} />}
            {openForm === "signIn" && <SignInForm onClose={onClose} setToken={setToken}/>}
        </header>
    )
};

export default Header;