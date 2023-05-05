import {useState} from "react";
import ModalUpdateOrDelete from "./components/ModalUpdateOrDelete";
import {getWords} from "../../shared/api/word";
import ModalCreateFn from "./components/ModalCreate";
import ModalGetByPeriodFn from "./components/ModalGetByPeriod";


const Body = ({token}) => {
    const [words, setWords] = useState([])
    const [word, setWord] = useState(null)
    const [openForm, setOpenForm] = useState("")


    const handleGetWords = async () => {

        const response = await getWords();
        if (response.status === 'success' && response.data.words) {
            setWords(response.data.words)
        } else if (response.status === 'success' && !response.data.words) {
            setWords(null)
        }
        setOpenForm("openGet")
    }

    const handleCreateWord = async () => {
        setOpenForm("openCreate")
    }

    const handleGetWordsByPeriod = async () => {

        setOpenForm("openGetByPeriod")
    }


    return (
        <div className="body_form">
                {token && <>
                    <h2>Success register!</h2>
                    <button onClick={handleGetWords}>Get All Words</button>
                    <button onClick={handleGetWordsByPeriod}>Get words By period</button>
                    <button onClick={handleCreateWord}>Add Word</button>

                    {words && (
                        <ul>
                            {words.map(word => (
                                <li key={word.id}>
                                    <button onClick={() => setWord(word)}>{word.word} - {word.translate}</button>
                                </li>
                            ))}
                        </ul>
                    )}
                    {!words && <div>List of words empty</div>}

                    {word && <ModalUpdateOrDelete onClose={() => setWord(null)} onRefreshList={handleGetWords} word={word} onOpen={() => setOpenForm(null)}/>}
                    {words && openForm === "openGetByPeriod" && <ModalGetByPeriodFn onClose={() => setOpenForm(null)} setWords={setWords}/>}
                    {openForm === "openCreate" && <ModalCreateFn onClose={() => setOpenForm(null)} onRefreshList={handleGetWords}/>}
                </>}
            {!token && <h2>Lox, quickly register on this ass site</h2>}
        </div>
    )
}

export default Body;