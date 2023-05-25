import ModalChooseTraining from "./ModalChooseTraining";
import {useRef, useState} from "react";
import {createResultOfTraining, createStatistic, getStatistic} from "../../../shared/api/word";

const ModalTrainingFn = ({onClose}) => {
    const [openForm, setOpenForm] = useState(null)
    const [words, setWords] = useState([])
    const [wordsFromUser, setWordsFromUser] = useState({correct_answers: {words: []}, wrong_answers: {words:[]}})
    const [listWords, setListWords] = useState(false)

    const translateRef = useRef([])

    const clickWord = () => {
        setOpenForm("openWordTraining");
    }

    const handlerOnChange = () => {
    }

    const onGetTrainingInfo = async () => {
        const dataCreateTraining = {
            words: {
                words: words.map((word) => ({
                    id: word.id,
                    word: word.word,
                    translate: word.translate
                }))
            },
            answers: {
                words: words.map((word) => ({
                    id: word.id,
                    word: word.word,
                    translate: translateRef.current[word.id].value
                }))
            }
        }
        const responseCreateTraining = await createResultOfTraining(dataCreateTraining);
        if (responseCreateTraining.status === "success") {
            console.log("success:", responseCreateTraining.data.id)
        } else {
            console.log("bad response:", responseCreateTraining.status)
        }
        const dataGetStatistic = {
            training_id: responseCreateTraining.data.id
        }
        const responseGetStatistic = await getStatistic(dataGetStatistic)
        if (responseGetStatistic.status === "success") {
            setWordsFromUser(responseGetStatistic.data)
            console.log(responseGetStatistic.data)
            console.log(responseGetStatistic.data.correct_answers.words)
            console.log(responseGetStatistic.data.wrong_answers.words)
        } else {
            console.log("something wrong")
        }

        const dataForStatistic = {
            training_id: responseCreateTraining.data.id,
            correct_answers: {
                words: responseGetStatistic.data.correct_answers.words
            },
            wrong_answers: {
                words: responseGetStatistic.data.wrong_answers.words
            }
        }
        const responseCreateStatistic = await createStatistic(dataForStatistic)
        if (responseCreateStatistic.status === "success") {
            console.log(responseCreateStatistic.data.id)
        } else {
            console.log("something wrong with create statistic")
        }
    }

    return (
        <div className="modal">
            <div className="modal_content">
                <button className="btn_training" onClick={clickWord}>Training with words</button>
                <button className="btn_training">Training with translate</button>
                <button className="btn_training" onClick={onClose}>Close</button>
                {openForm === "openWordTraining" &&
                    <ModalChooseTraining onClose2={() => setOpenForm(null)} setWords={setWords}
                                         setList={setListWords}/>}
                {words && listWords && (
                    <ul className="button_ul">
                        {words.map((word) => (
                            <li key={word.id}>
                                <input className="input_list" value={word.word}
                                       onChange={handlerOnChange}/>
                                <input className="input_list" ref={(el) => translateRef.current[word.id] = el}
                                       placeholder="translate"/>
                            </li>
                        ))}
                        <button className="btn_training" onClick={onGetTrainingInfo}>Ready</button>
                        {wordsFromUser && (<ul className="button_ul">
                            {wordsFromUser.correct_answers.words.map((word, index) => (
                                <li key={index}>
                                    <label>Correct words</label>
                                    <button>{word.word} -- {word.translate}</button>
                                </li>
                            ))}

                            {wordsFromUser.wrong_answers.words.map((word, index) => (
                                <li key={index}>
                                    <label>Wrong words</label>
                                    <button>{word.word} -- {word.translate}</button>
                                </li>
                            ))}
                            </ul>)}
                    </ul>
                )}
                {!words && listWords && (
                    <div className="words_not_found">Words doesn't find</div>
                )}

            </div>
        </div>
    );
}

export default ModalTrainingFn;