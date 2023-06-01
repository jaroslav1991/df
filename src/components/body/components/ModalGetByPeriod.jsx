import {getWordsByPeriod} from "../../../shared/api/word";
import {useRef} from "react";
import "../styles/modal_get_by_period.css"

const ModalGetByPeriodFn =({onClose, setWords, setDataWords}) => {
    const firstRef = useRef()
    const secondRef = useRef()

    const onGetWordsByPeriod = async () => {
        const first_date = firstRef.current.value
        const second_date = secondRef.current.value
        const data = {
            created_at : {
                first_date: new Date(first_date),
                second_date: new Date(second_date)
            }
        }
        const response = await getWordsByPeriod(data);
        if (response.status === 'success' && response.data.words) {
            setWords(response.data.words)
            setDataWords(response.data.words)
            onClose();
        } else {
            setWords(null);
            onClose();
        }
        console.log("data", response.data)
    }


    return (
        <div className="modal">
            <div className="modal_content">
                <label>Start date</label>
                <input ref={firstRef} type={"datetime-local"}/>
                <label>End date</label>
                <input ref={secondRef} type={"datetime-local"}/>
                <button onClick={onGetWordsByPeriod}>Find</button>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

export default ModalGetByPeriodFn;