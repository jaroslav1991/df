import {useEffect, useState} from "react";
import ModalUpdateOrDelete from "./components/ModalUpdateOrDelete";
import {getWords} from "../../shared/api/word";
import ModalCreateFn from "./components/ModalCreate";
import ModalGetByPeriodFn from "./components/ModalGetByPeriod";
import "./styles/body.css"

const PAGE_SIZE = 10
const PAGE_START = 0


const Body = ({token}) => {
    const [words, setWords] = useState([])
    const [word, setWord] = useState(null)
    const [openForm, setOpenForm] = useState("")
    const [page, setPage] = useState(PAGE_START);
    const [dataWords, setDataWords] = useState(0)


    useEffect(() => {
        if (dataWords) {
            setWords(getSlice(dataWords, PAGE_SIZE, page));
        }
    }, [dataWords, page]);

    const handleGetWords = async () => {
        const response = await getWords();
        if (response.status === 'success' && response.data.words) {
            setOpenForm("openGet")
            setWords(getSlice(response.data.words, PAGE_SIZE, page))
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
                        className={`page ${value === page ? "page_active": ""}`}
                        key={value}
                        onClick={() => onPageClick(value)}
                    >
                        {value + 1}
                    </div>
                ))}
            </div>
        );
    };

    const handleCreateWord = async () => {
        setOpenForm("openCreate")
    }

    const handleGetWordsByPeriod = async () => {
        setOpenForm("openGetByPeriod")
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
                    <ModalGetByPeriodFn onClose={() => setOpenForm(null)} setWords={setWords} getSlice={getSlice} setPage={() => setPage}
                        setDataWords={setDataWords}
                    />}
                {openForm === "openCreate" &&
                    <ModalCreateFn onClose={() => setOpenForm(null)} onRefreshList={handleGetWords}/>}
            </>}
            {!token && <p className="p">Lox, quickly register on this ass site</p>}
        </div>
    )
}

export default Body;