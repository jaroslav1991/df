import {useEffect, useState} from "react";
import GetWords from "../buttons/GetWords";


const Body = (props) => {
    let [words, setWords] = useState(false)

    const handleGetWords = () => {
        setWords(true)
    }

    useEffect(() => {
        props.setTkn(localStorage.getItem("token"))
    })

    if (props.tkn) {
        return (
            <main>
                <h2>Success register!</h2>
                <button onClick={handleGetWords}>GetAllWords</button>
                {words === true && <GetWords/>}
            </main>
        );
    } else if (!props.tkn) {
        return (
            <main>
            <h2>Lox, quickly register on this ass site</h2>
            </main>
        );
    }
}

export default Body;