import Header from "../components/header/Header";
import Body from "../components/body/Body";
import {useState} from "react";

const App = () => {
    let [tkn, setTkn] = useState("")

    return (
        <div>
            <Header setTkn={setTkn}/>
            <Body tkn={tkn} setTkn={setTkn}/>
        </div>
    );
};

export default App;