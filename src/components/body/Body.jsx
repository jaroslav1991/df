import {useState} from "react";
import Modal from "./components/Modal";
import {getWords} from "../../shared/api/api";


const Body = ({token}) => {
    const [words, setWords] = useState([])
    const [word, setWord] = useState(null)


    const handleGetWords = async () => {
        const response = await getWords();
        if (response.status === 'success') {
            setWords(response.data.words)
        }
    }

    return (
        <main>
            {token && <>
                <h2>Success register!</h2>
                <button onClick={handleGetWords}>Get All Words</button>
                {words.length > 0 && (
                    <ul>
                        {words.map(word => (
                            <li key={word.id}>
                                <button onClick={() => setWord(word)}>{word.word} - {word.translate}</button>
                            </li>
                        ))}
                    </ul>
                )}
                {word && <Modal onClose={() => setWord(null)} onRefreshList={handleGetWords} word={word}/>}
            </>}
            {!token && <h2>Lox, quickly register on this ass site</h2>}
        </main>
    )
}

export default Body;