import {useState} from "react";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";
import {getCookieValue} from "../utils/utils";

const Header = (props) => {
    const [openForm, setOpenForm] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(getCookieValue("token"));

    const openSignUpForm = () => {
        setOpenForm("signUp");
    }

    const openSignInForm = () => {
        setOpenForm("signIn");
    }

    const closeForm = (token) => {
        localStorage.setItem("token", token)
        setIsLoggedIn(token)
        setOpenForm("");
        props.setTkn(token)
    }

    const handleLogout = () => {
        document.cookie = "token=";
        localStorage.setItem("token", "");
        setIsLoggedIn("");
        props.setTkn("");
    };


    if (isLoggedIn) {
        return (
            <header>
                <h1>Башка</h1>
                <div className={"header_panel"}>
                    <button>Home</button>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </header>
        );
    } else {
        return (
            <header>
                <h1>Башка</h1>
                <div className={"header_panel"}>
                    <button onClick={openSignUpForm}>SignUp</button>
                    <button onClick={openSignInForm}>SignIn</button>
                </div>
                {openForm === "signUp" && <SignUpForm onClose={closeForm}/>}
                {openForm === "signIn" && <SignInForm onClose={closeForm}/>}
            </header>
        );
    }
};

export default Header;