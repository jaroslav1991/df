import {useEffect, useRef, useState} from "react";
import ModalUpdateOrDelete from "./components/ModalUpdateOrDelete";
import {createResultOfTraining, createStatistic, getStatistic, getWords} from "../../shared/api/word";
import ModalCreateFn from "./components/ModalCreate";
import ModalGetByPeriodFn from "./components/ModalGetByPeriod";
import "./styles/body.css"
import ModalTrainingFn from "./components/ModalMenuTraining";

const PAGE_SIZE = 10
const PAGE_START = 0


const Body = ({token}) => {
    const [words, setWords] = useState([])
    const [word, setWord] = useState(null)
    const [openForm, setOpenForm] = useState("")
    const [page, setPage] = useState(PAGE_START);
    const [trainingDataWords, setTrainingDataWords] = useState(0)
    const [dataWords, setDataWords] = useState(0)
    const [listWords, setListWords] = useState(false)
    const [wordsFromUser, setWordsFromUser] = useState({correct_answers: {words: []}, wrong_answers: {words: []}})
    const [trainingWords, setTrainingWords] = useState([])

    const translateRef = useRef([])


    useEffect(() => {
        if (dataWords) {
            setWords(getSlice(dataWords, PAGE_SIZE, page));
        }
    }, [dataWords, page]);

    useEffect(() => {
        if (trainingDataWords) {
            setTrainingWords(getSlice(trainingDataWords, PAGE_SIZE, page));
        }
    }, [trainingDataWords, page]);

    const handleGetWords = async () => {
        const response = await getWords();
        if (response.status === 'success' && response.data.words) {
            setOpenForm("openGet")
            setWords(response.data.words)
            setDataWords(response.data.words)
        } else if (response.status === 'success' && !response.data.words) {
            setOpenForm(null)
            setWords(null)
        } else {
            setOpenForm(null)
        }
    }

    const showSlicePage = (page) => {
        setPage(page);
        setWords(getSlice(words, PAGE_SIZE, page));
    };

    const showSliceTrainingPage = (page) => {
        setPage(page);
        setTrainingWords(getSlice(trainingWords, PAGE_SIZE, page));
    }

    const getSlice = (words, limit, page) => {
        if (!words) {
            return [];
        }
        const length = Math.min(words.length, limit);
        const offset = length * page;
        return words.slice(offset, offset + length);
    };

    const Pagination = ({onChange, pageAmount}) => {

        const onPageClick = (value) => {
            setPage(value);
            onChange(value);
        };
        const arr = [];
        for (let i = 0; i < pageAmount; i++) {
            arr[i] = i;
        }

        return (
            <div className="page-container">
                {arr.map((value) => (
                    <div
                        className={`page ${value === page ? "page_active" : ""}`}
                        key={value}
                        onClick={() => onPageClick(value)}
                    >
                        {value + 1}
                    </div>
                ))}
            </div>
        );
    };

    const onGetTrainingInfo = async () => {
        const dataCreateTraining = {
            words: {
                words: trainingWords.map((word) => ({
                    id: word.id,
                    word: word.word,
                    translate: word.translate
                }))
            },
            answers: {
                words: trainingWords.map((word) => ({
                    id: word.id,
                    word: word.word,
                    translate: translateRef.current[word.id].value
                }))
            }
        }

        const responseCreateTraining = await createResultOfTraining(dataCreateTraining);
        if (responseCreateTraining.status === "success") {
            setOpenForm("openTraining");
            console.log(trainingWords.length)
            console.log(trainingWords)
            console.log("success:", responseCreateTraining.data.id)
        } else {
            console.log("bad response:", responseCreateTraining.status)
        }
        const dataGetStatistic = {
            training_id: responseCreateTraining.data.id
        }
        const responseGetStatistic = await getStatistic(dataGetStatistic)
        if (responseGetStatistic.status === "success") {
            setOpenForm("openStatistic")
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

    const handleCreateWord = async () => {
        setOpenForm("openCreate")
    }

    const handleGetWordsByPeriod = async () => {
        setOpenForm("openGetByPeriod")
    }

    const handlerMenuTraining = async () => {
        setOpenForm("openMenuTraining")
    }

    const handlerOnTraining = () => {
        setOpenForm("openTraining")
    }

    return (
        <div className="body_form">
            {token && <>
                <p className="p">Start to study with yourself. It's very important to proof, that you make it without
                    any helps, money and so on! Try to practice every day and don't forget do exercises! GOOD LUCK!🙂</p>
                <div className="btn_group">
                    <button className="button_group" onClick={handleGetWords}>Get All Words</button>
                    <button className="button_group" onClick={handleGetWordsByPeriod}>Get words By period</button>
                    <button className="button_group" onClick={handleCreateWord}>Add Word</button>
                    <button className="button_group" onClick={handlerMenuTraining}>Training</button>
                </div>

                {words && (openForm ? "openGet" : "openGetByPeriod") && (
                    <ul className="button_ul">
                        <Pagination onChange={showSlicePage} pageAmount={dataWords.length / PAGE_SIZE}/>

                        {words.map(word => (
                            <li key={word.id}>
                                <button className="button_get"
                                        onClick={() => setWord(word)}>{word.word} - {word.translate}</button>
                            </li>
                        ))}
                    </ul>

                )}
                {!words && <div className="empty">List of words empty</div>}

                {word && <ModalUpdateOrDelete onClose={() => setWord(null)} onRefreshList={handleGetWords} word={word}
                                              onOpen={() => setOpenForm(null)}/>}
                {openForm === "openGetByPeriod" &&
                    <ModalGetByPeriodFn onClose={() => setOpenForm(null)} setWords={setWords}
                                        setDataWords={setDataWords}

                    />}
                {openForm === "openCreate" &&
                    <ModalCreateFn onClose={() => setOpenForm(null)} onRefreshList={handleGetWords}/>}

                {openForm === "openMenuTraining" &&
                    <ModalTrainingFn onForm={handlerOnTraining} setListWords={setListWords} setTrainingWords={setTrainingWords}
                                     setTrainingDataWords={setTrainingDataWords}
                                     onClose={() => setOpenForm(null)}/>}
                {openForm === "openTraining" && trainingWords && listWords && (
                    <ul className="button_ul">
                        <Pagination onChange={showSliceTrainingPage} pageAmount={trainingDataWords.length / PAGE_SIZE}/>

                        {trainingWords.map((word) => (
                            <li key={word.id}>
                                <input className="input_list" value={word.word} readOnly/>
                                <input className="input_list" ref={(el) => translateRef.current[word.id] = el} placeholder="translate"/>
                            </li>
                        ))}
                        <button className="ready_btn" onClick={onGetTrainingInfo}>Ready</button>
                    </ul>
                )}
                {openForm === "openStatistic" && wordsFromUser && (<ul className="button_ul">
                    {wordsFromUser.correct_answers.words && wordsFromUser.correct_answers.words.map((word, index) => (
                        <li key={index}>
                            <label className="label_training">Correct words</label>
                            <button className="training_btn">{word.word} -- {word.translate}</button>
                        </li>
                    ))}

                    {wordsFromUser.wrong_answers.words && wordsFromUser.wrong_answers.words.map((word, index) => (
                        <li key={index}>
                            <label className="label_training" style={{marginRight: "20px"}}>Wrong words</label>
                            <button className="training_btn">{word.word} -- {word.translate}</button>
                        </li>
                    ))}
                </ul>)}
                {!trainingWords && !listWords && (
                    <div className="words_not_found">Words doesn't find</div>
                )}

            </>}
            {!token && <p className="p">Lox, quickly register on this ass site</p>}
        </div>
    )
}

export default Body;