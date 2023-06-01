import {useRef} from "react";
import {getWordsByPeriod} from "../../../shared/api/word";

const ModalChooseTrainingFn = ({onClose2, setTrainingWords, setList, onTest, setTrainingDataWords}) => {
    const firstRef = useRef()
    const secondRef = useRef()

    const onGetWordsByPeriod = async () => {
        const first_date = firstRef.current.value;
        const second_date = secondRef.current.value;

        const data = {
            created_at : {
                first_date: new Date(first_date),
                second_date: new Date(second_date)
            }
        };
        const response = await getWordsByPeriod(data);
        if (response.status === 'success' && response.data.words) {
            setTrainingWords(response.data.words);
            setTrainingDataWords(response.data.words);
            onClose2();
            setList(true);
            onTest();
        } else {
            setTrainingWords(null);
            setTrainingDataWords(0);
            onClose2();
            setList(true)
            onTest();
        }
    }

    return (
        <div className="modal">
            <div className="modal_content">
                <p>Choose words period for training</p>
                <label>Start date</label>
                <input ref={firstRef} type={"datetime-local"} />
                <label>End date</label>
                <input ref={secondRef} type={"datetime-local"} />
                <button onClick={onGetWordsByPeriod}>Find</button>
                <button onClick={onClose2}>Close</button>
            </div>
        </div>
    );
}

export default ModalChooseTrainingFn;