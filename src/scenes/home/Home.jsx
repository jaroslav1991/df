import {useState} from "react";
import Header from "../../components/header/Header";
import Body from "../../components/body/Body";


const Home = () => {
    let [token, setToken] = useState(localStorage.getItem("token"))

    const onLogout = () => {
      document.cookie = "token=";
      localStorage.setItem("token", "");
      setToken(null);
    }

    return (
        <div>
            <Header token={token} setToken={setToken} onLogout={onLogout}/>
            <Body token={token} />
        </div>
    );
};

export default Home;
