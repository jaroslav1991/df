import {getCookieValue} from "../utils/utils";
import {useEffect, useState} from "react";
import Modal from "../ui/Buttons";

const apiUrlGetWords = "http://127.0.0.1:8080/api/get-words"



const GetAllWords = () => {

    const [words, setWords] = useState([]);
    const [modalActive, setModalActive] = useState(false)
    const [selectedWord, setSelectedWord] = useState([])

    const getModalActive =() => {
        setModalActive(true)
        setSelectedWord(() =>({
            word: words.word,
            translate: words.translate
        }));
    }

    useEffect(() => {
        const request = {
            token: getCookieValue("token")
        }

        fetch(apiUrlGetWords, {
            method: "POST",
            body: JSON.stringify(request)
        })
            .then(response => {
                return response.json().then(r => {
                    if (response.status === 200) {
                        if (r.words) {
                            setWords(r.words.map(word => ({
                                id: word.id,
                                word: word.word,
                                translate: word.translate,
                            })));
                        }
                        console.log(r.words)
                    } else {
                        console.log(r.error);
                    }
                });
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <main>
            <div className="buttons_form">
                {words.length > 0 && (
                    <ul>
                        {words.map(word => (
                            <button onClick={getModalActive} key={word.id}>{word.word} - {word.translate}</button>
                            ))}
                    </ul>
                )}
                {modalActive && <Modal active={modalActive} setActive={setModalActive} selectedWord={selectedWord}/>}
            </div>
        </main>

    );
}

export default GetAllWords;