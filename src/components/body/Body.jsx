import {useState} from "react";
import ModalUpdateOrDelete from "./components/ModalUpdateOrDelete";
import {getWords} from "../../shared/api/api";
import ModalCreateFn from "./components/ModalCreate";


const Body = ({token}) => {
    const [words, setWords] = useState([])
    const [word, setWord] = useState(null)
    const [openForm, setOpenForm] = useState("")


    const handleGetWords = async () => {

        const response = await getWords();
        if (response.status === 'success') {
            setWords(response.data.words)
        }
        setOpenForm("openGet")
    }

    const handleCreateWord = async () => {
        setOpenForm("openCreate")
    }

    return (
        <div className="body_form">
                {token && <>
                    <h2>Success register!</h2>
                    <button onClick={handleGetWords}>Get All Words</button>
                    <button onClick={handleCreateWord}>Add Word</button>

                    {words.length > 0 && (
                        <ul>
                            {words.map(word => (
                                <li key={word.id}>
                                    <button onClick={() => setWord(word)}>{word.word} - {word.translate}</button>
                                </li>
                            ))}
                        </ul>

                    )}

                    {word && <ModalUpdateOrDelete onClose={() => setWord(null)} onRefreshList={handleGetWords} word={word}/>}
                    {openForm === "openCreate" && <ModalCreateFn onClose={() => setOpenForm(null)} onRefreshList={handleGetWords}/>}
                </>}
            {!token && <h2>Lox, quickly register on this ass site</h2>}
        </div>
    )
}

export default Body;